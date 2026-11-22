import { useEffect, useRef, useState } from 'react';
import { Bot, MessageSquare, RotateCcw, Send, X } from 'lucide-react';
import { QuotationSummary } from '../utils/quotation';
import { BrandLogo } from './BrandLogo';

interface ChatAssistantProps {
  summary: QuotationSummary;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const STARTER_QUESTIONS = [
  'Which SKUs use 5%, 12%, or 18% GST?',
  'Estimate 200 hoodies + 100 logo caps',
  'What are MOQ and sampling lead times?',
];

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hello! I am the Plum & Thread sourcing assistant. Ask me about our 8 Tiruppur apparel SKUs, GSM fabric specs, 5% / 12% / 18% GST calculations, MOQs, or your current quotation.',
};

export function ChatAssistant({ summary }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    }
  }, [isOpen, messages.length, isLoading]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setErrorMessage(null);
    setIsLoading(true);

    const apiMessages = nextMessages
      .filter((msg) => msg.id !== 'welcome')
      .map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

    const quoteContext = {
      totalUnits: summary.totalUnits,
      totalSubtotal: summary.totalSubtotal,
      totalGst: summary.totalGst,
      grandTotal: summary.grandTotal,
      lines: summary.lines.map((line) => ({
        name: line.product.name,
        sku: line.product.sku,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        gstRate: line.gstRate,
        lineTotal: line.lineTotal,
      })),
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          quoteContext,
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Unable to get a response from the assistant.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: data.reply!,
        },
      ]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleResetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setErrorMessage(null);
  };

  const showStarters = messages.length === 1 && !isLoading;

  return (
    <div className="fixed bottom-5 right-5 z-50 no-print">
      {/* Expandable AI Chat Panel */}
      {isOpen && (
        <section
          role="dialog"
          aria-label="Plum & Thread AI Assistant"
          className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[390px] h-[min(540px,calc(100vh-7rem))] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#FAFAFB] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <BrandLogo className="w-7 h-7 shrink-0" />
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  Plum &amp; Thread AI
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Pricing, GST &amp; Production Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleResetChat}
                aria-label="Reset conversation"
                title="Reset conversation"
                className="inline-flex items-center justify-center w-8 h-8 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI assistant"
                title="Close"
                className="inline-flex items-center justify-center w-8 h-8 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-white dark:bg-slate-900">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-[#581C4C] dark:bg-[#7A2769] text-white'
                        : 'bg-[#FAFAFB] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {showStarters && (
              <div className="pt-1 space-y-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Quick questions:
                </p>
                <div className="flex flex-col items-start gap-1.5">
                  {STARTER_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void sendMessage(question)}
                      className="text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#581C4C] dark:hover:border-[#E29AD3] hover:text-[#581C4C] dark:hover:text-[#E29AD3] rounded-lg transition-colors cursor-pointer"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-xl px-3.5 py-2.5 text-xs font-medium bg-[#FAFAFB] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  Drafting answer...
                </div>
              </div>
            )}

            {errorMessage && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300"
              >
                {errorMessage}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#FAFAFB] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, GST, or MOQs..."
              aria-label="Ask Plum & Thread AI"
              disabled={isLoading}
              className="flex-1 min-w-0 h-11 px-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#581C4C] dark:focus:ring-[#E29AD3] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="h-11 w-11 inline-flex items-center justify-center text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] disabled:opacity-45 disabled:pointer-events-none rounded-lg transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3]"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      {/* Bottom-Right Launcher Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Minimize AI assistant' : 'Open Plum & Thread AI assistant'}
          className="inline-flex items-center gap-2.5 h-12 px-4 sm:px-5 text-sm font-semibold text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] rounded-xl shadow-lg border border-white/10 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4" aria-hidden="true" />
              <span>Close AI</span>
            </>
          ) : (
            <>
              <Bot className="w-4 h-4 sm:hidden" aria-hidden="true" />
              <MessageSquare className="w-4 h-4 hidden sm:block" aria-hidden="true" />
              <span>Ask AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
