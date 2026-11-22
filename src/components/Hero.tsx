import { ArrowRight, Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../App';
import { COMPANY_STATS, FACILITY_MEDIA } from '../data/catalog';
import { SafeImage } from './SafeImage';

interface HeroProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onBuildQuote: () => void;
}

export function Hero({ theme, onThemeChange, onBuildQuote }: HeroProps) {
  return (
    <section
      id="top"
      className="pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 dark:border-slate-800 bg-[#FAFAFB] dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Regional Bar + Light/Dark Theme Switch */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 tracking-wide">
            Tiruppur, Tamil Nadu <span aria-hidden="true">·</span> Export Knitwear &amp; Cut-and-Sew Facility
          </p>

          <div
            role="group"
            aria-label="Color theme"
            className="inline-flex items-center p-1 bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg"
          >
            <button
              type="button"
              onClick={() => onThemeChange('light')}
              aria-pressed={theme === 'light'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] ${
                theme === 'light'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => onThemeChange('dark')}
              aria-pressed={theme === 'dark'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] ${
                theme === 'dark'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* 2-Column Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <h1
                className="font-display font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
              >
                Precision Apparel Manufacturing Built for Modern Brands
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                From 180 GSM combed cotton basics to quilted winter outerwear, Plum &amp; Thread delivers
                factory-direct production in Tiruppur with verified shrinkage control, AQL 2.5 audits,
                and transparent GST-itemized bulk quotes.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={onBuildQuote}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
              >
                <span>Calculate Bulk Quote</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#catalog"
                className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 hover:text-[#581C4C] dark:hover:text-[#E29AD3] underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:decoration-[#581C4C] dark:hover:decoration-[#E29AD3] transition-colors whitespace-nowrap shrink-0"
              >
                Explore 8 Core Categories
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <SafeImage
                src={FACILITY_MEDIA.heroFactory}
                alt="Plum & Thread sewing floor in Tiruppur with stacked combed cotton fabric bolts and industrial workstations"
                fallbackTitle="Plum & Thread — Tiruppur Production Floor"
                fallbackSubtitle="Vertically integrated circular knitting, bio-wash dyeing, and cut-and-sew lines."
                aspectClassName="h-full w-full"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Company Statistics & Credibility Strip */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 overflow-hidden">
          {COMPANY_STATS.map((stat) => (
            <div key={stat.label} className="p-6">
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1.5 font-display text-sm font-semibold text-[#581C4C] dark:text-[#E29AD3]">
                {stat.label}
              </p>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-snug">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
