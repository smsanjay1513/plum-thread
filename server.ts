import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const SYSTEM_INSTRUCTION = `You are the Plum & Thread Manufacturing Assistant, an expert B2B apparel sourcing and GST quotation advisor for Plum & Thread Apparel Pvt. Ltd. in Tiruppur, Tamil Nadu, India.

Keep your replies concise, structured, accurate, and easy to scan (short paragraphs or bullet points). Only quote facts and prices from the official Plum & Thread catalogue below:

OFFICIAL CATALOGUE & EX-FACTORY PRICING (INR):
1. Round-neck T-shirt (SKU: PT-RN180) — Rs. 165 / unit | 5% GST | 180 GSM Combed Ring-Spun Cotton | Bio-washed jersey, Lycra rib collar, shoulder tape
2. Polo T-shirt (SKU: PT-PL220) — Rs. 235 / unit | 5% GST | 220 GSM Honeycomb Pique | Two-button placket, flat-knit collar, side slits
3. Hoodie (SKU: PT-HD320) — Rs. 480 / unit | 5% GST | 320 GSM Brushed Cotton Fleece | Double-lined hood, kangaroo pocket, 2x2 rib cuffs
4. Track pant (SKU: PT-TP260) — Rs. 320 / unit | 5% GST | 260 GSM Loopback French Terry | Elasticated drawcord waist, zippered side pockets
5. Padded jacket (SKU: PT-PJ400) — Rs. 2,850 / unit | 18% GST | Water-Repellent Nylon Shell, Poly-Fill | Baffle quilting, YKK storm zipper, inner welt pocket
6. Logo cap (SKU: PT-LC006) — Rs. 95 / unit | 12% GST | 260 GSM Brushed Cotton Twill | 6-panel structured crown, brass buckle strap
7. Kids romper (SKU: PT-KR180) — Rs. 140 / unit | 5% GST | 180 GSM Organic Cotton Interlock | Nickel-free snap closures, envelope neckline
8. Shorts (SKU: PT-SH220) — Rs. 150 / unit | 5% GST | 220 GSM Single Jersey / Terry | Reinforced crotch gusset, double-needle hem

OPERATIONS & TERMS:
- Location: Plot 42, Apparel Industrial Estate, Avinashi Road, Tiruppur, Tamil Nadu 641603, India.
- Contact: orders@plumandthread.in | +91 421 248 9104 | Mon-Sat 09:00-18:30 IST.
- Standard Commercial MOQ: 100 pcs per style (split across up to 5 sizes); 150 pcs per colorway for Padded jackets and custom Pantone-dyed fabrics. The online calculator allows testing from 1 unit for cost benchmarking.
- Lead Times: 7 working days for physical fit/fabric samples; 18-22 working days for bulk production.
- Quality: 150,000+ monthly garment capacity, AQL 2.5 inline and pre-shipment inspection, <2% post-wash shrinkage control.
- Customizations: Screen printing (water-based, plastisol, puff), Tajima embroidery, DTF transfers, woven labels, and custom polybags are quoted on artwork review.
- When calculating totals for users, show taxable subtotal, per-item GST (5%, 12%, or 18%), and grand total in INR accurately.`;

interface IncomingChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

interface QuoteContextLine {
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  gstRate: number;
  lineTotal: number;
}

interface QuoteContextPayload {
  totalUnits: number;
  totalSubtotal: number;
  totalGst: number;
  grandTotal: number;
  lines: QuoteContextLine[];
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function formatQuoteContext(quoteContext?: QuoteContextPayload | null): string {
  if (!quoteContext || !Array.isArray(quoteContext.lines) || quoteContext.lines.length === 0) {
    return 'Current user quotation worksheet: Empty (no products added yet).';
  }
  const itemsText = quoteContext.lines
    .map(
      (line) =>
        `- ${line.name} (${line.sku}): ${line.quantity} pcs @ Rs. ${line.unitPrice}, GST ${line.gstRate}%, line total Rs. ${line.lineTotal}`
    )
    .join('\n');
  return `Current user quotation worksheet:\n${itemsText}\nTotal Units: ${quoteContext.totalUnits} pcs | Taxable Subtotal: Rs. ${quoteContext.totalSubtotal} | Total GST: Rs. ${quoteContext.totalGst} | Grand Total: Rs. ${quoteContext.grandTotal}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/chat', async (req, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(500).json({
        error: 'Gemini API key is not configured. Please check Settings > Secrets for GEMINI_API_KEY.',
      });
      return;
    }

    const body = req.body as {
      messages?: IncomingChatMessage[];
      quoteContext?: QuoteContextPayload | null;
    };

    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
    const cleanedMessages = rawMessages
      .filter(
        (m): m is IncomingChatMessage =>
          Boolean(m) &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.text === 'string' &&
          m.text.trim().length > 0
      )
      .slice(-16);

    if (cleanedMessages.length === 0) {
      res.status(400).json({ error: 'Please enter a message before sending.' });
      return;
    }

    const contents = cleanedMessages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text.trim() }],
    }));

    const contextualInstruction = `${SYSTEM_INSTRUCTION}\n\n${formatQuoteContext(body?.quoteContext)}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents,
        config: {
          systemInstruction: contextualInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const replyText = response.text?.trim();
      if (!replyText) {
        res.status(502).json({
          error: 'The assistant returned an empty response. Please try asking again.',
        });
        return;
      }

      res.json({ reply: replyText });
    } catch (error: unknown) {
      const errObj = error as { status?: number; message?: string };
      const status = typeof errObj?.status === 'number' ? errObj.status : 500;
      const message =
        errObj?.message || 'Unable to reach the AI assistant right now. Please try again.';

      if (status === 403 || status === 400 || message.includes('API_KEY_INVALID')) {
        res.status(status).json({
          error: 'Gemini API key authentication failed. Please verify GEMINI_API_KEY in Settings > Secrets.',
        });
        return;
      }

      if (status === 429 || message.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          error: 'Rate limit reached. Please wait a moment before sending another question.',
        });
        return;
      }

      res.status(500).json({ error: message });
    }
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Production build not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Plum & Thread server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
