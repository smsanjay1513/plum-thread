import { FACILITY_MEDIA, MANUFACTURING_STEPS } from '../data/catalog';
import { SafeImage } from './SafeImage';

export function ManufacturingProcess() {
  return (
    <section
      id="process"
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Editorial Intro & Inspection Photograph */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <p className="text-sm font-medium text-[#581C4C] dark:text-[#E29AD3]">
              Manufacturing Workflow
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              Five Disciplined Stages From Raw Yarn to Export Dispatch
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Every bulk order moves through a traceable 22-day Tiruppur production schedule with
              documented GSM verification, colorfastness testing, and AQL 2.5 checkpoints.
            </p>

            <div className="mt-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
              <div className="aspect-[4/3]">
                <SafeImage
                  src={FACILITY_MEDIA.craftInspection}
                  alt="Quality assurance specialist inspecting flatlock seam tension on a deep plum cotton garment"
                  fallbackTitle="AQL 2.5 Quality Assurance Table"
                  fallbackSubtitle="Inline GSM verification and seam-tension calibration on every production lot."
                  aspectClassName="aspect-[4/3]"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-[#FAFAFB] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span>Inline Seam &amp; GSM Verification</span>
                <span className="font-mono text-slate-900 dark:text-slate-100">
                  AQL 2.5 Standard
                </span>
              </div>
            </div>
          </div>

          {/* Right 5-Step Editorial Process List */}
          <div className="lg:col-span-7 divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
            {MANUFACTURING_STEPS.map((item) => (
              <div
                key={item.step}
                className="py-7 first:pt-6 last:pb-6 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start"
              >
                <div className="sm:col-span-3 flex sm:flex-col items-baseline sm:items-start justify-between gap-2">
                  <span className="font-mono text-xl font-semibold text-[#581C4C] dark:text-[#E29AD3] tabular-nums">
                    {item.step}
                  </span>
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {item.leadTime}
                  </span>
                </div>

                <div className="sm:col-span-9">
                  <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="mt-3 font-mono text-xs text-slate-700 dark:text-slate-300">
                    Spec Benchmark: {item.specification}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
