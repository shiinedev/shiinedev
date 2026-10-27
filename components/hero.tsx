"use client"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import Image from "next/image"
import avatar from "@/public/assets/avatar.png"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Dispatch, SetStateAction, useState } from "react"
import { IconArrowUpRight, IconClockHour3 } from "@tabler/icons-react"
import { Video } from "lucide-react"




export function Hero() {
  const {author,meta} = siteConfig
  const [opendialog,setOpenDialog] = useState(false)
  return (
    <section id="home" className="surface-card relative overflow-hidden px-6 py-10 sm:px-12 sm:py-14">
    <div className="absolute right-8 top-6 hidden sm:block">
      <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        Open for {author.openFor} new projects
      </span>
    </div>

    <div className="flex items-center gap-4">
      <Image
        src={avatar}
        alt={author.name}
        width={512}
        height={512}
        className="h-16 w-16 rounded-full object-cover"
      />
      <div>
        <p className="text-lg font-semibold text-foreground">{author.name}</p>
        <p className="text-sm text-muted-foreground"> {author.role}</p>
      </div>
    </div>

    <h1 className="mt-10 max-w-2xl text-3xl font-semibold leading-[1.25] tracking-tight text-foreground sm:text-4xl">
     {meta.description}
    </h1>
    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
      {author.description}
    </p>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 flex-wrap gap-3 w-3/4">
      <Button
        onClick={() => setOpenDialog(true)}
        className="rounded-full bg-primary px-6 py-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        size={"lg"}
      >
        Book a Free Call
      </Button>
      <Link
        href="#projects"
        className="rounded-full border border-border px-6 py-3 text-sm font-medium text-center text-foreground transition-colors hover:bg-muted"
      >
        See my Projects
      </Link>
    </div>
{/* 
    <p className="mt-12 text-xs text-muted-foreground">Trusted by 30+ Brands including</p>
    <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4 opacity-70">
      {["LOGOIPSUM", "Logoipsum", "Logoipsum", "Logoipsum"].map((l, i) => (
        <span key={i} className="text-base font-bold tracking-tight text-foreground">
          ◆ {l}
        </span>
      ))}
    </div> */}
    <BookingDialog open={opendialog} onOpenChange={setOpenDialog} author={author} />
  </section>
  )
}


type BookingDialogProps = {
  author: typeof siteConfig.author;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export function BookingDialog({
  author,
  open,
  onOpenChange,
}: BookingDialogProps) {
  const { Fivtheen, Thirthy } = author.bookingLink;

  const bookingOptions = [
    {
      ...Fivtheen,
      duration: "15 minutes",
      description: "A quick introduction or focused question.",
    },
    {
      ...Thirthy,
      duration: "30 minutes",
      description: "More time to discuss your project in detail.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Book a conversation</DialogTitle>
          <DialogDescription>
            Choose a time that works for you. You’ll confirm the booking on the
            scheduling page.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          {bookingOptions.map((option) => (
            <a
              key={option.url}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-accent/50">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Video className="size-5" aria-hidden="true" />
                    </span>
                    <IconArrowUpRight
                      className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>
                  </div>

                  <span className="mt-auto flex items-center gap-2 text-sm text-muted-foreground">
                    <IconClockHour3 className="size-4" aria-hidden="true" />
                    {option.duration}
                  </span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}