export type PageRoute =
  | 'home'
  | 'catalogue'
  | 'quotation'
  | 'process'
  | 'why-us'
  | 'faq'
  | 'contact';

export const PAGE_TITLES: Record<PageRoute, string> = {
  home: 'Home',
  catalogue: 'Production Catalogue',
  quotation: 'Quotation Calculator',
  process: 'Manufacturing Process',
  'why-us': 'Why Choose Us',
  faq: 'Frequently Asked Questions',
  contact: 'Contact & RFQ',
};

export function routeToHash(route: PageRoute): string {
  return route === 'home' ? '#/' : `#/${route}`;
}

export function parseRouteFromLocation(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const validRoutes: PageRoute[] = [
    'home',
    'catalogue',
    'quotation',
    'process',
    'why-us',
    'faq',
    'contact',
  ];
  if (validRoutes.includes(rawHash as PageRoute)) {
    return rawHash as PageRoute;
  }
  return 'home';
}
