"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  const achievements = [
    {
      number: "01",
      titleParts: [
        { text: "SMART INDIA", highlight: true },
        { text: " HACKATHON", highlight: false },
      ],
      description:
        "Ranked Top 8 out of 120+ teams at Smart India Hackathon 2025 with AyurSutra, showcasing technical innovation and teamwork.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "SPORTS", highlight: true },
        { text: " SECRETARY", highlight: false },
      ],
      description:
        "Leading ACES (Association of Computer Engineering Students) as Sports Secretary, managing events and team coordination.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "ACADEMIC ", highlight: false },
        { text: "EXCELLENCE", highlight: true },
      ],
      description:
        "Maintaining 8.84 GPA in Computer Engineering at Marathwada Mitra Mandal's College of Engineering, Pune.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "CONTINUOUS ", highlight: false },
        { text: "LEARNING", highlight: true },
      ],
      description:
        "Constantly exploring new technologies and frameworks. Currently building Convecta with Next.js and TypeScript.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      const articles = principlesRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = achievements[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [achievements])

  return (
    <section ref={sectionRef} id="achievements" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Achievements</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">HIGHLIGHTS</h2>
      </div>

      <div ref={principlesRef} className="space-y-24 md:space-y-32">
        {achievements.map((achievement, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              achievement.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {achievement.number} / {achievement.titleParts[0].text.split(" ")[0]}
            </span>

            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none">
              {achievement.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            <p className="mt-6 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
              {achievement.description}
            </p>

            <div className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${achievement.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
