import { TESTIMONIALS, WHY_CHOOSE_US } from '../data/catalog';

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-16 lg:py-24 bg-[#FAFAFB] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Part 1: Why Choose Us Asymmetric Bento Grid */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#581C4C] dark:text-[#E29AD3]">
            Why Plum &amp; Thread
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
            Built for Procurement Rigor and Consistent Retail Quality
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Apparel brands stay with us because our Tiruppur facility eliminates broker layers,
            missed delivery windows, and unpredictable fabric shrinkage.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {WHY_CHOOSE_US.map((item) => (
            <article
              key={item.id}
              className={`p-6 sm:p-7 rounded-xl border flex flex-col justify-between ${
                item.featured
                  ? 'md:col-span-2 bg-[#0F172A] dark:bg-[#1E1020] text-white border-slate-800 dark:border-[#7A2769]/60'
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <p
                  className={`text-xs font-medium tracking-wide ${
                    item.featured
                      ? 'text-slate-300 dark:text-[#E29AD3]'
                      : 'text-[#581C4C] dark:text-[#E29AD3]'
                  }`}
                >
                  {item.kicker}
                </p>
                <h3
                  className={`mt-2.5 font-display text-xl sm:text-2xl font-semibold text-balance ${
                    item.featured ? 'text-white' : 'text-slate-900 dark:text-slate-100'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-sm sm:text-base leading-relaxed ${
                    item.featured
                      ? 'text-slate-300'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <div
                className={`mt-6 pt-4 border-t ${
                  item.featured
                    ? 'border-slate-800 dark:border-[#7A2769]/40'
                    : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                <p
                  className={`font-mono text-xs ${
                    item.featured ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.metric}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Part 2: Claim-to-Proof Customer Testimonials */}
        <div className="mt-16 pt-14 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#581C4C] dark:text-[#E29AD3]">
                Partner Proof
              </p>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Measured Outcomes Across D2C &amp; Corporate Buyers
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Verified procurement &amp; supply-chain partner feedback
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <figure
                key={testimonial.id}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-xs font-medium text-[#581C4C] dark:text-[#E29AD3]">
                    {testimonial.outcome}
                  </p>
                  <blockquote className="mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {testimonial.role}, {testimonial.company} <span aria-hidden="true">·</span>{' '}
                    {testimonial.location}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
