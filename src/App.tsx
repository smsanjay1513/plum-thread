import { useEffect, useMemo, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ManufacturingProcess } from './components/ManufacturingProcess';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { QuotationCalculator } from './components/QuotationCalculator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ChatAssistant } from './components/ChatAssistant';
import { calculateQuotation, QuoteSelection, sanitizeQuantity } from './utils/quotation';

const SAMPLE_SELECTIONS: QuoteSelection[] = [
  { productId: 'round-neck-tshirt', quantity: 50 },
  { productId: 'polo-tshirt', quantity: 25 },
  { productId: 'logo-cap', quantity: 50 },
];

export type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('plum-thread-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export default function App() {
  const [selections, setSelections] = useState<QuoteSelection[]>([]);
  const [quoteAttached, setQuoteAttached] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    try {
      localStorage.setItem('plum-thread-theme', theme);
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [theme]);

  const summary = useMemo(() => calculateQuotation(selections), [selections]);

  const quantitiesById = useMemo(() => {
    const map: Record<string, number> = {};
    for (const item of selections) {
      map[item.productId] = item.quantity;
    }
    return map;
  }, [selections]);

  const selectedIds = useMemo(
    () => new Set(selections.map((item) => item.productId)),
    [selections]
  );

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddProduct = (productId: string, quantityToAdd = 1) => {
    const safeAdd = Math.max(1, sanitizeQuantity(quantityToAdd));
    setSelections((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + safeAdd }
            : item
        );
      }
      return [...prev, { productId, quantity: safeAdd }];
    });
  };

  const handleUpdateQuantity = (productId: string, nextQuantity: number) => {
    const safeQuantity = sanitizeQuantity(nextQuantity);
    setSelections((prev) => {
      const exists = prev.some((item) => item.productId === productId);
      if (!exists && safeQuantity > 0) {
        return [...prev, { productId, quantity: safeQuantity }];
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: safeQuantity } : item
      );
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setSelections((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleResetSelections = () => {
    setSelections((prev) => prev.map((item) => ({ ...item, quantity: 1 })));
  };

  const handleClearQuotation = () => {
    setSelections([]);
  };

  const handleLoadSampleQuote = () => {
    setSelections(SAMPLE_SELECTIONS);
  };

  const handleAttachToInquiry = () => {
    setQuoteAttached(true);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB] dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar onQuoteClick={() => scrollToSection('quotation')} />

      <main className="flex-1">
        <Hero
          theme={theme}
          onThemeChange={setTheme}
          onBuildQuote={() => scrollToSection('quotation')}
        />

        <ProductCatalog
          quantitiesById={quantitiesById}
          onAddProduct={(productId) => handleAddProduct(productId, 1)}
          onUpdateQuantity={(productId, qty) => {
            if (qty <= 0) {
              handleRemoveProduct(productId);
            } else {
              handleUpdateQuantity(productId, qty);
            }
          }}
        />

        <QuotationCalculator
          summary={summary}
          selectedIds={selectedIds}
          onAddProduct={handleAddProduct}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveProduct={handleRemoveProduct}
          onResetSelections={handleResetSelections}
          onClearQuotation={handleClearQuotation}
          onLoadSampleQuote={handleLoadSampleQuote}
          onAttachToInquiry={handleAttachToInquiry}
        />

        <ManufacturingProcess />

        <WhyChooseUs />

        <FAQSection />

        <ContactSection
          summary={summary}
          quoteAttached={quoteAttached}
          onToggleQuoteAttached={setQuoteAttached}
        />
      </main>

      <Footer theme={theme} onThemeChange={setTheme} />

      <ChatAssistant summary={summary} />
    </div>
  );
}
