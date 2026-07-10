// ============================================================
// Calm Borg — Company Data & Configuration
// ============================================================

export const company = {
  name: "Calm Borg",
  tagline: "Precision Tooling Solutions for Modern Manufacturing",
  shortTagline: "Your Partner for\nCNC Productivity",
  gst: "XXXXX",
  address: "302, Bhumika Paradise, 3rd A main Road, Brindavan Layout, Padmanabhanagar, Bengaluru-560061, Karnataka, India",
  phone: "+91-XXXXX XXXXX",
  email: "Sales@Calmborg.co.in",
  whatsapp: "+91-XXXXX XXXXX",
  yearsExperience: 30,
  website: "www.calmborg.co.in",
  authorizedBrands: ["Union Tools Japan"],
};

export const founder = {
  name: "Founder",
  title: "Founder & Managing Director",
  bio: "With over 30 years of experience in the machine tool and manufacturing industry, our founder has built Calm Borg on a foundation of technical expertise, customer-first philosophy, and an unwavering commitment to quality.",
};

export const companyProfile = {
  description: `Calm Borg is a leading supplier of cutting tools, tool holding systems, inserts, and machining accessories for CNC machining centers, VMCs, HMCs, turning centers, and advanced manufacturing facilities.

Founded by professionals with extensive experience in the machine tool and manufacturing industry, we are committed to helping customers improve productivity, reduce machining costs, and achieve superior component quality through optimized tooling solutions.

Our product portfolio includes solid carbide cutting tools, indexable milling systems, turning tools, precision tool holders, collets, inserts, and workshop accessories sourced from reputed global and domestic manufacturers.

Beyond product supply, we provide comprehensive application support, tooling recommendations, cycle time optimization, and process improvement solutions.

With a strong focus on quality, technical expertise, and customer satisfaction, Calm Borg aims to be the preferred partner for manufacturers seeking reliable, cost-effective, and innovative machining solutions.`,
  mission: "To deliver world-class cutting tool solutions and technical expertise that enable manufacturers to achieve higher productivity, better quality, and reduced manufacturing costs.",
  vision: "To become India's most trusted tooling solutions provider by combining technical excellence, innovative products, and exceptional customer service.",
  values: [
    "Customer Success First",
    "Technical Excellence",
    "Continuous Improvement",
    "Integrity and Transparency",
    "Commitment to Quality",
    "Long-Term Partnerships",
  ],
};

export const whyChooseUs = [
  { icon: "CheckCircle", title: "Wide Range of CNC Cutting Tools", description: "Comprehensive inventory covering all CNC machining applications" },
  { icon: "Headphones", title: "Technical Application Support", description: "Expert guidance from selection to optimization" },
  { icon: "IndianRupee", title: "Competitive Pricing", description: "Best-in-class value without compromising quality" },
  { icon: "Truck", title: "Quick Delivery", description: "Swift logistics to keep your production running" },
  { icon: "Shield", title: "Genuine Products", description: "100% authentic tooling sourced from reputed global and domestic manufacturers" },
  { icon: "Users", title: "Expert Tool Selection", description: "30 years of experience in your corner" },
  { icon: "HeartHandshake", title: "Reliable After-Sales", description: "We stand behind every product we sell" },
];

export const stats = [
  { value: "30+", label: "Years Experience", description: "Industry expertise" },
  { value: "500+", label: "Products", description: "In our catalog" },
  { value: "200+", label: "Clients Served", description: "Across India" },
  { value: "15+", label: "Industries", description: "We serve" },
];

// ============================================================
// Product Categories
// ============================================================

export interface ProductCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  products: string[];
  applications?: string[];
  benefits?: string[];
  materials?: string[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "solid-carbide",
    title: "Solid Carbide Cutting Tools",
    subtitle: "High-performance tools for precision machining",
    description: "High-performance tools engineered for precision machining applications.",
    products: ["End Mills", "Ball Nose End Mills", "Corner Radius End Mills", "Drill Bits", "Reamers", "Taps", "Thread Mills"],
    applications: ["Steel", "Stainless Steel", "Cast Iron", "Aluminum", "Titanium", "Hardened Materials"],
  },
  {
    id: "indexable-milling",
    title: "Indexable Milling Tools",
    subtitle: "Maximum productivity for heavy-duty machining",
    description: "Maximum productivity for heavy-duty machining operations.",
    products: ["Face Mills", "Shoulder Mills", "High Feed Cutters", "Copy Mills", "Milling Inserts"],
    benefits: ["Reduced machining cost", "Faster metal removal", "Improved surface finish"],
  },
  {
    id: "turning",
    title: "Turning Tools",
    subtitle: "Precision solutions for CNC turning centers",
    description: "Precision solutions for CNC turning centers.",
    products: ["External Turning Holders", "Internal Boring Bars", "Grooving Tools", "Threading Tools", "Parting-Off Tools", "Turning Inserts"],
    applications: ["Roughing", "Finishing", "Profiling", "Threading"],
  },
  {
    id: "tool-holding",
    title: "Tool Holding Systems",
    subtitle: "Reliable and accurate tool clamping solutions",
    description: "Reliable and accurate tool clamping solutions.",
    products: ["BT Tool Holders", "CAT Tool Holders", "HSK Holders", "ER Collet Chucks", "Hydraulic Chucks", "Shrink Fit Holders"],
    benefits: ["Improved runout accuracy", "Better surface finish", "Increased tool life"],
  },
  {
    id: "cnc-accessories",
    title: "CNC Accessories",
    subtitle: "Everything needed for efficient machining",
    description: "Complete range of accessories for efficient machining operations.",
    products: ["Collets", "Pull Studs", "Tool Presetters", "Tool Storage Systems", "Measuring Equipment", "Setup Accessories"],
  },
  {
    id: "cutting-inserts",
    title: "Cutting Inserts",
    subtitle: "Premium carbide grades for superior performance",
    description: "Premium carbide grades engineered for superior machining performance.",
    products: ["Turning Inserts", "Milling Inserts", "Drilling Inserts", "Grooving Inserts", "Threading Inserts"],
    materials: ["Carbide", "Cermet", "Ceramic", "CBN", "PCD"],
  },
];

// ============================================================
// Industries
// ============================================================

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
  applications: string[];
}

export const industries: Industry[] = [
  { id: "automotive", title: "Automotive", description: "Precision components for engine blocks, transmission parts, brake systems, and chassis components.", icon: "Car", applications: ["Engine Blocks", "Transmission Gears", "Brake Discs", "Suspension Components", "Fuel Injection Parts"] },
  { id: "aerospace", title: "Aerospace", description: "Mission-critical components machined from titanium, Inconel, and advanced alloys.", icon: "Plane", applications: ["Turbine Blades", "Landing Gear", "Structural Components", "Fasteners", "Avionics Housings"] },
  { id: "die-mold", title: "Die & Mold", description: "Complex 3D contours, hardened steel cavities, and micro-finish surfaces.", icon: "Box", applications: ["Injection Molds", "Die Casting Dies", "Stamping Dies", "Blow Molds", "Thermoforming Tools"] },
  { id: "medical", title: "Medical Components", description: "Biocompatible materials like titanium, PEEK, and cobalt-chrome.", icon: "HeartPulse", applications: ["Orthopedic Implants", "Surgical Instruments", "Dental Components", "Prosthetics", "Medical Device Housings"] },
  { id: "energy", title: "Energy & Power", description: "Heavy-duty machining for power generation, oil & gas, and renewable energy.", icon: "Zap", applications: ["Turbine Shafts", "Valve Bodies", "Drill Bits", "Pipeline Components", "Generator Rotors"] },
  { id: "precision", title: "Precision Engineering", description: "Micron-level accuracy for instrumentation and optical components.", icon: "Target", applications: ["Gauge Components", "Optical Parts", "Watch Mechanisms", "Sensor Housings", "Encoder Parts"] },
  { id: "electronics", title: "Electronics Manufacturing", description: "Miniature components for semiconductor equipment and connectors.", icon: "Cpu", applications: ["Heat Sinks", "Connectors", "PCB Drills", "Enclosures", "Semiconductor Tooling"] },
  { id: "general", title: "General Engineering", description: "Versatile tooling for job shops and contract manufacturers.", icon: "Wrench", applications: ["Shafts & Bushings", "Flanges & Fittings", "Custom Parts", "Prototype Work", "Repair & Maintenance"] },
];

// ============================================================
// Navigation
// ============================================================

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

// ============================================================
// Technical Resources
// ============================================================

export const resources = [
  { id: "tool-selection", title: "Tool Selection Guide", description: "Comprehensive guide to selecting the right cutting tool for your material and application.", type: "Guide", icon: "BookOpen" },
  { id: "speed-feed", title: "Speed & Feed Calculator", description: "Calculate optimal cutting parameters for your machining operations.", type: "Calculator", icon: "Calculator" },
  { id: "material-guide", title: "Material Machining Guide", description: "Recommended tooling strategies for various engineering materials.", type: "Reference", icon: "FileText" },
  { id: "catalogue", title: "Product Catalogue", description: "Download our complete product catalogue with specifications and pricing.", type: "Download", icon: "Download" },
  { id: "tool-holder-guide", title: "Tool Holder Compatibility", description: "Complete reference for tool holder interfaces, tapers, and machine compatibility.", type: "Reference", icon: "Library" },
  { id: "insert-grade", title: "Insert Grade Selection", description: "Match the right insert grade to your material, operation, and machine conditions.", type: "Guide", icon: "Layers" },
];
