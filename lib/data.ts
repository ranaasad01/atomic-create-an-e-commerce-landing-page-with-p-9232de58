export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "sale" | "new" | "bestseller" | "limited";
  description: string;
  featured?: boolean;
};

export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Curated for the discerning eye.";
export const PRIMARY_CTA = { label: "Shop Now", href: "#products" };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const CATEGORIES = [
  "All",
  "Home & Living",
  "Accessories",
  "Wellness",
  "Tech",
  "Apparel",
] as const;

export type Category = (typeof CATEGORIES)[number];