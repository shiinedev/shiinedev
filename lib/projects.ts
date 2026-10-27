import project1 from "@/public/assets/project-1.jpg";
import project2 from "@/public/assets/project-2.jpg";
import project3 from "@/public/assets/project-3.jpg";
import project4 from "@/public/assets/project-4.jpg";
import { StaticImageData } from "next/image";
// import video1 from "@/assets/project-1.mp4.asset.json";
// import video2 from "@/assets/project-2.mp4.asset.json";
// import video3 from "@/assets/project-3.mp4.asset.json";
// import video4 from "@/assets/project-4.mp4.asset.json";


export type Project = {
    slug: string;
    img: StaticImageData;
    video: string | null;
    tag: string;
    title: string;
    year: string;
    role: string;
    client: string;
    summary: string;
    challenge: string;
    approach: string;
    outcome: string;
    results: { value: string; label: string }[];
  };
  
  export const projects: Project[] = [
    {
      slug: "orbit-saas-brand-experience",
      img: project1,
      video: null,
      tag: "Branding",
      title: "Orbit - SaaS Brand Experience",
      year: "2025",
      role: "Product Design, Brand System",
      client: "Orbit Labs",
      summary:
        "A complete brand and product experience overhaul for a fast-growing SaaS platform preparing for its Series A.",
      challenge:
        "Orbit had outgrown its early identity. Marketing, product, and sales each used different visual languages, which made the company feel smaller than it was and slowed every launch.",
      approach:
        "I ran a positioning workshop, rebuilt the type and colour system around a single token set, and shipped a component library that marketing and product both consume.",
      outcome:
        "The new system cut design-to-ship time in half and gave the team a consistent story across every surface, from the pricing page to onboarding.",
      results: [
        { value: "+42%", label: "Trial signups" },
        { value: "2x", label: "Faster launches" },
        { value: "$12M", label: "Series A raised" },
      ],
    },
    {
      slug: "nova-brand-identity",
      img: project2,
      video: null,
      tag: "Food & Beverage",
      title: "Nova™ Brand Identity",
      year: "2024",
      role: "Brand Identity, Packaging",
      client: "Nova Beverages",
      summary:
        "A shelf-first identity for a craft beverage brand entering national retail distribution.",
      challenge:
        "Nova needed to stand out in a crowded chiller aisle while staying credible with independent cafés that carried the original range.",
      approach:
        "I built a bold, high-contrast label system with a flexible colour ladder per flavour, then extended it to social, e-commerce, and in-store display.",
      outcome:
        "Nova launched into 300 stores with a look that reads instantly from three metres away and still feels crafted up close.",
      results: [
        { value: "300+", label: "Retail doors" },
        { value: "+68%", label: "Repeat purchase" },
        { value: "4 wks", label: "Rollout time" },
      ],
    },
    {
      slug: "finova-finance-app",
      img: project3,
      video: null,
      tag: "FinTech / Personal Finance",
      title: "Finova Finance App",
      year: "2024",
      role: "Product Design, Research",
      client: "Finova",
      summary:
        "A personal finance app that turns messy transaction data into decisions people actually make.",
      challenge:
        "Users opened the app, saw a wall of charts, and left. Retention past week two was under 20%.",
      approach:
        "I reframed the home screen around one weekly question, introduced progressive disclosure for detail views, and rebuilt onboarding around a single connected account.",
      outcome:
        "The redesigned experience made the first session useful in under a minute and lifted long-term retention substantially.",
      results: [
        { value: "+55%", label: "Week-4 retention" },
        { value: "-38%", label: "Support tickets" },
        { value: "4.8★", label: "App store rating" },
      ],
    },
    {
      slug: "lunex-website-redesign",
      img: project4,
      video: null,
      tag: "Technology",
      title: "Lunex Website Redesign",
      year: "2023",
      role: "Web Design, Conversion",
      client: "Lunex",
      summary:
        "A conversion-focused marketing site rebuild for an enterprise infrastructure company.",
      challenge:
        "The old site explained the technology but never the value. Enterprise buyers bounced before reaching a demo request.",
      approach:
        "I restructured the narrative around buyer outcomes, wrote a modular page system for each vertical, and rebuilt the demo flow into two short steps.",
      outcome:
        "The new site gave sales a page for every conversation and turned the homepage into the top-performing demo source.",
      results: [
        { value: "+120%", label: "Demo requests" },
        { value: "-45%", label: "Bounce rate" },
        { value: "1.9s", label: "Load time" },
      ],
    },
  ];
  
  export function getProject(slug: string) {
    return projects.find((p) => p.slug === slug);
  }
  
  export const AUTHOR = "Abdihakim";
  