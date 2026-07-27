/* eslint-disable @next/next/no-html-link-for-pages */
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div><Logo /><p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">Helping international students find credible scholarship opportunities that fit their goals.</p></div>
        <div><p className="font-bold text-slate-900">Explore</p><div className="mt-4 grid gap-3 text-sm text-slate-500"><a href="/scholarships">Scholarships</a><a href="/profile">Build your profile</a><a href="/tracker">Application tracker</a></div></div>
        <div><p className="font-bold text-slate-900">ScholarMatch</p><div className="mt-4 grid gap-3 text-sm text-slate-500"><a href="#">About</a><a href="#">Privacy</a><a href="/admin">Admin</a></div></div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">© 2026 ScholarMatch AI. Scholarship information should be verified on official websites.</div>
    </footer>
  );
}
