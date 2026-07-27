/* eslint-disable @next/next/no-html-link-for-pages */
import { GraduationCap } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="/" className={`flex items-center gap-2.5 font-extrabold tracking-tight ${light ? "text-white" : "text-slate-950"}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-teal-600 text-white shadow-sm">
        <GraduationCap size={20} strokeWidth={2.4} />
      </span>
      <span className="text-lg">ScholarMatch <span className="text-teal-600">AI</span></span>
    </a>
  );
}
