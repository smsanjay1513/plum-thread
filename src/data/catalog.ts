export type ProductCategory =
  | 'Tops & Fleece'
  | 'Bottoms & Outerwear'
  | 'Kids & Headwear';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  unitPrice: number;
  gstRate: 5 | 12 | 18;
  fabricSpec: string;
  stitchingDetail: string;
  typicalUse: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'round-neck-tshirt',
    sku: 'PT-RN180',
    name: 'Round-neck T-shirt',
    category: 'Tops & Fleece',
    unitPrice: 165,
    gstRate: 5,
    fabricSpec: '180 GSM Combed Ring-Spun Cotton',
    stitchingDetail: 'Bio-washed jersey · Lycra rib collar · Shoulder tape',
    typicalUse: 'D2C basics, retail drops, corporate events',
  },
  {
    id: 'polo-tshirt',
    sku: 'PT-PL220',
    name: 'Polo T-shirt',
    category: 'Tops & Fleece',
    unitPrice: 235,
    gstRate: 5,
    fabricSpec: '220 GSM Honeycomb Piqué',
    stitchingDetail: 'Two-button placket · Flat-knit collar · Side slits',
    typicalUse: 'Corporate uniforms, hospitality, golf & teamwear',
  },
  {
    id: 'hoodie',
    sku: 'PT-HD320',
    name: 'Hoodie',
    category: 'Tops & Fleece',
    unitPrice: 480,
    gstRate: 5,
    fabricSpec: '320 GSM Brushed Cotton Fleece',
    stitchingDetail: 'Double-lined hood · Kangaroo pocket · 2x2 rib cuffs',
    typicalUse: 'Streetwear labels, winter collections, university merch',
  },
  {
    id: 'track-pant',
    sku: 'PT-TP260',
    name: 'Track pant',
    category: 'Bottoms & Outerwear',
    unitPrice: 320,
    gstRate: 5,
    fabricSpec: '260 GSM Loopback French Terry',
    stitchingDetail: 'Elasticated drawcord waist · Zippered side pockets',
    typicalUse: 'Athleisure lines, loungewear, training kits',
  },
  {
    id: 'padded-jacket',
    sku: 'PT-PJ400',
    name: 'Padded jacket',
    category: 'Bottoms & Outerwear',
    unitPrice: 2850,
    gstRate: 18,
    fabricSpec: 'Water-Repellent Nylon Shell · Poly-Fill',
    stitchingDetail: 'Baffle quilting · YKK storm zipper · Inner welt pocket',
    typicalUse: 'Winter outerwear, outdoor expeditions, cold-climate uniforms',
  },
  {
    id: 'logo-cap',
    sku: 'PT-LC006',
    name: 'Logo cap',
    category: 'Kids & Headwear',
    unitPrice: 95,
    gstRate: 12,
    fabricSpec: '260 GSM Brushed Cotton Twill',
    stitchingDetail: '6-panel structured crown · Brass buckle strap',
    typicalUse: 'Brand merchandise, promotional campaigns, retail add-ons',
  },
  {
    id: 'kids-romper',
    sku: 'PT-KR180',
    name: 'Kids romper',
    category: 'Kids & Headwear',
    unitPrice: 140,
    gstRate: 5,
    fabricSpec: '180 GSM Organic Cotton Interlock',
    stitchingDetail: 'Nickel-free snap closures · Envelope neckline',
    typicalUse: 'Infant & toddler labels, organic childrenswear boutiques',
  },
  {
    id: 'shorts',
    sku: 'PT-SH220',
    name: 'Shorts',
    category: 'Bottoms & Outerwear',
    unitPrice: 150,
    gstRate: 5,
    fabricSpec: '220 GSM Single Jersey / Terry',
    stitchingDetail: 'Reinforced crotch gusset · Double-needle hem',
    typicalUse: 'Summer casuals, activewear, resort retail',
  },
];

export const COMPANY_STATS = [
  {
    value: '18+ Years',
    label: 'Tiruppur Manufacturing Heritage',
    detail: 'Operating vertically integrated lines in Tamil Nadu since 2008',
  },
  {
    value: '150,000+',
    label: 'Monthly Garment Capacity',
    detail: '1.8M+ finished pieces dispatched annually across 8 core categories',
  },
  {
    value: '99.2% AQL',
    label: 'Quality Pass Rate (FY 2025–26)',
    detail: 'Verified inline & pre-shipment AQL 2.5 inspection compliance',
  },
  {
    value: '42+ Brands',
    label: 'Active B2B & Export Partners',
    detail: 'Serving Indian D2C labels, corporate fleets & EU private labels',
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  leadTime: string;
  description: string;
  specification: string;
}

export const MANUFACTURING_STEPS: ProcessStep[] = [
  {
    step: '01.',
    title: 'Yarn Sourcing & Circular Knitting',
    leadTime: 'Days 1–4',
    description:
      'We procure 100% combed ring-spun cotton, organic interlock, and poly-cotton yarns directly from Tiruppur spinning mills and knit custom GSM fabric lots.',
    specification: '180–360 GSM tolerance ±3%',
  },
  {
    step: '02.',
    title: 'Eco Dyeing, Bio-Wash & Compacting',
    leadTime: 'Days 5–9',
    description:
      'Fabric batches undergo reactive dyeing matched to Pantone TPX standards, silicone bio-washing for pill-free handfeel, and tubular compacting.',
    specification: 'Shrinkage controlled under 2%',
  },
  {
    step: '03.',
    title: 'CAD Grading & Cut-and-Sew Lines',
    leadTime: 'Days 10–15',
    description:
      'Automated CAD pattern grading maximizes fabric yield before garments move across specialized Juki flatlock, 4-thread overlock, and single-needle lines.',
    specification: 'XS–3XL size spec tolerance ±0.5 cm',
  },
  {
    step: '04.',
    title: 'Print, Embroidery & Custom Trims',
    leadTime: 'Days 16–19',
    description:
      'In-house screen printing (water-based, plastisol, puff), Tajima multi-head embroidery, heat-transfer neck labels, and custom woven brand tags.',
    specification: '50+ wash-cycle print fastness',
  },
  {
    step: '05.',
    title: 'AQL 2.5 Inspection & Dispatch',
    leadTime: 'Days 20–22',
    description:
      'Every piece passes thread trimming, steam pressing, needle detection, and AQL 2.5 auditing before polybagging, barcoding, and GST-invoiced dispatch.',
    specification: 'Pan-India & FOB Tuticorin / Chennai',
  },
];

export interface AdvantageItem {
  id: string;
  kicker: string;
  title: string;
  description: string;
  metric: string;
  featured?: boolean;
}

export const WHY_CHOOSE_US: AdvantageItem[] = [
  {
    id: 'direct-tiruppur',
    kicker: 'Vertical Integration',
    title: 'Factory-Direct Tiruppur Economics Without Broker Markups',
    description:
      'Knitting, dyeing coordination, cutting, stitching, and finishing happen within a 12 km Tiruppur radius under one production schedule. You pay transparent ex-factory rates with zero middleman commissions.',
    metric: '18–24% lower landed cost vs. multi-tier sourcing agents',
    featured: true,
  },
  {
    id: 'gst-clarity',
    kicker: 'Tax & Billing Rigor',
    title: 'Accurate Multi-Slab GST Invoicing',
    description:
      'Apparel and headwear span 5%, 12%, and 18% GST brackets depending on HSN classification. Our billing system segregates every SKU slab cleanly for smooth input tax credit claims.',
    metric: '100% HSN-mapped GST invoices',
  },
  {
    id: 'sampling-speed',
    kicker: 'Rapid Prototyping',
    title: '7-Day Fit & Strike-Off Sampling',
    description:
      'Move from tech pack or reference garment to physical pre-production samples in seven working days, complete with lab-dip shade cards and wash-test reports.',
    metric: '7 business days sample dispatch',
  },
  {
    id: 'flexible-runs',
    kicker: 'Scalable Production',
    title: 'Built for Emerging Labels & Enterprise Orders',
    description:
      'Start with pilot runs of 100 units per style/colorway and scale seamlessly to 25,000+ seasonal replenishments on reserved assembly lines.',
    metric: '100 units min. pilot run · 150K/mo capacity',
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  outcome: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Before moving production to Plum & Thread, our Bengaluru knitwear drops suffered inconsistent collar rib recovery and 14-day shipping delays. Their bio-washed 180 GSM round-necks and locked 21-day dispatch schedule cut our customer return rate from 6.4% to 1.1% over two quarters.',
    name: 'Raghavendra Nair',
    role: 'Head of Supply Chain',
    company: 'Kaveri Loom Collective',
    location: 'Bengaluru, Karnataka',
    outcome: 'Return rate dropped from 6.4% to 1.1% across 45,000 units',
  },
  {
    id: 't2',
    quote:
      'Sourcing corporate polos, fleece hoodies, and embroidered logo caps used to mean coordinating three separate vendors and reconciling messy tax bills. Plum & Thread consolidated all three lines under one Tiruppur merchandiser with clear 5% and 12% GST itemized invoicing.',
    name: 'Meenakshi Deshmukh',
    role: 'Procurement Lead',
    company: 'VerveWork Solutions Pvt. Ltd.',
    location: 'Pune, Maharashtra',
    outcome: 'Consolidated 3 vendors · 100% on-time delivery for 18,500 kits',
  },
  {
    id: 't3',
    quote:
      'For our organic infant romper line, fabric safety and snap-button pull strength are non-negotiable. Plum & Thread delivered OEKO-TEX certified 180 GSM interlock samples in six days and maintained zero metal-detection rejections across four consecutive export shipments.',
    name: 'Arjun Subramanian',
    role: 'Co-Founder',
    company: 'Little Banyan Organics',
    location: 'Chennai, Tamil Nadu',
    outcome: '0 QC rejections across 4 consecutive export shipments',
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-gst',
    question: 'How are GST rates applied across your apparel and cap categories?',
    answer:
      'Our quotation calculator applies exact statutory HSN GST slabs per item: 5% GST on Round-neck T-shirts, Polo T-shirts, Hoodies, Track pants, Kids rompers, and Shorts; 12% GST on structured Logo caps; and 18% GST on heavy Padded jackets. Each line item calculates its own GST before summing into the final grand total.',
  },
  {
    id: 'faq-moq',
    question: 'What is the minimum order quantity (MOQ) per style and color?',
    answer:
      'While the quotation calculator lets you test pricing starting from a single unit for cost benchmarking, standard commercial production begins at 100 pieces per style (split across up to 5 sizes). For padded jackets and custom Pantone-dyed fabrics, the standard MOQ is 150 pieces per colorway.',
  },
  {
    id: 'faq-customization',
    question: 'Are screen printing, embroidery, and private-label neck tags included?',
    answer:
      'Base unit prices cover blank garment manufacturing in standard solid shades. Custom screen printing, DTF transfers, high-density embroidery, woven neck labels, and custom polybags are quoted transparently based on stitch count or print dimensions once you share your artwork.',
  },
  {
    id: 'faq-leadtime',
    question: 'What are the typical sampling and bulk production lead times?',
    answer:
      'Fit and fabric samples ship within 7 working days from tech-pack sign-off. Bulk production takes 18 to 22 working days depending on order volume and embellishment complexity, followed by road freight across India or air/sea export from Tuticorin, Chennai, or Coimbatore.',
  },
  {
    id: 'faq-quality',
    question: 'How do you guarantee fabric GSM accuracy and shrinkage control?',
    answer:
      'Every fabric roll is GSM-checked at receipt, compacted after bio-wash dyeing to hold post-wash shrinkage below 2%, and audited at inline and final stages against AQL 2.5 inspection tolerances.',
  },
];

export const FACILITY_MEDIA = {
  heroFactory: '/src/assets/images/hero_tiruppur_factory_1795352267269.jpg',
  knitwearCollection: '/src/assets/images/apparel_knitwear_collection_1795352267944.jpg',
  outerwearWorkwear: '/src/assets/images/apparel_outerwear_workwear_1795352265006.jpg',
  craftInspection: '/src/assets/images/apparel_craft_inspection_1795352267247.jpg',
};
