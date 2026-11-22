import { Product, PRODUCTS } from '../data/catalog';

export interface QuoteSelection {
  productId: string;
  quantity: number;
}

export interface CalculatedLineItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  gstRate: number;
  subtotal: number;
  gstAmount: number;
  lineTotal: number;
}

export interface GstSlabSummary {
  rate: number;
  taxableAmount: number;
  gstAmount: number;
}

export interface QuotationSummary {
  lines: CalculatedLineItem[];
  totalUnits: number;
  totalSubtotal: number;
  totalGst: number;
  grandTotal: number;
  gstBreakdown: GstSlabSummary[];
}

export function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function sanitizeQuantity(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.floor(value);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundCurrency(amount));
}

export function calculateQuotation(selections: QuoteSelection[]): QuotationSummary {
  const productMap = new Map<string, Product>(PRODUCTS.map((p) => [p.id, p]));
  const lines: CalculatedLineItem[] = [];
  const slabMap = new Map<number, { taxableAmount: number; gstAmount: number }>();

  let totalUnits = 0;
  let totalSubtotal = 0;
  let totalGst = 0;

  for (const item of selections) {
    const product = productMap.get(item.productId);
    if (!product) continue;

    const quantity = sanitizeQuantity(item.quantity);
    const subtotal = roundCurrency(product.unitPrice * quantity);
    const gstAmount = roundCurrency((subtotal * product.gstRate) / 100);
    const lineTotal = roundCurrency(subtotal + gstAmount);

    lines.push({
      product,
      quantity,
      unitPrice: product.unitPrice,
      gstRate: product.gstRate,
      subtotal,
      gstAmount,
      lineTotal,
    });

    totalUnits += quantity;
    totalSubtotal = roundCurrency(totalSubtotal + subtotal);
    totalGst = roundCurrency(totalGst + gstAmount);

    const existingSlab = slabMap.get(product.gstRate) ?? {
      taxableAmount: 0,
      gstAmount: 0,
    };
    slabMap.set(product.gstRate, {
      taxableAmount: roundCurrency(existingSlab.taxableAmount + subtotal),
      gstAmount: roundCurrency(existingSlab.gstAmount + gstAmount),
    });
  }

  const gstBreakdown: GstSlabSummary[] = Array.from(slabMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([rate, data]) => ({
      rate,
      taxableAmount: data.taxableAmount,
      gstAmount: data.gstAmount,
    }));

  const grandTotal = roundCurrency(totalSubtotal + totalGst);

  return {
    lines,
    totalUnits,
    totalSubtotal,
    totalGst,
    grandTotal,
    gstBreakdown,
  };
}

export function buildQuotePlainText(summary: QuotationSummary): string {
  if (summary.lines.length === 0) {
    return 'No items selected.';
  }

  const rows = summary.lines.map(
    (line) =>
      `- ${line.product.name} (${line.quantity} pcs @ ${formatINR(line.unitPrice)}) | Subtotal: ${formatINR(line.subtotal)} | GST (${line.gstRate}%): ${formatINR(line.gstAmount)} | Total: ${formatINR(line.lineTotal)}`
  );

  return [
    'PLUM & THREAD — TIRUPPUR BULK QUOTATION ESTIMATE',
    '--------------------------------------------------',
    ...rows,
    '--------------------------------------------------',
    `Total Units: ${summary.totalUnits} pcs`,
    `Taxable Subtotal: ${formatINR(summary.totalSubtotal)}`,
    `Total GST: ${formatINR(summary.totalGst)}`,
    `Final Grand Total: ${formatINR(summary.grandTotal)}`,
  ].join('\n');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function generateQuoteReference(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const suffix = String(now.getTime()).slice(-4);
  return `PT-${y}${m}${d}-${suffix}`;
}

export function buildPrintableQuoteHtml(
  summary: QuotationSummary,
  quoteRef: string,
  issuedDate: string
): string {
  const rowsHtml = summary.lines
    .map(
      (line) => `
        <tr>
          <td>
            <div class="item-name">${escapeHtml(line.product.name)}</div>
            <div class="item-meta">${escapeHtml(line.product.sku)} &middot; ${escapeHtml(line.product.fabricSpec)}</div>
          </td>
          <td class="num">${escapeHtml(formatINR(line.unitPrice))}</td>
          <td class="num">${line.quantity.toLocaleString('en-IN')} pcs</td>
          <td class="num">${escapeHtml(formatINR(line.subtotal))}</td>
          <td class="num">${escapeHtml(formatINR(line.gstAmount))}<div class="slab">${line.gstRate}% GST</div></td>
          <td class="num strong">${escapeHtml(formatINR(line.lineTotal))}</td>
        </tr>`
    )
    .join('');

  const slabsHtml = summary.gstBreakdown
    .map(
      (slab) => `
        <div class="summary-row sub">
          <span>GST @ ${slab.rate}% (on ${escapeHtml(formatINR(slab.taxableAmount))})</span>
          <span class="num">${escapeHtml(formatINR(slab.gstAmount))}</span>
        </div>`
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Plum &amp; Thread Quotation — ${escapeHtml(quoteRef)}</title>
    <style>
      @page { size: A4; margin: 14mm; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 32px 20px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #0f172a;
        background: #f8fafc;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .toolbar {
        max-width: 820px;
        margin: 0 auto 16px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
      .btn-print {
        border: 0;
        background: #581c4c;
        color: #ffffff;
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .sheet {
        max-width: 820px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 36px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        padding-bottom: 24px;
        border-bottom: 2px solid #581c4c;
      }
      .brand { font-size: 22px; font-weight: 700; color: #581c4c; margin: 0 0 6px; }
      .muted { font-size: 12px; color: #475569; line-height: 1.5; margin: 0; }
      .meta { text-align: right; }
      .meta-title { font-size: 16px; font-weight: 700; margin: 0 0 6px; color: #0f172a; }
      table { width: 100%; border-collapse: collapse; margin-top: 24px; }
      th {
        text-align: left;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #475569;
        padding: 10px 8px;
        border-bottom: 1px solid #cbd5e1;
        background: #f8fafc;
      }
      th.num, td.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
      td {
        padding: 12px 8px;
        border-bottom: 1px solid #e2e8f0;
        font-size: 13px;
        vertical-align: top;
      }
      .item-name { font-weight: 600; color: #0f172a; }
      .item-meta, .slab { font-size: 11px; color: #64748b; margin-top: 2px; }
      .strong { font-weight: 700; color: #0f172a; }
      .summary-wrap {
        margin-top: 24px;
        display: flex;
        justify-content: space-between;
        gap: 24px;
        align-items: flex-start;
      }
      .terms { flex: 1; font-size: 12px; color: #475569; line-height: 1.6; }
      .summary-box {
        width: 320px;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 16px;
        background: #fbf7fa;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        font-size: 13px;
        margin-bottom: 8px;
      }
      .summary-row.sub { font-size: 12px; color: #475569; }
      .summary-row.total {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #cbd5e1;
        font-size: 16px;
        font-weight: 700;
        color: #581c4c;
        margin-bottom: 0;
      }
      @media print {
        body { background: #ffffff; padding: 0; }
        .toolbar { display: none; }
        .sheet { border: 0; border-radius: 0; padding: 0; max-width: none; }
      }
    </style>
  </head>
  <body>
    <div class="toolbar">
      <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
    </div>
    <main class="sheet">
      <div class="header">
        <div>
          <h1 class="brand">Plum &amp; Thread Apparel Pvt. Ltd.</h1>
          <p class="muted">
            Plot 42, Apparel Industrial Estate, Avinashi Road<br />
            Tiruppur, Tamil Nadu 641603 &middot; orders@plumandthread.in
          </p>
        </div>
        <div class="meta">
          <p class="meta-title">QUOTATION SUMMARY</p>
          <p class="muted">
            Ref: <strong>${escapeHtml(quoteRef)}</strong><br />
            Date: ${escapeHtml(issuedDate)}<br />
            Currency: INR (Ex-Works Tiruppur)
          </p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Product &amp; Fabric</th>
            <th class="num">Unit Price</th>
            <th class="num">Qty</th>
            <th class="num">Subtotal</th>
            <th class="num">GST</th>
            <th class="num">Line Total</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>

      <div class="summary-wrap">
        <div class="terms">
          <strong>Notes &amp; Production Terms</strong><br />
          &bull; Prices shown are ex-works Tiruppur estimates including statutory HSN GST.<br />
          &bull; Custom screen printing, embroidery, and woven labels are confirmed post artwork review.<br />
          &bull; ISO 9001 &amp; AQL 2.5 inspected bulk manufacturing.
        </div>
        <div class="summary-box">
          <div class="summary-row">
            <span>Total Garment Units</span>
            <span class="num">${summary.totalUnits.toLocaleString('en-IN')} pcs</span>
          </div>
          <div class="summary-row">
            <span>Taxable Subtotal (Excl. GST)</span>
            <span class="num">${escapeHtml(formatINR(summary.totalSubtotal))}</span>
          </div>
          ${slabsHtml}
          <div class="summary-row">
            <span><strong>Total GST Payable</strong></span>
            <span class="num"><strong>${escapeHtml(formatINR(summary.totalGst))}</strong></span>
          </div>
          <div class="summary-row total">
            <span>Grand Total</span>
            <span class="num">${escapeHtml(formatINR(summary.grandTotal))}</span>
          </div>
        </div>
      </div>
    </main>
  </body>
</html>`;
}
