"use client"
import { ChevronDown } from "lucide-react";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";


export default function Home() {

  const {author} = siteConfig
  return (
    <>
       <Hero/>

        <About/>

       <Projects />

      <Contact />
    </>
  );
}
