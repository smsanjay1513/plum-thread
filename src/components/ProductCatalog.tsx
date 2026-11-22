import { Minus, Plus, Check, ArrowRight } from 'lucide-react';
import { FACILITY_MEDIA, Product, PRODUCTS } from '../data/catalog';
import { formatINR } from '../utils/quotation';
import { SafeImage } from './SafeImage';

interface ProductCatalogProps {
  quantitiesById: Record<string, number>;
  onAddProduct: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  selectedCount?: number;
  totalQuoteUnits?: number;
  onJumpToQuotation?: () => void;
}

export function ProductCatalog({
  quantitiesById,
  onAddProduct,
  onUpdateQuantity,
  selectedCount = 0,
  totalQuoteUnits = 0,
  onJumpToQuotation,
}: ProductCatalogProps) {
  return (
    <section
      id="catalog"
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="pb-10 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#581C4C] dark:text-[#E29AD3]">
              Production Catalogue
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              Eight Core Apparel Lines Ready for Private-Label Production
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Every SKU below is manufactured in-house at our Tiruppur facility with transparent
              ex-factory unit pricing and statutory HSN GST slabs. Add items directly to build an
              instant estimate.
            </p>
          </div>
        </div>

        {/* Visual Collection Showcase Pair */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <figure className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#FAFAFB] dark:bg-slate-950">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <SafeImage
                src={FACILITY_MEDIA.knitwearCollection}
                alt="Folded combed cotton round-neck t-shirt, piqué polo t-shirt, and brushed fleece hoodie"
                fallbackTitle="Knitwear & Fleece Program"
                fallbackSubtitle="Round-neck T-shirts, Polo T-shirts, and 320 GSM Hoodies"
                aspectClassName="aspect-[4/3]"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="p-5 flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  Knitwear &amp; Fleece Program
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Round-neck T-shirts, Polo T-shirts &amp; Hoodies · 5% GST
                </p>
              </div>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                180–320 GSM
              </span>
            </figcaption>
          </figure>

          <figure className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#FAFAFB] dark:bg-slate-950">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <SafeImage
                src={FACILITY_MEDIA.outerwearWorkwear}
                alt="Quilted padded jacket, cotton fleece track pants, athletic shorts, and structured six-panel logo cap"
                fallbackTitle="Outerwear, Bottoms & Headwear"
                fallbackSubtitle="Padded Jackets, Track Pants, Shorts, and Embroidered Caps"
                aspectClassName="aspect-[4/3]"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="p-5 flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  Outerwear, Bottoms &amp; Headwear
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Track pants, Padded jackets, Shorts &amp; Logo caps · 5%–18% GST
                </p>
              </div>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                Cut &amp; Sew
              </span>
            </figcaption>
          </figure>
        </div>

        {/* 8-Product Specification & Quick-Quote Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product: Product) => {
            const currentQty = quantitiesById[product.id] ?? 0;
            const inQuote = currentQty > 0;

            return (
              <article
                key={product.id}
                className={`flex flex-col justify-between p-5 rounded-xl border transition-colors duration-150 ${
                  inQuote
                    ? 'border-[#581C4C]/40 dark:border-[#9E3D89]/70 bg-[#FBF7FA] dark:bg-[#231120]'
                    : 'border-slate-200 dark:border-slate-800 bg-[#FAFAFB] dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Unboxed quiet metadata line (Zero-pill discipline) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="truncate">{product.category}</span>
                    <span className="font-mono shrink-0">{product.sku}</span>
                  </div>

                  <h3 className="mt-2.5 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                      {formatINR(product.unitPrice)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      / unit <span aria-hidden="true">·</span> {product.gstRate}% GST
                    </span>
                  </div>

                  <dl className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs text-slate-500 dark:text-slate-400">Fabric</dt>
                      <dd className="font-medium text-slate-800 dark:text-slate-200">
                        {product.fabricSpec}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-500 dark:text-slate-400">Construction</dt>
                      <dd className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                        {product.stitchingDetail}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                  {inQuote ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#581C4C] dark:text-[#E29AD3]">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        In Quote
                      </span>
                      <div className="inline-flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, currentQty - 1)}
                          aria-label={`Decrease quantity for ${product.name}`}
                          className="w-9 h-9 inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-lg transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-mono text-sm font-semibold text-slate-900 dark:text-slate-100 tabular-nums min-w-[2.5rem] text-center">
                          {currentQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, currentQty + 1)}
                          aria-label={`Increase quantity for ${product.name}`}
                          className="w-9 h-9 inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-r-lg transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAddProduct(product.id)}
                      className="w-full py-2.5 px-4 text-sm font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-[#581C4C] dark:hover:border-[#E29AD3] hover:text-[#581C4C] dark:hover:text-[#E29AD3] rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3]"
                    >
                      Add to Quote
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {selectedCount > 0 && onJumpToQuotation && (
          <div className="mt-8 p-5 rounded-xl border border-[#581C4C]/30 dark:border-[#9E3D89]/60 bg-[#FBF7FA] dark:bg-[#231120] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                <span className="font-mono tabular-nums">{selectedCount}</span> product
                {selectedCount === 1 ? '' : 's'} ({totalQuoteUnits.toLocaleString('en-IN')} unit
                {totalQuoteUnits === 1 ? '' : 's'}) added to your quotation
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                Your selections are saved automatically across page refreshes. Review subtotals and
                GST below.
              </p>
            </div>
            <button
              type="button"
              onClick={onJumpToQuotation}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>View Quotation</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
