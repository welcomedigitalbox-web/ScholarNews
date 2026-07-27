import { NextResponse } from "next/server";
import type { Scholarship } from "@/lib/types";

type ApiHit = Record<string, unknown>;
const text=(value:unknown,fallback="")=>typeof value==="string"?value:fallback;
const list=(value:unknown,fallback:string[]=[])=>
  Array.isArray(value)?value.filter((item):item is string=>typeof item==="string"):fallback;
const slug=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80);

export async function POST(request:Request){
  const apiKey=process.env.SCHOLARSHIP_API_KEY;
  const syncKey=process.env.ADMIN_SYNC_KEY;
  if(!apiKey||!syncKey)return NextResponse.json({error:"API sync is not configured yet. Add SCHOLARSHIP_API_KEY and ADMIN_SYNC_KEY to the hosting environment."},{status:503});
  if(request.headers.get("x-admin-sync-key")!==syncKey)return NextResponse.json({error:"Invalid admin sync key."},{status:401});
  const response=await fetch("https://api.scholarshipapi.com/v1/search",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({q:"international",limit:25,status:"open"}),cache:"no-store"});
  if(!response.ok)return NextResponse.json({error:`Scholarship provider returned ${response.status}.`},{status:502});
  const payload=await response.json() as {hits?:ApiHit[]};
  const items:Scholarship[]=(payload.hits||[]).map((hit,index)=>{
    const name=text(hit.name,"Imported scholarship");
    const rawDate=typeof hit.closeDate==="number"?new Date(hit.closeDate):new Date(text(hit.closeDate));
    const deadline=Number.isNaN(rawDate.getTime())?"":rawDate.toISOString().slice(0,10);
    const amount=hit.amount==null?"See official source":`${hit.amount} ${text(hit.currency)}`.trim();
    const sourceId=text(hit.id,text(hit.slug,`${slug(name)}-${index}`));
    return {
      id:`api-${slug(sourceId)}`,
      name,
      university:text(hit.university,"University not specified"),
      country:text(hit.country,text(hit.countryCode,"Australia / New Zealand")),
      degreeLevel:list(hit.academicLevels,["See eligibility"])[0]||"See eligibility",
      eligibleNationalities:list(hit.citizenshipRequirements,["See official eligibility"]),
      fieldsOfStudy:list(hit.categories,list(hit.keywords,["All eligible fields"])),
      minimumGpa:Number(hit.minimumGpa||0),
      englishRequirement:text(hit.englishRequirement,"See official requirements"),
      fundingType:text(hit.fundingType,"Scholarship funding"),
      fundingAmount:amount,
      deadline,
      requiredDocuments:list(hit.requiredDocuments,["See official application page"]),
      applicationUrl:text(hit.url,text(hit.applicationUrl,"https://scholarshipapi.com/")),
      published:false,
      source:"api",
      sourceId,
      sourceUrl:"https://scholarshipapi.com/",
      importedAt:new Date().toISOString(),
    };
  });
  return NextResponse.json({items});
}
