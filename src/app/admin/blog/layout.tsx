"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Loader2,
  Inbox,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminBlogLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // If loading session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
      </div>
    );
  }

  // If not authenticated, prompt to log in or redirect
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4 text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-teal-400" />
        <h2 className="text-xl font-bold font-sans">Authentication Required</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          Please log in with your admin credentials to access the Gosvizzera Blog Management System.
        </p>
        <Link
          href="/admin/login"
          className="px-6 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/blog",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Leads & Inquiries",
      href: "/admin/blog/leads",
      icon: Inbox,
      exact: false,
    },
    {
      title: "All Posts",
      href: "/admin/blog/posts",
      icon: FileText,
      exact: true,
    },
    {
      title: "New Article",
      href: "/admin/blog/posts/create",
      icon: PlusCircle,
      exact: false,
    },
    {
      title: "Categories & Tags",
      href: "/admin/blog/categories",
      icon: FolderTree,
      exact: false,
    },
    {
      title: "Media Library",
      href: "/admin/blog/media",
      icon: ImageIcon,
      exact: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Mobile Topbar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <Link href="/admin/blog" className="flex items-center gap-2">
          <Image
            src="/images/gosvizzera-logo.png"
            alt="gosvizzera"
            width={120}
            height={30}
            className="h-7 w-auto object-contain dark:brightness-0 dark:invert"
          />
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/gosvizzera-logo.png"
                alt="gosvizzera"
                width={140}
                height={35}
                className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-300 text-xs font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Blog Management System</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-brand dark:bg-teal-500 text-white dark:text-slate-950 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: View Site + Theme Toggle + User Info + Logout */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-brand dark:hover:text-teal-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Blog</span>
            </span>
            <span className="text-[10px] text-slate-400">&rarr;</span>
          </Link>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {session?.user?.email || "admin@gosvizzera.com"}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 lg:pl-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
