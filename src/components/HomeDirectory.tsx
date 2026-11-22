import { ArrowRight } from 'lucide-react';
import { PageRoute } from '../types/navigation';

interface HomeDirectoryProps {
  totalQuoteItems: number;
  totalQuoteUnits: number;
  onNavigate: (page: PageRoute) => void;
}

const DIRECTORY_CARDS: Array<{
  page: PageRoute;
  index: string;
  title: string;
  description: string;
  actionLabel: string;
}> = [
  {
    page: 'catalogue',
    index: '01.',
    title: 'Production Catalogue',
    description:
      'Inspect all eight Tiruppur-manufactured garments and headwear SKUs with fabric GSM specs, stitching details, and base pricing.',
    actionLabel: 'Open Catalogue',
  },
  {
    page: 'quotation',
    index: '02.',
    title: 'GST Quotation Calculator',
    description:
      'Add SKUs, adjust unit quantities, and review live product-wise subtotals across 5%, 12%, and 18% GST brackets.',
    actionLabel: 'Open Calculator',
  },
  {
    page: 'process',
    index: '03.',
    title: 'Manufacturing Process',
    description:
      'Follow our 22-day workflow from circular yarn knitting and bio-wash dyeing to CAD grading and AQL 2.5 inspection.',
    actionLabel: 'View 5 Stages',
  },
  {
    page: 'why-us',
    index: '04.',
    title: 'Why Choose Us & Proof',
    description:
      'Review factory-direct Tiruppur economics, HSN tax clarity, and measured outcomes from partner apparel brands.',
    actionLabel: 'Read Partner Proof',
  },
  {
    page: 'faq',
    index: '05.',
    title: 'Buyer FAQs',
    description:
      'Answers on commercial MOQs, custom printing & embroidery options, sampling turnaround, and domestic/export freight.',
    actionLabel: 'Browse FAQs',
  },
  {
    page: 'contact',
    index: '06.',
    title: 'Merchandising Desk & RFQ',
    description:
      'Submit your production inquiry or attach an itemized quotation estimate for an official proforma invoice.',
    actionLabel: 'Contact Tiruppur Desk',
  },
];

export function HomeDirectory({
  totalQuoteItems,
  totalQuoteUnits,
  onNavigate,
}: HomeDirectoryProps) {
  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#581C4C] dark:text-[#E29AD3]">
              Explore Plum &amp; Thread
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              Everything Required to Source &amp; Price Your Next Apparel Run
            </h2>
          </div>

          {totalQuoteItems > 0 && (
            <button
              type="button"
              onClick={() => onNavigate('quotation')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#581C4C] dark:text-[#E29AD3] bg-[#FBF7FA] dark:bg-[#231120] border border-[#581C4C]/30 dark:border-[#9E3D89]/60 rounded-lg hover:border-[#581C4C] dark:hover:border-[#E29AD3] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="font-mono tabular-nums">
                Active Quote: {totalQuoteItems} SKU{totalQuoteItems === 1 ? '' : 's'} ·{' '}
                {totalQuoteUnits} pcs
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIRECTORY_CARDS.map((card) => (
            <button
              key={card.page}
              type="button"
              onClick={() => onNavigate(card.page)}
              className="group text-left p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-[#FAFAFB] dark:bg-slate-950 hover:border-[#581C4C] dark:hover:border-[#E29AD3] transition-colors duration-150 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3]"
            >
              <div>
                <span className="font-mono text-sm font-semibold text-[#581C4C] dark:text-[#E29AD3]">
                  {card.index}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-[#581C4C] dark:group-hover:text-[#E29AD3] transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#581C4C] dark:group-hover:text-[#E29AD3]">
                <span>{card.actionLabel}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
