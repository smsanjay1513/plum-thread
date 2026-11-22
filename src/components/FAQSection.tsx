import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/catalog';

export function FAQSection() {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="py-16 lg:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-4">
            <p className="text-sm font-medium text-[#581C4C] dark:text-[#E29AD3]">
              Buyer Questions
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Clear answers on Tiruppur MOQs, statutory GST brackets, custom trims, and production
              turnaround times.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              const panelId = `faq-panel-${faq.id}`;
              const buttonId = `faq-button-${faq.id}`;

              return (
                <div key={faq.id}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(faq.id)}
                      className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] focus-visible:ring-inset"
                    >
                      <span className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-[#581C4C] dark:group-hover:text-[#E29AD3] transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#581C4C] dark:text-[#E29AD3]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="pb-6 pr-8 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
