"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  ["Scholarships", "/scholarships"],
  ["Saved", "/saved"],
  ["Tracker", "/tracker"],
  ["Profile", "/profile"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-teal-700">{label}</a>)}
          <a href="/login" className="text-sm font-semibold text-slate-700">Log in</a>
          <a href="/signup" className="btn-primary py-2.5">Get matched</a>
        </nav>
        <button className="rounded-xl p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="grid border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          {links.map(([label, href]) => <a key={href} href={href} className="py-3 font-semibold text-slate-700">{label}</a>)}
          <a href="/login" className="py-3 font-semibold text-slate-700">Log in</a>
          <a href="/signup" className="btn-primary mt-2 text-center">Get matched</a>
        </nav>
      )}
    </header>
  );
}
