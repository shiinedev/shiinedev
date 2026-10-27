"use client"
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { Project, projects } from "@/lib/projects";
import Link from "next/link";


function VideoModal({
    src,
    poster,
    title,
    isOpen,
    onClose,
  }: {
    src: string;
    poster: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
  }) {
    const videoRef = useRef<HTMLVideoElement>(null);
  
    useEffect(() => {
      if (!isOpen) return;
  
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {
          // Autoplay with sound may be blocked; controls let the user start it.
        });
      }
  
      document.body.classList.add("overflow-hidden");
  
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKeyDown);
  
      return () => {
        document.body.classList.remove("overflow-hidden");
        window.removeEventListener("keydown", onKeyDown);
        if (video) {
          video.pause();
        }
      };
    }, [isOpen, onClose]);
  
    if (!isOpen) return null;
  
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${title} video`}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 inline-flex items-center justify-center rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black/80"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="aspect-video w-full"
            aria-label={title}
          />
        </div>
      </div>
    );
  }
  
  export function ProjectDetail({project}:{project:Project}) {
   
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);
    const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);
  
    return (
        <>
         
  
          <article className="surface-card px-6 py-10 sm:px-12 sm:py-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
            </Link>
  
            <p className="mt-8 text-xs text-muted-foreground">{project.tag}</p>
            <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
  
            <button
              type="button"
              onClick={openModal}
              className="group relative mt-8 overflow-hidden rounded-2xl bg-muted text-left"
              aria-label={`Play ${project.title} video`}
            >
              <video
                src={project.video}
                poster={project.img}
                autoPlay
                muted
                loop
                playsInline
                aria-label={project.title}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-96"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                <span className="inline-flex items-center justify-center rounded-full bg-white/90 p-3 text-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              </span>
            </button>
  
            <VideoModal
              src={project.video}
              poster={project.img}
              title={project.title}
              isOpen={modalOpen}
              onClose={closeModal}
            />
  
            <dl className="mt-8 grid grid-cols-2 gap-6 border-b border-border pb-8 sm:grid-cols-3">
              {[
                { k: "Client", v: project.client },
                { k: "Role", v: project.role },
                { k: "Year", v: project.year },
              ].map((i) => (
                <div key={i.k}>
                  <dt className="text-xs text-muted-foreground">{i.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{i.v}</dd>
                </div>
              ))}
            </dl>
  
            <div className="mt-8 space-y-8">
              {[
                { h: "The challenge", p: project.challenge },
                { h: "The approach", p: project.approach },
                { h: "The outcome", p: project.outcome },
              ].map((s) => (
                <section key={s.h}>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">{s.h}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{s.p}</p>
                </section>
              ))}
            </div>
  
            <dl className="mt-12 grid grid-cols-3 gap-6">
              {project.results.map((r: { value: string; label: string }) => (
                <div key={r.label}>
                  <dt className="text-2xl font-semibold tracking-tight text-foreground">{r.value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{r.label}</dd>
                </div>
              ))}
            </dl>
          </article>
  
          <section className="px-2 py-6 sm:px-4">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">More projects</h2>
            <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}  className="group">
                  <div className="overflow-hidden rounded-2xl bg-muted">
                    <video
                      src={p.video}
                      poster={p.img}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={p.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">{p.tag}</p>
                  <h3 className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    {p.title}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        </>
  
    );
  }