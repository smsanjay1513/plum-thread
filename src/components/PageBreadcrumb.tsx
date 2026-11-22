import { ArrowLeft, ChevronRight } from 'lucide-react';
import { PAGE_TITLES, PageRoute } from '../types/navigation';

interface PageBreadcrumbProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export function PageBreadcrumb({ currentPage, onNavigate }: PageBreadcrumbProps) {
  if (currentPage === 'home') return null;

  return (
    <div className="bg-[#FAFAFB] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-slate-600 dark:text-slate-400 hover:text-[#581C4C] dark:hover:text-[#E29AD3] font-medium transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
          <span className="font-semibold text-slate-900 dark:text-slate-100" aria-current="page">
            {PAGE_TITLES[currentPage]}
          </span>
        </nav>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Overview</span>
        </button>
      </div>
    </div>
  );
}
