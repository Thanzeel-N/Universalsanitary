"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

import { usePathname } from "next/navigation";

export default function Header({ isHomePage = true }: { isHomePage?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/products" },
    { name: "Clients", href: "/clients" },
    { name: "About", href: "/about" },
  ];

  const headerClass = isHomePage && !isScrolled
    ? "bg-transparent py-6 text-white"
    : "bg-transparent backdrop-blur-md py-4 text-primary";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${headerClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/images/logo/logo.webp" alt="Universal" className="h-6 md:h-8 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center uppercase tracking-widest text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`hover:text-secondary smooth-hover transition-colors ${isActive ? 'underline underline-offset-[6px] decoration-2 font-bold' : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="https://wa.me/919847037275?text=Hello,%20I%20would%20like%20to%20enquire%20about%20your%20premium%20sanitary%20collections."
            target="_blank"
            rel="noopener noreferrer"
            className="border border-current px-6 py-2 hover:bg-white hover:text-black smooth-hover"
          >
            Enquire
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-[100dvh] bg-transparent backdrop-blur-xl border-l border-white/10 text-white z-50 flex flex-col p-8 shadow-2xl"
            >
              <button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)}>
                <X size={32} />
              </button>

              <div className="mt-16 flex flex-col gap-8 items-start text-2xl font-playfair tracking-wider uppercase">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`transition-colors hover:text-white/80 ${isActive ? 'underline underline-offset-[8px] decoration-2 font-bold' : ''}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <a
                  href="https://wa.me/919847037275?text=Hello,%20I%20would%20like%20to%20enquire%20about%20your%20premium%20sanitary%20collections."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border border-current px-8 py-3 mt-4 text-lg hover:bg-white hover:text-black smooth-hover w-full text-center"
                >
                  Enquire
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
