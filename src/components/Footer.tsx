"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const services = [
    { name: "Insurance Verification", href: "/services/insurance-verification" },
    { name: "Prior Authorization", href: "/services/prior-authorization" },
    { name: "Medical Coding (CPT / ICD-10)", href: "/services/medical-coding" },
    { name: "Revenue Cycle Management", href: "/services/revenue-cycle-management" },
    { name: "Claims Management & Scrubbing", href: "/services/claims-management" },
    { name: "Aged AR Follow-Up & Recovery", href: "/services/ar-follow-up" },
  ];

  const specialties = [
    { name: "Cardiology", href: "#specialties" },
    { name: "Primary Care & Internal Med", href: "#specialties" },
    { name: "Oncology Infusion", href: "#specialties" },
    { name: "Wound Care & Debridement", href: "#specialties" },
    { name: "Gastroenterology (GI)", href: "#specialties" },
    { name: "Behavioral & Mental Health", href: "#specialties" },
    { name: "Urgent Care & Multi-Specialty", href: "#specialties" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/svizzera-healthcare/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/people/Svizzera-Healthcare/61593771781722/",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/svizzerahealthcare",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative bg-slate-900 dark:bg-black text-slate-300 overflow-hidden border-t border-slate-800 transition-colors duration-300">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[700px] h-[300px] bg-brand/20 dark:bg-teal-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[300px] bg-teal-600/10 dark:bg-teal-900/10 blur-3xl rounded-full" />
      </div>

      {/* Top Pre-Footer Banner / Fast Action Strip */}
      <div className="relative z-10 border-b border-slate-800/80 bg-slate-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Ready to optimize your practice reimbursements?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans font-light">
                Speak directly with an RCM specialist today. Response within 1 business hour.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="tel:+14694035472"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-all shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Call +1 (469) 403-5472</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 hover:shadow-teal-500/30 transition-all group"
              >
                <span>Book Strategy Call</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand, Address & Social Media */}
          <div className="lg:col-span-4 space-y-6">
            {/* Prominent Large Logo with Clean Container */}
            <Link href="/" className="inline-block p-3 sm:p-3.5 rounded-2xl bg-white shadow-lg border border-white/40 hover:scale-102 transition-transform">
              <Image
                src="/images/gosvizzera-logo.png"
                alt="Svizzera Healthcare Solutions"
                width={220}
                height={55}
                priority
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-sm">
              <strong className="text-slate-200 font-medium">Svizzera Healthcare Solutions</strong> empowers physician practices, specialty clinics, and healthcare organizations across the United States with precision prior authorization, certified medical coding, and end-to-end RCM excellence.
            </p>

            {/* Direct Contact Details with Animated Icons */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm text-slate-300 font-sans">
              <a
                href="tel:+14694035472"
                className="flex items-center gap-3 group hover:text-teal-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Phone</span>
                  <span className="font-semibold text-white group-hover:text-teal-300">+1 (469) 403-5472</span>
                </div>
              </a>

              <a
                href="mailto:info@gosvizzera.com"
                className="flex items-center gap-3 group hover:text-teal-300 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Email</span>
                  <span className="font-semibold text-white group-hover:text-teal-300">info@gosvizzera.com</span>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Location</span>
                  <span className="font-semibold text-white">Tallahassee, FL</span>
                </div>
              </div>
            </div>

            {/* Animated Social Media Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans block mb-2.5">
                Connect With Us:
              </span>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-teal-500 text-slate-300 hover:text-slate-950 border border-slate-700 hover:border-teal-400 flex items-center justify-center transition-colors shadow-sm"
                    aria-label={`Follow Svizzera on ${social.name}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-teal-300 font-mono">
              Core RCM Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Specialties */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-teal-300 font-mono">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              {specialties.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Compliance Digest */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-teal-300 font-mono">
              Practice Intelligence
            </h4>
            <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">
              Subscribe for quarterly healthcare billing updates, payer policy changes, and RCM best practices.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-300 text-xs font-medium flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Thank you! You are subscribed to RCM updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all cursor-pointer"
                  >
                    Join
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 block">
                  Strictly no spam. Unsubscribe anytime.
                </span>
              </form>
            )}

            {/* Compliance Badges with SVG Icons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-[11px] font-semibold text-slate-300">
                <svg className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>HIPAA Compliant</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-[11px] font-semibold text-slate-300">
                <svg className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>SOC 2 Ready</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700 text-[11px] font-semibold text-slate-300">
                <svg className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>BAA Protected</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-slate-400 font-sans">
            <div>
              © {new Date().getFullYear()} Svizzera Healthcare Solutions. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400">
              <Link href="/privacy" className="hover:text-teal-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-teal-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/hipaa" className="hover:text-teal-300 transition-colors">
                HIPAA Statement
              </Link>
              <Link href="/security" className="hover:text-teal-300 transition-colors">
                Security & BAA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
