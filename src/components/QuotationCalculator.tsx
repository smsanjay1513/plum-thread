import { useState } from 'react';
import { flushSync } from 'react-dom';
import {
  Calculator,
  Check,
  Copy,
  Minus,
  Plus,
  Printer,
  RotateCcw,
  Trash2,
  Send,
} from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import {
  buildQuotePlainText,
  formatINR,
  generateQuoteReference,
  QuotationSummary,
  sanitizeQuantity,
} from '../utils/quotation';
import { PrintableQuoteModal } from './PrintableQuoteModal';

interface QuotationCalculatorProps {
  summary: QuotationSummary;
  selectedIds: Set<string>;
  onAddProduct: (productId: string, initialQuantity?: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveProduct: (productId: string) => void;
  onResetSelections: () => void;
  onClearQuotation: () => void;
  onLoadSampleQuote: () => void;
  onAttachToInquiry: () => void;
}

export function QuotationCalculator({
  summary,
  selectedIds,
  onAddProduct,
  onUpdateQuantity,
  onRemoveProduct,
  onResetSelections,
  onClearQuotation,
  onLoadSampleQuote,
  onAttachToInquiry,
}: QuotationCalculatorProps) {
  const [selectedProductToAdd, setSelectedProductToAdd] = useState<string>(PRODUCTS[0].id);
  const [addQtyInput, setAddQtyInput] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printDialogBlocked, setPrintDialogBlocked] = useState(false);
  const [quoteRef, setQuoteRef] = useState<string>(() => generateQuoteReference());
  const [issuedDate, setIssuedDate] = useState<string>(() =>
    new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  );

  const hasItems = summary.lines.length > 0;
  const availableToAdd = PRODUCTS.filter((p) => !selectedIds.has(p.id));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetId = selectedProductToAdd || PRODUCTS[0].id;
    const qty = Math.max(1, sanitizeQuantity(addQtyInput));
    onAddProduct(targetId, qty);

    const remaining = PRODUCTS.filter((p) => !selectedIds.has(p.id) && p.id !== targetId);
    if (remaining.length > 0) {
      setSelectedProductToAdd(remaining[0].id);
    }
  };

  const handleQuantityInputChange = (productId: string, rawValue: string) => {
    if (rawValue === '') {
      onUpdateQuantity(productId, 0);
      return;
    }
    const parsed = Number(rawValue);
    onUpdateQuantity(productId, sanitizeQuantity(parsed));
  };

  const handleCopySummary = async () => {
    if (!hasItems) return;
    try {
      await navigator.clipboard.writeText(buildQuotePlainText(summary));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const triggerBrowserPrint = () => {
    let beforePrintFired = false;
    const handleBeforePrint = () => {
      beforePrintFired = true;
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    try {
      window.print();
    } catch {
      beforePrintFired = false;
    } finally {
      window.removeEventListener('beforeprint', handleBeforePrint);
    }

    setPrintDialogBlocked(!beforePrintFired);
  };

  const handlePrintSummary = () => {
    if (!hasItems) return;
    flushSync(() => {
      setQuoteRef(generateQuoteReference());
      setIssuedDate(
        new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      );
      setPrintDialogBlocked(false);
      setIsPrintModalOpen(true);
    });
    triggerBrowserPrint();
  };

  return (
    <section
      id="quotation"
      className="py-16 lg:py-24 bg-[#FAFAFB] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Action Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#581C4C] dark:text-[#E29AD3]">
              Interactive Quotation Engine
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              Calculate Itemized Apparel Pricing &amp; GST
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Select products, adjust quantities, and inspect product-wise subtotals alongside exact
              5%, 12%, and 18% GST slabs in Indian Rupees (INR).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 no-print">
            <button
              type="button"
              onClick={onResetSelections}
              disabled={!hasItems}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white disabled:opacity-45 disabled:pointer-events-none transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3]"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Reset Selections</span>
            </button>

            <button
              type="button"
              onClick={onClearQuotation}
              disabled={!hasItems}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-300 dark:hover:border-red-800 disabled:opacity-45 disabled:pointer-events-none transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              <span>Clear Quotation</span>
            </button>
          </div>
        </div>

        {/* Add Product Bar */}
        <form
          onSubmit={handleAddSubmit}
          className="mt-8 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col md:flex-row items-stretch md:items-end gap-4 no-print"
        >
          <div className="flex-1 min-w-0">
            <label
              htmlFor="quote-product-select"
              className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
            >
              Select Garment or Headwear SKU
            </label>
            <select
              id="quote-product-select"
              value={selectedProductToAdd}
              onChange={(e) => setSelectedProductToAdd(e.target.value)}
              className="w-full h-11 px-3.5 text-sm text-slate-900 dark:text-slate-100 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#581C4C] dark:focus:ring-[#E29AD3] focus:border-[#581C4C] dark:focus:border-[#E29AD3]"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id} className="dark:bg-slate-900 dark:text-slate-100">
                  {p.name} — {formatINR(p.unitPrice)} / unit ({p.gstRate}% GST)
                  {selectedIds.has(p.id) ? ' [Already in quote — adds to qty]' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-36">
            <label
              htmlFor="quote-add-qty"
              className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
            >
              Quantity (Units)
            </label>
            <input
              id="quote-add-qty"
              type="number"
              min={1}
              step={1}
              value={addQtyInput}
              onChange={(e) => setAddQtyInput(Math.max(1, sanitizeQuantity(Number(e.target.value))))}
              className="w-full h-11 px-3.5 font-mono text-sm text-slate-900 dark:text-slate-100 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg tabular-nums focus:outline-none focus:ring-2 focus:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] focus:border-[#581C4C] dark:focus:border-[#E29AD3]"
            />
          </div>

          <button
            type="submit"
            className="h-11 px-6 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Product</span>
          </button>
        </form>

        {/* Quick-Add Remaining Products Strip */}
        {availableToAdd.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 no-print">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">
              Quick add:
            </span>
            {availableToAdd.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => onAddProduct(product.id, 1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#581C4C] dark:hover:border-[#E29AD3] hover:text-[#581C4C] dark:hover:text-[#E29AD3] rounded-md transition-colors cursor-pointer"
              >
                <Plus className="w-3 h-3" aria-hidden="true" />
                <span>{product.name}</span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  ({formatINR(product.unitPrice)})
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Main Workspace: Line Items + Summary Ledger */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: Line Items Table / Empty State */}
          <div className="lg:col-span-8">
            {!hasItems ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 sm:p-14 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#FBF7FA] dark:bg-[#231120] border border-[#581C4C]/15 dark:border-[#9E3D89]/40 flex items-center justify-center mx-auto">
                  <Calculator
                    className="w-6 h-6 text-[#581C4C] dark:text-[#E29AD3]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
                  No Products Added Yet
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Your quotation starts empty—no products are added automatically. Select any SKU
                  above, use Quick add, or click &ldquo;Add to Quote&rdquo; in the Production
                  Catalogue to start calculating pricing and GST.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onAddProduct('round-neck-tshirt', 1)}
                    className="px-4 py-2.5 text-sm font-semibold text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Add Round-neck T-shirt (1 pc)
                  </button>
                  <button
                    type="button"
                    onClick={onLoadSampleQuote}
                    className="px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Load Sample Multi-Product Quote
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-[#FAFAFB] dark:bg-slate-950/60 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        <th scope="col" className="py-3.5 px-5">
                          Product
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-right">
                          Unit Price
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-center">
                          Quantity
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-right">
                          Subtotal
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-right">
                          Product GST
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-right">
                          Line Total
                        </th>
                        <th scope="col" className="py-3.5 px-4 text-right no-print">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm">
                      {summary.lines.map((line) => (
                        <tr
                          key={line.product.id}
                          className="hover:bg-[#FAFAFB]/70 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-4 px-5">
                            <p className="font-display font-semibold text-slate-900 dark:text-slate-100">
                              {line.product.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {line.product.sku} <span aria-hidden="true">·</span>{' '}
                              {line.product.fabricSpec}
                            </p>
                          </td>

                          <td className="py-4 px-3 text-right font-mono text-slate-700 dark:text-slate-300 tabular-nums whitespace-nowrap">
                            {formatINR(line.unitPrice)}
                          </td>

                          <td className="py-4 px-3">
                            <div className="inline-flex items-center justify-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 mx-auto">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(line.product.id, line.quantity - 1)
                                }
                                disabled={line.quantity <= 0}
                                aria-label={`Decrease quantity for ${line.product.name}`}
                                className="w-8 h-9 inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 disabled:pointer-events-none rounded-l-lg transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <input
                                type="number"
                                min={0}
                                step={1}
                                aria-label={`Quantity for ${line.product.name}`}
                                value={line.quantity}
                                onChange={(e) =>
                                  handleQuantityInputChange(line.product.id, e.target.value)
                                }
                                className="w-16 h-9 text-center font-mono text-sm font-semibold text-slate-900 dark:text-slate-100 bg-transparent tabular-nums focus:outline-none focus:bg-[#FBF7FA] dark:focus:bg-[#231120]"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(line.product.id, line.quantity + 1)
                                }
                                aria-label={`Increase quantity for ${line.product.name}`}
                                className="w-8 h-9 inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                          <td className="py-4 px-3 text-right font-mono text-slate-800 dark:text-slate-200 tabular-nums whitespace-nowrap">
                            {formatINR(line.subtotal)}
                          </td>

                          <td className="py-4 px-3 text-right whitespace-nowrap">
                            <p className="font-mono text-slate-800 dark:text-slate-200 tabular-nums">
                              {formatINR(line.gstAmount)}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                              {line.gstRate}% slab
                            </p>
                          </td>

                          <td className="py-4 px-3 text-right font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums whitespace-nowrap">
                            {formatINR(line.lineTotal)}
                          </td>

                          <td className="py-4 px-4 text-right no-print">
                            <button
                              type="button"
                              onClick={() => onRemoveProduct(line.product.id)}
                              aria-label={`Remove ${line.product.name} from quotation`}
                              className="inline-flex items-center justify-center w-9 h-9 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Line-Item Cards */}
                <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-800">
                  {summary.lines.map((line) => (
                    <div key={line.product.id} className="p-4 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                            {line.product.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {formatINR(line.unitPrice)} / unit <span aria-hidden="true">·</span>{' '}
                            {line.gstRate}% GST
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveProduct(line.product.id)}
                          aria-label={`Remove ${line.product.name} from quotation`}
                          className="inline-flex items-center justify-center w-10 h-10 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Quantity
                        </span>
                        <div className="inline-flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(line.product.id, line.quantity - 1)}
                            disabled={line.quantity <= 0}
                            aria-label={`Decrease quantity for ${line.product.name}`}
                            className="w-10 h-10 inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-35 rounded-l-lg"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            min={0}
                            step={1}
                            aria-label={`Quantity for ${line.product.name}`}
                            value={line.quantity}
                            onChange={(e) =>
                              handleQuantityInputChange(line.product.id, e.target.value)
                            }
                            className="w-16 h-10 text-center font-mono text-sm font-semibold text-slate-900 dark:text-slate-100 bg-transparent tabular-nums focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(line.product.id, line.quantity + 1)}
                            aria-label={`Increase quantity for ${line.product.name}`}
                            className="w-10 h-10 inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <dl className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                        <div>
                          <dt className="text-slate-500 dark:text-slate-400">Subtotal</dt>
                          <dd className="font-mono font-medium text-slate-800 dark:text-slate-200 tabular-nums mt-0.5">
                            {formatINR(line.subtotal)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-slate-500 dark:text-slate-400">
                            GST ({line.gstRate}%)
                          </dt>
                          <dd className="font-mono font-medium text-slate-800 dark:text-slate-200 tabular-nums mt-0.5">
                            {formatINR(line.gstAmount)}
                          </dd>
                        </div>
                        <div className="text-right">
                          <dt className="text-slate-500 dark:text-slate-400">Line Total</dt>
                          <dd className="font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums mt-0.5">
                            {formatINR(line.lineTotal)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 4 Columns: Live Tax & Grand Total Summary Ledger */}
          <aside
            aria-label="Quotation summary"
            className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                Quotation Summary
              </h3>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                {summary.lines.length} SKU{summary.lines.length === 1 ? '' : 's'}
              </span>
            </div>

            <dl className="mt-5 space-y-3.5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-600 dark:text-slate-400">Total Garment Units</dt>
                <dd className="font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                  {summary.totalUnits.toLocaleString('en-IN')} pcs
                </dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-slate-600 dark:text-slate-400">
                  Taxable Subtotal (Excl. GST)
                </dt>
                <dd className="font-mono font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                  {formatINR(summary.totalSubtotal)}
                </dd>
              </div>

              {summary.gstBreakdown.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    GST Slab Breakdown
                  </p>
                  {summary.gstBreakdown.map((slab) => (
                    <div
                      key={slab.rate}
                      className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400"
                    >
                      <span>
                        GST @ {slab.rate}% (on {formatINR(slab.taxableAmount)})
                      </span>
                      <span className="font-mono text-slate-800 dark:text-slate-200 tabular-nums">
                        {formatINR(slab.gstAmount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                <dt className="font-medium text-slate-800 dark:text-slate-200">Total GST Payable</dt>
                <dd className="font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                  {formatINR(summary.totalGst)}
                </dd>
              </div>

              <div className="flex items-baseline justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <dt className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
                  Final Grand Total
                </dt>
                <dd className="font-mono text-2xl font-bold text-[#581C4C] dark:text-[#E29AD3] tabular-nums">
                  {formatINR(summary.grandTotal)}
                </dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ex-works Tiruppur estimate. Custom printing, embroidery, and woven labels are quoted
              upon artwork review.
            </p>

            <div className="mt-6 space-y-2.5 no-print">
              <button
                type="button"
                onClick={onAttachToInquiry}
                disabled={!hasItems || summary.totalUnits === 0}
                className="w-full py-3 px-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] disabled:opacity-45 disabled:pointer-events-none rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Request Official Proforma</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  disabled={!hasItems}
                  className="py-2.5 px-3 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-45 disabled:pointer-events-none rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check
                        className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Quote</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrintSummary}
                  disabled={!hasItems}
                  className="py-2.5 px-3 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-45 disabled:pointer-events-none rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Print Summary</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <PrintableQuoteModal
        isOpen={isPrintModalOpen}
        summary={summary}
        quoteRef={quoteRef}
        issuedDate={issuedDate}
        printDialogBlocked={printDialogBlocked}
        onPrint={triggerBrowserPrint}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </section>
  );
}
