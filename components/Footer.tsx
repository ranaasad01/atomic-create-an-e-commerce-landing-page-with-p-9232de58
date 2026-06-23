"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, ArrowRight } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useState } from "react";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "#products" },
    { label: "Bestsellers", href: "#products" },
    { label: "Collections", href: "#collections" },
    { label: "Sale", href: "#products" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#about" },
    { label: "Press", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  Support: [
    { label: "FAQ", href: "#contact" },
    { label: "Shipping Policy", href: "#contact" },
    { label: "Returns", href: "#contact" },
    { label: "Track Order", href: "#contact" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function getLinkHref(href: string) {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  }

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center md:text-left">
              <h3 className="font-playfair text-2xl font-bold text-white mb-1">
                Stay in the loop
              </h3>
              <p className="text-slate-400 text-sm">
                New arrivals, exclusive offers, and curated picks — delivered weekly.
              </p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto gap-2"
            >
              {subscribed ? (
                <p className="text-indigo-400 font-medium text-sm py-3 px-4">
                  Thanks for subscribing!
                </p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight size={15} />
                  </button>
                </>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-5 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <span className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              </span>
              <span className="font-playfair text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-200">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              {APP_TAGLINE} We source the finest products from around the world
              so you don't have to.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <motion.div key={heading} variants={fadeInUp}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500"
        >
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookie Settings</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}