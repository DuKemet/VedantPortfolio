"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "Python", "C++", "HTML", "CSS"],
    description: "Core programming languages and web technologies",
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Redux Toolkit", "TailwindCSS"],
    description: "Modern frontend frameworks and state management",
  },
  {
    category: "Backend",
    items: ["Node.js", "MySQL", "MongoDB"],
    description: "Server-side technologies and databases",
  },
  {
    category: "Tools & Cloud",
    items: ["Git", "GitHub", "VSCode", "Figma", "Cloudflare", "Vercel"],
    description: "Development tools and deployment platforms",
  },
  {
    category: "Additional",
    items: ["UI/UX Design", "Prompt Engineering", "Team Management"],
    description: "Design thinking and collaboration skills",
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

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
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
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
    <section id="skills" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Skills</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">TECHNICAL STACK</h2>
      </div>

      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="flex gap-8 overflow-x-auto pb-8 pr-12 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={index} />
        ))}
      </div>
    </section>
  )
}

function SkillCard({
  skill,
  index,
}: {
  skill: { category: string; items: string[]; description: string }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/60">{skill.items.length} Skills</span>
        </div>

        <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {skill.category}
        </h3>

        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">{skill.description}</p>

        <div className="flex flex-wrap gap-2">
          {skill.items.map((item, i) => (
            <span
              key={i}
              className="font-mono text-[10px] px-2 py-1 border border-border/40 text-muted-foreground group-hover:border-accent/40 transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
