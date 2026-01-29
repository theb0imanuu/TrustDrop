"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/orders", label: "Orders" },
    { href: "/analytics", label: "Analytics" },
    { href: "/support", label: "Support" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-gradient-trust rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">TD</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">TrustDrop</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Settings Button */}
          <Link
            href="/settings"
            className="px-4 py-2 gradient-trust text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
          >
            Settings
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex items-center gap-2 flex-wrap">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                isActive(link.href)
                  ? "bg-primary text-white"
                  : "bg-white/10 text-foreground hover:bg-white/20"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
