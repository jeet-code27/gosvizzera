"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ThemeToggle";

interface ServiceItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
}

const servicesList: ServiceItem[] = [
  {
    title: "Insurance Verification",
    href: "/services/insurance-verification",
    description: "Real-time eligibility & benefits validation to prevent denials.",
  },
  {
    title: "Prior Authorization",
    href: "/services/prior-authorization",
    description: "Fast-track pre-approvals and streamlined payer coordination.",
  },
  {
    title: "Medical Coding",
    href: "/services/medical-coding",
    description: "Certified ICD-10, CPT & HCPCS compliant medical coding.",
  },
  {
    title: "Revenue Cycle Management",
    href: "/services/revenue-cycle-management",
    description: "End-to-end RCM optimization for maximized collections.",
  },
  {
    title: "Claims Management",
    href: "/services/claims-management",
    description: "Clean claim submissions and proactive rejection handling.",
  },
  {
    title: "AR Follow-Up",
    href: "/services/ar-follow-up",
    description: "Accelerate aged accounts receivable recovery and cash flow.",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll detection for shadow adjustment
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // If on admin routes, do not render website navbar (placed after all hooks to follow Rules of Hooks)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 ${
          isScrolled
            ? "shadow-xl shadow-slate-900/10 dark:shadow-black/40 border-slate-300/80 dark:border-slate-700/80"
            : "shadow-lg shadow-slate-900/5 dark:shadow-black/20"
        }`}
      >
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="transition-transform duration-200 group-hover:scale-[1.02] dark:bg-white dark:px-2.5 dark:py-1 dark:rounded-xl inline-flex items-center">
              <Image
                src="/images/gosvizzera-logo.png"
                alt="gosvizzera"
                width={190}
                height={48}
                priority
                className="h-9 sm:h-11 md:h-12 w-auto object-contain block"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isServicesOpen
                    ? "text-brand dark:text-teal-300 bg-slate-50 dark:bg-slate-800/60"
                    : "text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
                aria-expanded={isServicesOpen}
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesOpen ? "rotate-180 text-brand dark:text-teal-300" : "text-slate-400 dark:text-slate-500"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Dropdown Panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px] transition-all duration-200 ease-out origin-top ${
                  isServicesOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-100 dark:border-slate-800 ring-1 ring-slate-900/5 dark:ring-white/10 grid grid-cols-2 gap-2">
                  {servicesList.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="group flex flex-col p-3 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/70 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand dark:group-hover:text-teal-300 transition-colors">
                          {service.title}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-brand dark:group-hover:text-teal-300 group-hover:translate-x-0.5 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      {service.description && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {service.description}
                        </span>
                      )}
                    </Link>
                  ))}

                  <div className="col-span-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>Expert Healthcare & Medical Billing Services</span>
                    <Link
                      href="/#services"
                      onClick={() => setIsServicesOpen(false)}
                      className="text-brand dark:text-teal-300 font-semibold hover:underline flex items-center gap-1"
                    >
                      View All Services &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              About
            </Link>

            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              Blog
            </Link>
          </nav>

          {/* Right Action Section: Phone + ThemeToggle + CTA */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3">
            {/* Contact Phone */}
            <a
              href="tel:+14694035472"
              className="flex items-center gap-2 text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
            >
              <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-brand dark:text-teal-300 flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">Call Us</span>
                <span className="tracking-tight whitespace-nowrap">+1 (469) 403-5472</span>
              </div>
            </a>

            {/* Dark/Light Mode Toggle */}
            <ThemeToggle />

            {/* CTA Button with continuous light sweep shine */}
            <Button
              href="/contact"
              size="sm"
              shimmer={true}
              className="!py-2.5 !px-5 whitespace-nowrap shadow-md shadow-brand/20"
            >
              Book a Strategy Call
            </Button>
          </div>

          {/* Mobile Actions: ThemeToggle + Hamburger Button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <ThemeToggle />
            <a
              href="tel:+14694035472"
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-brand sm:hidden"
              aria-label="Call Us"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isMobileMenuOpen) {
                  setIsMobileServicesOpen(false);
                }
              }}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-brand hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 px-4 py-4 space-y-3 bg-white dark:bg-slate-900 rounded-b-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <Link
              href="/"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsMobileServicesOpen(false);
              }}
              className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-100 hover:text-brand dark:hover:text-teal-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-100 hover:text-brand dark:hover:text-teal-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180 text-brand dark:text-teal-300" : "text-slate-400 dark:text-slate-500"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobileServicesOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1.5 bg-slate-50/70 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-700/80">
                  {servicesList.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                      className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand dark:hover:text-teal-300 hover:bg-white dark:hover:bg-slate-700/80 rounded-lg transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-100 hover:text-brand dark:hover:text-teal-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
            >
              About
            </Link>

            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-100 hover:text-brand dark:hover:text-teal-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
            >
              Blog
            </Link>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <a
                href="tel:+14694035472"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-brand rounded-lg bg-slate-50 dark:bg-slate-800"
              >
                <span className="w-8 h-8 rounded-full bg-brand/10 dark:bg-teal-400/10 text-brand dark:text-teal-300 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Call Directly</span>
                  <span>+1 (469) 403-5472</span>
                </div>
              </a>

              <Button
                href="/contact"
                shimmer={true}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full !py-3"
              >
                Book a Strategy Call
              </Button>

              {/* Social Media Links */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <a
                  href="https://www.linkedin.com/company/svizzera-healthcare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-teal-300 flex items-center justify-center transition-colors"
                  aria-label="Svizzera on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/people/Svizzera-Healthcare/61593771781722/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-teal-300 flex items-center justify-center transition-colors"
                  aria-label="Svizzera on Facebook"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/svizzerahealthcare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand dark:hover:text-teal-300 flex items-center justify-center transition-colors"
                  aria-label="Svizzera on Instagram"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
