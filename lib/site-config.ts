import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";


export const siteConfig = {
    socials: [{ label: "LinkedIn", href: "https://linkedin.com/in/shiinedev", Icon: IconBrandLinkedin },
    { label: "X", href: "https://x.com/shiinedev", Icon: IconBrandX },
    { label: "GitHub", href: "https://github.com/shiinedev", Icon: IconBrandGithub }],
    navLinks: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Projects", href: "/#projects" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/#contact" },
    ],
    meta: {
        title: "Abdihakim - Fullstack developer/AI Engineer Portofolio",
        description: "Building AI powered application, solving real world proplems and making easy for dialy tasks.",
        ogTitle: "Abdihakim - Fullstack developer/AI Engineer Portofolio",
        ogDescription: "Building AI powered application, solving real world proplems and making easy for dialy tasks",
        ogType: "website",
        ogUrl: "/",
        twitterCard: "summary_large_image",
        links: [{
            rel: "canonical", href: "/"
        }]

    },
    stats: [
    
        { value: "2+", label: "Years of experience" },
        { value: "95%", label: "Client Satisfaction Rate" },
    ],
    author: {
        name: "Abdihakim",
        email:"shiinedev96@gmail.com",
        role: "Fullstack devleper/ AI engineer",
        description:'Helping brands grow through thoughtful Building and user experiences that drive engagement,build trust, and deliver results.',
        about:{title:"Hey, I'm Abdihakim — a Fullstack/AI Engineer developer",description:"Solving real world proplems and making daily tasks easy through AI automation."},
        openFor: 2,
        bookingLink: {
            Fivtheen: {
                title: "15 minutes",
                url: "https://cal.com/shiine-dev/15min"
            },
            Thirthy: { 
                title: "30 Minutes", 
                url: "https://cal.com/shiine-dev/30min" 
            }
        }
    }
}

 


