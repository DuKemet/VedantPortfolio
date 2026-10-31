"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    company: "Sanidhya – Inspiring Academic Excellence",
    role: "SDE Intern",
    period: "Mar 2026 – Present",
    bullets: [
      "Developed a full-stack EdTech web application from scratch using React.js, Node.js, Express.js, and MongoDB for academic content delivery and management.",
      "Built a responsive React.js frontend with dedicated Home, Gallery, and secured Admin interfaces for seamless content management.",
      "Designed and integrated RESTful APIs to enable dynamic content updates and seamless communication between the frontend and backend.",
      "Implemented MongoDB-backed models for Gallery Albums and Photos, enabling dynamic media management through the application.",
    ],
  },
  {
    company: "Kalpana Chawla Space Academy",
    role: "Full Stack Developer Intern",
    period: "Dec 2025 – Feb 2026",
    bullets: [
      "Redesigned and developed the official website, improving UI/UX and enhancing overall user engagement and accessibility.",
    ],
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Experience</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WORK EXPERIENCE</h2>
      </div>

      <div ref={cardsRef} className="space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </section>
  )
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: {
    company: string
    role: string
    period: string
    bullets: string[]
  }
  index: number
}) {
  return (
    <article className="group relative border border-border/40 p-6 md:p-8 transition-all duration-500 hover:border-accent/60">
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          "opacity-0 group-hover:opacity-100",
        )}
      />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {experience.role}
            </span>
            <h3 className="mt-2 font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors duration-300">
              {experience.company}
            </h3>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 md:mt-2 shrink-0">
            {experience.period}
          </span>
        </div>

        <ul className="space-y-3">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-accent mt-1.5 shrink-0">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                  <rect width="6" height="6" />
                </svg>
              </span>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>

      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] text-muted-foreground/40 group-hover:text-accent transition-colors duration-300",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute top-0 right-0 w-12 h-12 transition-all duration-500 opacity-0 group-hover:opacity-100">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
