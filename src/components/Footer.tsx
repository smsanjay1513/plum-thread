import { Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../App';
import { BrandLockup } from './BrandLogo';

interface FooterProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function Footer({ theme, onThemeChange }: FooterProps) {
  return (
    <footer className="bg-[#0F172A] dark:bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          <div className="md:col-span-5">
            <BrandLockup onDark />
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-sm">
              Vertically integrated knitwear and cut-and-sew apparel manufacturing in Tiruppur,
              Tamil Nadu, serving Indian and international apparel labels.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-display text-sm font-semibold text-white">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Product Catalogue
                </a>
              </li>
              <li>
                <a href="#quotation" className="hover:text-white transition-colors">
                  Quotation Calculator
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Manufacturing Process
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-display text-sm font-semibold text-white">Tiruppur Mill &amp; Office</p>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Plot 42, Apparel Industrial Estate, Avinashi Road, Tiruppur, Tamil Nadu 641603
            </p>
            <p className="mt-2 text-sm text-slate-400">orders@plumandthread.in</p>
            <p className="mt-1 font-mono text-xs text-slate-500">
              GST Registered Export &amp; Domestic Supplier
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Plum &amp; Thread Apparel Pvt. Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <span>Ex-works Tiruppur, India · ISO 9001 &amp; AQL 2.5 Compliant</span>
            <button
              type="button"
              onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Switch to Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Switch to Light</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
