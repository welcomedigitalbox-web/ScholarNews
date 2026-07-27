import type { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{
  return {
    rules:{userAgent:"*",allow:["/","/scholarships/"],disallow:["/admin","/admin-login","/login","/signup","/profile","/saved","/tracker","/api/"]},
    sitemap:"https://scholarmatch-ai.thukha-edu.chatgpt.site/sitemap.xml",
    host:"https://scholarmatch-ai.thukha-edu.chatgpt.site",
  };
}
