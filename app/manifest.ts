import type { MetadataRoute } from "next";

export default function manifest():MetadataRoute.Manifest{
  return {name:"ScholarMatch AI",short_name:"ScholarMatch",description:"International scholarship discovery and application tracking.",start_url:"/",display:"standalone",background_color:"#f8fbfb",theme_color:"#0d9488",icons:[{src:"/favicon.svg",sizes:"any",type:"image/svg+xml"}]};
}
