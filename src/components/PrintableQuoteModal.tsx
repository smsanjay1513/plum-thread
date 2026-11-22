import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, Printer, X } from 'lucide-react';
import {
  buildPrintableQuoteHtml,
  formatINR,
  QuotationSummary,
} from '../utils/quotation';
import { BrandLogo } from './BrandLogo';

interface PrintableQuoteModalProps {
  isOpen: boolean;
  summary: QuotationSummary;
  quoteRef: string;
  issuedDate: string;
  printDialogBlocked: boolean;
  onPrint: () => void;
  onClose: () => void;
}

export function PrintableQuoteModal({
  isOpen,
  summary,
  quoteRef,
  issuedDate,
  printDialogBlocked,
  onPrint,
  onClose,
}: PrintableQuoteModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  const handleDownloadPrintableHtml = () => {
    const html = buildPrintableQuoteHtml(summary, quoteRef, issuedDate);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `Plum-and-Thread-Quotation-${quoteRef}.html`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div
      id="printable-quotation-modal-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/65 backdrop-blur-xs p-4 sm:p-6 lg:p-8 flex items-start justify-center"
    >
      <div className="w-full max-w-4xl my-auto">
        {/* Interactive Modal Toolbar (hidden when printing) */}
        <div className="no-print mb-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2
                id="print-modal-title"
                className="font-display text-base font-semibold text-slate-900 dark:text-slate-100"
              >
                Printable Quotation Summary
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reference <span className="font-mono">{quoteRef}</span> · Formatted for A4 print &amp;
                PDF export
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadPrintableHtml}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download Print Sheet (.html)</span>
              </button>

              <button
                type="button"
                onClick={onPrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Print / Save PDF</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close print preview"
                className="inline-flex items-center justify-center w-9 h-9 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {printDialogBlocked && (
            <p className="mt-2.5 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-xs text-amber-800 dark:text-amber-300">
              Your embedded browser preview blocked the native print dialog. Click{' '}
              <span className="font-semibold">Download Print Sheet (.html)</span> to open this
              sheet in a browser tab for printing or saving as PDF.
            </p>
          )}
        </div>

        {/* Crisp White-Paper Printable Sheet */}
        <article
          id="printable-quotation-sheet"
          className="bg-white text-slate-900 border border-slate-200 rounded-xl shadow-2xl p-6 sm:p-10"
        >
          {/* Sheet Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-[#581C4C]">
            <div className="flex items-start gap-3">
              <BrandLogo className="w-9 h-9 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-xl font-bold text-[#581C4C]">
                  Plum &amp; Thread Apparel Pvt. Ltd.
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Plot 42, Apparel Industrial Estate, Avinashi Road
                  <br />
                  Tiruppur, Tamil Nadu 641603 · orders@plumandthread.in
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-slate-900">
                Quotation Summary
              </p>
              <dl className="mt-1.5 space-y-0.5 text-xs text-slate-600">
                <div>
                  <dt className="inline">Ref: </dt>
                  <dd className="inline font-mono font-semibold text-slate-900">{quoteRef}</dd>
                </div>
                <div>
                  <dt className="inline">Date: </dt>
                  <dd className="inline">{issuedDate}</dd>
                </div>
                <div>
                  <dt className="inline">Terms: </dt>
                  <dd className="inline">INR · Ex-Works Tiruppur</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Itemized Line-Item Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  <th scope="col" className="py-2.5 px-3">
                    Product &amp; Fabric
                  </th>
                  <th scope="col" className="py-2.5 px-3 text-right">
                    Unit Price
                  </th>
                  <th scope="col" className="py-2.5 px-3 text-right">
                    Qty
                  </th>
                  <th scope="col" className="py-2.5 px-3 text-right">
                    Subtotal
                  </th>
                  <th scope="col" className="py-2.5 px-3 text-right">
                    GST
                  </th>
                  <th scope="col" className="py-2.5 px-3 text-right">
                    Line Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {summary.lines.map((line) => (
                  <tr key={line.product.id}>
                    <td className="py-3 px-3">
                      <p className="font-display font-semibold text-slate-900">
                        {line.product.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {line.product.sku} · {line.product.fabricSpec}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 tabular-nums whitespace-nowrap">
                      {formatINR(line.unitPrice)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-700 tabular-nums whitespace-nowrap">
                      {line.quantity.toLocaleString('en-IN')} pcs
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-800 tabular-nums whitespace-nowrap">
                      {formatINR(line.subtotal)}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <span className="font-mono text-slate-800 tabular-nums block">
                        {formatINR(line.gstAmount)}
                      </span>
                      <span className="text-[11px] text-slate-500 tabular-nums">
                        {line.gstRate}% slab
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-semibold text-slate-900 tabular-nums whitespace-nowrap">
                      {formatINR(line.lineTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Commercial Notes */}
          <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-slate-900">Production &amp; Tax Notes</p>
              <p>• Prices are ex-works Tiruppur estimates with statutory Indian HSN GST slabs.</p>
              <p>
                • Custom screen printing, puff print, embroidery, and woven labels are quoted upon
                artwork review.
              </p>
              <p>• ISO 9001 &amp; AQL 2.5 final inspection prior to dispatch.</p>
            </div>

            <div className="md:col-span-5 rounded-xl border border-slate-200 bg-[#FBF7FA] p-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total Garment Units</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  {summary.totalUnits.toLocaleString('en-IN')} pcs
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600">Taxable Subtotal (Excl. GST)</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  {formatINR(summary.totalSubtotal)}
                </span>
              </div>

              {summary.gstBreakdown.map((slab) => (
                <div
                  key={slab.rate}
                  className="flex items-center justify-between text-xs text-slate-600"
                >
                  <span>
                    GST @ {slab.rate}% (on {formatINR(slab.taxableAmount)})
                  </span>
                  <span className="font-mono text-slate-800 tabular-nums">
                    {formatINR(slab.gstAmount)}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="font-medium text-slate-800">Total GST Payable</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {formatINR(summary.totalGst)}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-2.5 border-t border-slate-300">
                <span className="font-display font-bold text-slate-900">Final Grand Total</span>
                <span className="font-mono text-xl font-bold text-[#581C4C] tabular-nums">
                  {formatINR(summary.grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>,
    document.body
  );
}
