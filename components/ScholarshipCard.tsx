"use client";

import { Bookmark, CalendarDays, MapPin } from "lucide-react";
import type { Scholarship } from "@/lib/types";

export function ScholarshipCard({ item, saved, onSave }: { item: Scholarship; saved?: boolean; onSave?: (id: string) => void }) {
  return (
    <article className="card group flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-lg font-extrabold text-teal-700">{item.university.charAt(0)}</div>
        <button onClick={() => onSave?.(item.id)} className={`rounded-xl border p-2.5 transition ${saved ? "border-teal-200 bg-teal-50 text-teal-700" : "border-slate-200 text-slate-400 hover:border-teal-200 hover:text-teal-700"}`} aria-label={saved ? "Remove saved scholarship" : "Save scholarship"}>
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <a href={`/scholarships/${item.id}`} className="mt-5"><h3 className="text-lg font-bold leading-snug text-slate-950 transition group-hover:text-teal-700">{item.name}</h3></a>
      <p className="mt-2 text-sm font-medium text-slate-500">{item.university}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="tag"><MapPin size={13} />{item.country}</span>
        <span className="tag">{item.degreeLevel}</span>
        <span className="tag">{item.fundingType}</span>
      </div>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="font-bold text-teal-700">{item.fundingAmount}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><CalendarDays size={14} />Deadline {new Date(item.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
          <a href={`/scholarships/${item.id}`} className="font-bold text-slate-800">View details →</a>
        </div>
      </div>
    </article>
  );
}
