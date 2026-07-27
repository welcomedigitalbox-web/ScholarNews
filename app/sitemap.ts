import type { MetadataRoute } from "next";
import { scholarships } from "@/lib/sample-data";

const base="https://scholarmatch-ai.thukha-edu.chatgpt.site";

export default function sitemap():MetadataRoute.Sitemap{
  const now=new Date();
  return [
    {url:base,lastModified:now,changeFrequency:"weekly",priority:1},
    {url:`${base}/scholarships`,lastModified:now,changeFrequency:"daily",priority:.9},
    ...scholarships.map(item=>({url:`${base}/scholarships/${item.id}`,lastModified:now,changeFrequency:"weekly" as const,priority:.8})),
  ];
}
