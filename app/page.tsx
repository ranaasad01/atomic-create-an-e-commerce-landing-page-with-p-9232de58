"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, ChevronRight, Sparkles } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  PRIMARY_CTA,
  CATEGORIES,
  type Category,
  type Product,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aura Linen Throw",
    category: "Home & Living",
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviewCount: 214,
    image: "https://www.aurahome.com.au/media/catalog/product/cache/07ee578082c3c1d9ce790070731bd076/a/r/arles_throw_shell.jpg",
    badge: "bestseller",
    description:
      "Woven from 100% European linen, this throw adds warmth and texture to any living space.",
    featured: true,
  },
  {
    id: "p2",
    name: "Obsidian Ceramic Mug",
    category: "Home & Living",
    price: 38,
    rating: 4.8,
    reviewCount: 97,
    image: "https://cdnimg.webstaurantstore.com/images/products/large/395351/1459441.jpg",
    badge: "new",
    description:
      "Hand-thrown stoneware with a matte obsidian glaze. Holds 12 oz and feels perfect in the hand.",
    featured: true,
  },
  {
    id: "p3",
    name: "Soleil Leather Tote",
    category: "Accessories",
    price: 195,
    originalPrice: 240,
    rating: 4.7,
    reviewCount: 163,
    image: "https://images.bloomingdalesassets.com/is/image/BLM/products/3/optimized/16130183_fpx.tif",
    badge: "sale",
    description:
      "Full-grain vegetable-tanned leather that develops a rich patina over time.",
    featured: true,
  },
  {
    id: "p4",
    name: "Hinoki Bath Salts",
    category: "Wellness",
    price: 42,
    rating: 4.9,
    reviewCount: 88,
    image: "http://www.amayori.com/cdn/shop/products/Hinoki-Onsen-SHizumi-Luxury-Bath-Salts_-Amayori_1024x.jpg?v=1591029927",
    badge: "new",
    description:
      "Mineral-rich Himalayan salts infused with Japanese hinoki cypress essential oil.",
    featured: false,
  },
  {
    id: "p5",
    name: "Slate Wireless Charger",
    category: "Tech",
    price: 65,
    rating: 4.6,
    reviewCount: 312,
    image: "https://thesweetsetup.com/wp-content/uploads/2019/09/3B67A557-EB04-45E8-B544-DB76A67FB055.jpeg",
    badge: undefined,
    description:
      "15W fast-charge pad in brushed slate aluminum. Works with all Qi-enabled devices.",
    featured: false,
  },
  {
    id: "p6",
    name: "Merino Ribbed Beanie",
    category: "Apparel",
    price: 55,
    rating: 4.8,
    reviewCount: 74,
    image: "https://www.smartwool.com/cdn/shop/files/SW002990Q02-HERO.jpg?v=1774263486&width=1600",
    badge: "limited",
    description:
      "Extra-fine 18.5-micron merino wool. Naturally temperature-regulating and itch-free.",
    featured: false,
  },
  {
    id: "p7",
    name: "Pebble Diffuser",
    category: "Wellness",
    price: 78,
    originalPrice: 95,
    rating: 4.7,
    reviewCount: 141,
    image: "https://m.media-amazon.com/images/I/41YpzZxLUbL.jpg",
    badge: "sale",
    description:
      "Ultrasonic ceramic diffuser with a 400ml reservoir and soft ambient glow.",
    featured: false,
  },
  {
    id: "p8",
    name: "Brass Bookmark Set",
    category: "Accessories",
    price: 28,
    rating: 4.9,
    reviewCount: 56,
    image: "https://cinereplicas.com/cdn/shop/files/GOT-MetalBookmark-Lifestyle_3-4895205611412_jpg_jpg.jpg?v=1689674387",
    badge: "new",
    description:
      "Set of three solid brass bookmarks with geometric cutouts. A gift for the reader in your life.",
    featured: false,
  },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Margot L.",
    location: "Paris, France",
    avatar: "https://m.media-amazon.com/images/I/912lIKSQigL._AC_UF1000,1000_QL80_.jpg",
    rating: 5,
    text: "The linen throw arrived beautifully packaged. The quality is extraordinary — it feels like something you'd find in a boutique hotel. I've already ordered two more as gifts.",
    product: "Aura Linen Throw",
  },
  {
    id: "t2",
    name: "James K.",
    location: "New York, USA",
    avatar: "https://www.cultclassicmag.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fcultclassic%2FZtsdkxoQrfVKlzDS_0025_22.jpg%3Fauto%3Dformat%2Ccompress&w=3840&q=75",
    rating: 5,
    text: "Lumière has completely changed how I shop. Every piece is thoughtfully chosen and the packaging alone makes it feel like a luxury experience. The leather tote is stunning.",
    product: "Soleil Leather Tote",
  },
  {
    id: "t3",
    name: "Yuki T.",
    location: "Tokyo, Japan",
    avatar: "https://static.wikia.nocookie.net/f1wikia/images/c/c5/Redbull_YukiTsunoda.png/revision/latest?cb=20250726232110",
    rating: 5,
    text: "I appreciate that every product has a story. The hinoki bath salts have become part of my evening ritual. Shipping was fast and the scent is exactly as described.",
    product: "Hinoki Bath Salts",
  },
];

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description: "Complimentary shipping on all orders over $75. Delivered in 3 to 5 business days.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description: "Not in love with your purchase? Return it within 30 days, no questions asked.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "Every product is verified for quality and sourced directly from artisan makers.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "We partner only with makers who share our commitment to fair wages and sustainability.",
  },
];

const COLLECTIONS = [
  {
    id: "c1",
    title: "The Morning Ritual",
    subtitle: "Start with intention",
    count: 12,
    image: "https://www.happi.com/wp-content/uploads/2024/04/710_main-28.jpg",
    accent: "bg-amber-50",
  },
  {
    id: "c2",
    title: "Quiet Luxury",
    subtitle: "Understated, always",
    count: 18,
    image: "https://cdn.sanity.io/images/ruord509/production/a270bb6acf40cc4b121fd220b4274aa798ce2660-800x800.jpg?w=3840&q=75&fit=clip&auto=format",
    accent: "bg-slate-50",
  },
  {
    id: "c3",
    title: "The Wanderer",
    subtitle: "Travel essentials",
    count: 9,
    image: "https://hespokestyle.com/wp-content/uploads/2023/10/quiet-luxury-for-men-guide.jpg",
    accent: "bg-indigo-50",
  },
];

// ─── Badge component ──────────────────────────────────────────────────────────

const badgeStyles: Record<string, string> = {
  sale: "bg-rose-100 text-rose-700",
  new: "bg-emerald-100 text-emerald-700",
  bestseller: "bg-amber-100 text-amber-700",
  limited: "bg-indigo-100 text-indigo-700",
};

const badgeLabels: Record<string, string> = {
  sale: "Sale",
  new: "New",
  bestseller: "Bestseller",
  limited: "Limited",
};

function Badge({ type }: { type: string }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${badgeStyles[type] ?? "bg-slate-100 text-slate-600"}`}
    >
      {badgeLabels[type] ?? type}
    </span>
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={
              i <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

// ─── Product card ─────────────────────────────────────────────────────────────

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -6, boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 20px 40px -12px rgba(0,0,0,0.16)" },
};

const imageZoom: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
};

function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.article
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      <motion.div variants={cardHover} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
          <motion.img
            variants={imageZoom}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Wishlist */}
          <button
            onClick={() => setWishlisted((w) => !w)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5 transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Heart
              size={15}
              className={
                wishlisted
                  ? "fill-rose-500 text-rose-500"
                  : "text-slate-400"
              }
            />
          </button>
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge type={product.badge} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-indigo-600 font-medium mb-0.5">{product.category}</p>
              <h3 className="font-semibold text-slate-900 text-sm leading-snug">{product.name}</h3>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{product.description}</p>

          <StarRating rating={product.rating} count={product.reviewCount} />

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900">
                ${(product.price ?? 0).toFixed(0)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.93 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <ShoppingBag size={13} />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 pt-20">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50/60 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide">
                  <Sparkles size={12} />
                  New arrivals for the season
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.08] tracking-tight text-balance"
              >
                Objects worth
                <br />
                <span className="text-indigo-600">Curated for the discerning eye. Lumière brings together the world's finest artisan goods — each piece chosen for its craft and its story</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-600 leading-relaxed max-w-md text-pretty"
              >
                {APP_TAGLINE} Lumière brings together the world's finest artisan goods — each piece chosen for its craft, its story, and its lasting beauty.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <motion.a
                  href={PRIMARY_CTA.href}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {PRIMARY_CTA.label}
                  <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="#collections"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-black/8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  View Collections
                </motion.a>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center gap-5 pt-2"
              >
                {["Free shipping over $75", "30-day returns", "Ethically sourced"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Check size={14} className="text-indigo-500" />
                      {item}
                    </span>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Right: featured product mosaic */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative grid grid-cols-2 gap-4"
            >
              {featuredProducts.slice(0, 3).map((product, i) => (
                <motion.div
                  key={product.id}
                  variants={scaleIn}
                  className={`relative overflow-hidden rounded-2xl bg-slate-100 border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                    i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-semibold text-sm drop-shadow">{product.name}</p>
                    <p className="text-white/80 text-xs">${(product.price ?? 0).toFixed(0)}</p>
                  </div>
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge type={product.badge} />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Value props ───────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {VALUE_PROPS.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  className="flex flex-col items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Icon size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{vp.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{vp.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Collections ───────────────────────────────────────────────────── */}
      <section id="collections" className="bg-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 font-semibold text-sm tracking-wide uppercase mb-2">
              Curated Collections
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-balance"
            >
              Shop by mood.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {COLLECTIONS.map((col, i) => (
              <motion.a
                key={col.id}
                href="#products"
                variants={i === 1 ? scaleIn : i === 0 ? slideInLeft : slideInRight}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-2xl border border-black/5 cursor-pointer block ${
                  i === 1 ? "md:mt-8" : ""
                }`}
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 12px 32px -8px rgba(0,0,0,0.10)" }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white/70 text-xs font-medium mb-1">{col.subtitle}</p>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-2">{col.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-white/90 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                    {col.count} pieces
                    <ChevronRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Products grid ─────────────────────────────────────────────────── */}
      <section id="products" className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
          >
            <div>
              <motion.p variants={fadeInUp} className="text-indigo-600 font-semibold text-sm tracking-wide uppercase mb-2">
                The Edit
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
              >
                Handpicked for you.
              </motion.h2>
            </div>
            <motion.p variants={fadeIn} className="text-slate-500 text-sm max-w-xs text-right hidden sm:block">
              Every item is selected by our team of curators for quality, craft, and character.
            </motion.p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.30)]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(filteredProducts ?? []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* Load more */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600"
            >
              View All Products
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand story ───────────────────────────────────────────── */}
      <section id="about" className="bg-slate-900 py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                <img
                  src="https://artisansaloeuvre.com/wp-content/uploads/2022/01/mf-9004-1024x734.jpg"
                  alt="Artisan at work in their studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.16)] border border-black/5"
              >
                <p className="font-playfair text-3xl font-bold text-slate-900">200+</p>
                <p className="text-sm text-slate-500 mt-0.5">Artisan partners worldwide</p>
              </motion.div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p variants={fadeInUp} className="text-indigo-400 font-semibold text-sm tracking-wide uppercase">
                Our Story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight text-balance"
              >
                Made by hands. Chosen with care.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed text-pretty">
                Lumière was founded on a simple belief: that the objects we surround ourselves with should be beautiful, honest, and built to last. We travel the world to find makers who share that conviction — potters in Kyoto, weavers in Oaxaca, leatherworkers in Florence.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-slate-400 leading-relaxed text-pretty">
                Every product in our edit has been held, tested, and lived with before it earns a place on our shelves. We believe in fewer, better things.
              </motion.p>

              <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10">
                {[
                  { value: "2018", label: "Founded" },
                  { value: "200+", label: "Makers" },
                  { value: "40k+", label: "Happy customers" },
                ].map((stat) => (
                  <motion.div key={stat.label} variants={fadeInUp}>
                    <p className="font-playfair text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a
                variants={fadeInUp}
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 self-start px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Shop the Edit
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeInUp} className="text-indigo-600 font-semibold text-sm tracking-wide uppercase mb-2">
              Customer Stories
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 tracking-tight"
            >
              Loved by thousands.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                className={`bg-white rounded-2xl p-7 border border-black/5 flex flex-col gap-4 ${
                  i === 1 ? "md:mt-6" : ""
                }`}
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover border border-black/5"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.location}</p>
                  </div>
                  <span className="ml-auto text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
                    {t.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-indigo-600 py-20 md:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/40 blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-700/50 blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={scaleIn}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold tracking-wide">
                <Sparkles size={12} />
                New arrivals every week
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight text-balance"
            >
              Find your next favorite thing.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-indigo-100 text-lg leading-relaxed max-w-lg text-pretty">
              Join over 40,000 customers who trust Lumière to bring beauty and craft into their everyday lives.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.20)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Shop the Edit
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent border-2 border-white/40 hover:border-white/70 text-white font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Browse Collections
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}