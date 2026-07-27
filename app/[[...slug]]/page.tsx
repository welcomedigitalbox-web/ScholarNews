import type { Metadata } from "next";
import SiteRouter from "@/components/SiteRouter";
import { scholarships } from "@/lib/sample-data";

const siteUrl = "https://scholarmatch-ai.thukha-edu.chatgpt.site";
const privateRoutes = new Set(["login","signup","profile","saved","tracker","admin","admin-login"]);

export async function generateMetadata({params}:{params:Promise<{slug?:string[]}>}):Promise<Metadata>{
  const {slug=[]}=await params;
  const path=slug.join("/");
  const scholarship=slug[0]==="scholarships"&&slug[1]?scholarships.find(item=>item.id===slug[1]):null;
  const noIndex=privateRoutes.has(slug[0]||"");
  if(scholarship){
    const title=`${scholarship.name} | ${scholarship.university}`;
    const description=`Explore eligibility, funding, deadline and application requirements for ${scholarship.name} in ${scholarship.country}.`;
    return {title,description,alternates:{canonical:`${siteUrl}/scholarships/${scholarship.id}`},openGraph:{title,description,type:"article",url:`${siteUrl}/scholarships/${scholarship.id}`,siteName:"ScholarMatch AI"},twitter:{card:"summary_large_image",title,description}};
  }
  const pages:Record<string,[string,string]>={
    "":["ScholarMatch AI – Find Scholarships for International Students","Discover international scholarships matched to your GPA, nationality, study field, preferred country and budget."],
    "scholarships":["International Scholarships Directory | ScholarMatch AI","Search fully funded and partial scholarships from universities around the world."],
    "login":["Student Login | ScholarMatch AI","Log in to manage your scholarship matches and applications."],
    "signup":["Create Your Scholarship Profile | ScholarMatch AI","Create a free profile and start discovering scholarships aligned with your academic goals."],
    "profile":["Student Scholarship Profile | ScholarMatch AI","Update your academic profile and scholarship preferences."],
    "saved":["Saved Scholarships | ScholarMatch AI","Review the scholarships saved to your shortlist."],
    "tracker":["Scholarship Application Tracker | ScholarMatch AI","Track every scholarship application, deadline and status."],
    "admin":["Scholarship Administration | ScholarMatch AI","Secure scholarship management workspace."],
    "admin-login":["Administrator Login | ScholarMatch AI","Secure administrator access."],
  };
  const [title,description]=pages[path]||["ScholarMatch AI","Discover international scholarship opportunities."];
  const canonical=path?`${siteUrl}/${path}`:siteUrl;
  return {title,description,alternates:{canonical},robots:noIndex?{index:false,follow:false}:{index:true,follow:true},openGraph:{title,description,type:"website",url:canonical,siteName:"ScholarMatch AI"},twitter:{card:"summary_large_image",title,description}};
}

export default async function Page({params}:{params:Promise<{slug?:string[]}>}){
  const {slug=[]}=await params;
  const scholarship=slug[0]==="scholarships"&&slug[1]?scholarships.find(item=>item.id===slug[1]):null;
  const jsonLd=scholarship?{
    "@context":"https://schema.org",
    "@type":"EducationalOccupationalProgram",
    name:scholarship.name,
    provider:{"@type":"CollegeOrUniversity",name:scholarship.university},
    educationalProgramMode:"full-time",
    applicationDeadline:scholarship.deadline,
    offers:{"@type":"Offer",description:scholarship.fundingAmount,url:scholarship.applicationUrl},
    occupationalCategory:scholarship.fieldsOfStudy.join(", "),
    areaServed:scholarship.country,
    url:`${siteUrl}/scholarships/${scholarship.id}`,
  }:null;
  return <>{jsonLd&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>}<SiteRouter/></>;
}
