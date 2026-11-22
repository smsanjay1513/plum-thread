# Plum & Thread — Tiruppur Apparel Manufacturing & Quotation Platform

A responsive, production-ready web application for **Plum & Thread**, a fictional apparel manufacturing company headquartered in Tiruppur, India. Built with React, TypeScript, Vite, and Tailwind CSS, featuring a synchronized product showcase and an interactive multi-slab GST bulk quotation calculator.

---

## Setup Instructions

### Prerequisites
- Node.js 20+ and npm

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start the development server (runs on port 3000)
npm run dev

# 3. Type-check and lint
npm run lint

# 4. Build for production
npm run build
```

---

## Core Features & Product Pricing Matrix

All eight apparel and headwear products are implemented with exact ex-factory unit prices and statutory HSN GST slabs:

| Product | SKU | Unit Price (INR) | GST Rate |
| --- | --- | ---: | ---: |
| Round-neck T-shirt | `PT-RN180` | ₹165.00 | 5% |
| Polo T-shirt | `PT-PL220` | ₹235.00 | 5% |
| Hoodie | `PT-HD320` | ₹480.00 | 5% |
| Track pant | `PT-TP260` | ₹320.00 | 5% |
| Padded jacket | `PT-PJ400` | ₹2,850.00 | 18% |
| Logo cap | `PT-LC006` | ₹95.00 | 12% |
| Kids romper | `PT-KR180` | ₹140.00 | 5% |
| Shorts | `PT-SH220` | ₹150.00 | 5% |

### Quotation Calculator Capabilities
- **Synchronized Catalog & Calculator**: Adding or adjusting items in the catalog updates the quotation ledger in real time and vice versa.
- **Quantity Validation**: Stepper buttons (`-` / `+`) and direct numeric inputs enforce non-negative integers via `sanitizeQuantity()`.
- **Line-Item & Slab Math**: Calculates exact line subtotals (`unitPrice × quantity`), product-wise GST (`subtotal × gstRate / 100`), GST totals grouped by 5%, 12%, and 18% slabs, total GST, and final grand total using `roundCurrency()` to avoid floating-point rounding drift.
- **Lifecycle Controls**: Individual item removal, **Reset Selections** (resets selected product quantities to `1`), **Clear Quotation** (enters a guided empty state with quick-start actions), **Copy Quote** to clipboard, **Print Summary** (`@media print` styles), and direct **Request Official Proforma** attachment into the validated inquiry form.

---

## Design Decisions

1. **Domain-Matched Typography & Palette**: Paired `Outfit` for architectural display headings, `Public Sans` for readable B2B prose, and `JetBrains Mono` (`tabular-nums`) for aligned INR currency and GST figures. A 60-30-10 neutral-first palette (crisp `#FAFAFB` canvas, cool `#E2E8F0` hairlines, deep `#581C4C` plum accents) reflects the brand identity with WCAG AA+ contrast.
2. **Modular Architecture**: Data definitions (`src/data/catalog.ts`), pure quotation calculation utilities (`src/utils/quotation.ts`), resilient image handling (`src/components/SafeImage.tsx`), and section components (`Navbar`, `Hero`, `ProductCatalog`, `QuotationCalculator`, `ManufacturingProcess`, `WhyChooseUs`, `FAQSection`, `ContactSection`, `Footer`) are cleanly separated for maintainability and testability.
3. **Accessible Interactive Controls**: Semantic landmarks, keyboard-focusable controls (`focus-visible`), `aria-expanded` / `aria-controls` on the navigation drawer and FAQ accordion, and inline form validation with `role="alert"` error messages.

---

## AI Usage Disclosure

- **Development & Assets**: AI-assisted coding and image generation were used during development to scaffold component layouts, refine Tailwind CSS responsiveness, and generate bespoke studio product and factory floor photography stored locally in `src/assets/images/`.
- **Verification**: All product prices, GST slab formulas, edge-case quantity sanitization, and UI interactions were verified against the assessment requirements and validated via TypeScript compilation, linting, and production build checks.
