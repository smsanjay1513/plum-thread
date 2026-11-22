import { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { formatINR, QuotationSummary } from '../utils/quotation';

interface ContactSectionProps {
  summary: QuotationSummary;
  quoteAttached: boolean;
  onToggleQuoteAttached: (attached: boolean) => void;
}

interface FormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const INITIAL_FORM: FormValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
};

export function ContactSection({
  summary,
  quoteAttached,
  onToggleQuoteAttached,
}: ContactSectionProps) {
  const [form, setForm] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const hasQuoteItems = summary.lines.length > 0 && summary.totalUnits > 0;

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid business email address.';
    }

    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      nextErrors.phone = 'Please enter a valid 10–15 digit phone or WhatsApp number.';
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please share brief details on fabric, sizing, or delivery timeline.';
    }

    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const referenceCode = `PT-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(referenceCode);
  };

  const handleNewInquiry = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmittedRef(null);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#FAFAFB] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Tiruppur Facility & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-sm font-medium text-[#581C4C] dark:text-[#E29AD3]">
                Direct Merchandising Desk
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
                Start Your Production Run in Tiruppur
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Send your quotation estimate or tech pack directly to our production planning team.
                We respond with an official GST proforma invoice and sampling schedule within one
                business day.
              </p>
            </div>

            <dl className="space-y-5 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin
                  className="w-5 h-5 text-[#581C4C] dark:text-[#E29AD3] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">
                    Manufacturing Facility
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Plot 42, Apparel Industrial Estate, Avinashi Road,
                    <br />
                    Tiruppur, Tamil Nadu 641603, India
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone
                  className="w-5 h-5 text-[#581C4C] dark:text-[#E29AD3] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">
                    Merchandising &amp; Export Desk
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-400 mt-0.5 font-mono">
                    +91 421 248 9104
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail
                  className="w-5 h-5 text-[#581C4C] dark:text-[#E29AD3] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">
                    RFQ &amp; Tech Packs
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-400 mt-0.5">
                    orders@plumandthread.in
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock
                  className="w-5 h-5 text-[#581C4C] dark:text-[#E29AD3] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">
                    Production &amp; Office Hours
                  </dt>
                  <dd className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Monday – Saturday · 09:00 to 18:30 IST
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Right Column: Validated Lead Capture Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
            {submittedRef ? (
              <div className="py-8 text-center max-w-md mx-auto">
                <CheckCircle2
                  className="w-11 h-11 text-emerald-700 dark:text-emerald-400 mx-auto"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Production Inquiry Logged
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Thank you,{' '}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {form.name}
                  </span>
                  . Our Tiruppur merchandising desk has recorded reference{' '}
                  <span className="font-mono font-semibold text-[#581C4C] dark:text-[#E29AD3]">
                    {submittedRef}
                  </span>{' '}
                  and will email your proforma schedule to{' '}
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {form.email}
                  </span>
                  .
                </p>
                {quoteAttached && hasQuoteItems && (
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                    Attached estimate: {summary.totalUnits} units · Grand Total{' '}
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {formatINR(summary.grandTotal)}
                    </span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleNewInquiry}
                  className="mt-6 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Request Manufacturing Quote
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Response within 1 business day
                  </span>
                </div>

                {/* Optional Live Quotation Attachment */}
                {hasQuoteItems && (
                  <div className="p-4 rounded-lg bg-[#FBF7FA] dark:bg-[#231120] border border-[#581C4C]/20 dark:border-[#9E3D89]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <label className="inline-flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={quoteAttached}
                          onChange={(e) => onToggleQuoteAttached(e.target.checked)}
                          className="w-4 h-4 accent-[#581C4C] dark:accent-[#E29AD3] rounded cursor-pointer"
                        />
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Attach active quotation ({summary.lines.length} SKU
                          {summary.lines.length === 1 ? '' : 's'}, {summary.totalUnits} units)
                        </span>
                      </label>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 pl-6">
                        Grand Total incl. GST:{' '}
                        <span className="font-mono font-semibold text-[#581C4C] dark:text-[#E29AD3]">
                          {formatINR(summary.grandTotal)}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Full Name <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ananya Krishnan"
                      aria-invalid={Boolean(errors.name)}
                      className="w-full h-11 px-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#581C4C] dark:focus:ring-[#E29AD3] focus:border-[#581C4C] dark:focus:border-[#E29AD3]"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-700 dark:text-red-400" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Brand or Company Name
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Coromandel Apparel Co."
                      className="w-full h-11 px-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#581C4C] dark:focus:ring-[#E29AD3] focus:border-[#581C4C] dark:focus:border-[#E29AD3]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Business Email <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="sourcing@yourbrand.in"
                      aria-invalid={Boolean(errors.email)}
                      className="w-full h-11 px-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#581C4C] dark:focus:ring-[#E29AD3] focus:border-[#581C4C] dark:focus:border-[#E29AD3]"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-700 dark:text-red-400" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Phone / WhatsApp <span className="text-red-600 dark:text-red-400">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98422 00000"
                      aria-invalid={Boolean(errors.phone)}
                      className="w-full h-11 px-3.5 font-mono text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#581C4C] dark:focus:ring-[#E29AD3] focus:border-[#581C4C] dark:focus:border-[#E29AD3]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-700 dark:text-red-400" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    Fabric, Printing &amp; Delivery Requirements{' '}
                    <span className="text-red-600 dark:text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Share target GSM, Pantone shades, print/embroidery placement, size ratio, and delivery city..."
                    aria-invalid={Boolean(errors.message)}
                    className="w-full p-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-[#FAFAFB] dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#581C4C] dark:focus:ring-[#E29AD3] focus:border-[#581C4C] dark:focus:border-[#E29AD3]"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-700 dark:text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-[#581C4C] hover:bg-[#45143B] dark:bg-[#7A2769] dark:hover:bg-[#8E307B] rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#581C4C] dark:focus-visible:ring-[#E29AD3] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                >
                  Submit Production Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
