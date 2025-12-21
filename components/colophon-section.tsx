"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
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
      }

      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">GET IN TOUCH</h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Education</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">MMCOE Pune</li>
            <li className="font-mono text-xs text-foreground/80">BE Computer Engg</li>
            <li className="font-mono text-xs text-foreground/80">GPA: 8.84</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Frontend</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">React.js</li>
            <li className="font-mono text-xs text-foreground/80">Next.js</li>
            <li className="font-mono text-xs text-foreground/80">TailwindCSS</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Backend</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Node.js</li>
            <li className="font-mono text-xs text-foreground/80">SpringBoot</li>
            <li className="font-mono text-xs text-foreground/80">MongoDB</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Location</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">Pune, India</li>
            <li className="font-mono text-xs text-foreground/80">Available Remote</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:vedantnaikwadi1@gmail.com"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Email
              </a>
            </li>
            <li>
              <a
                href="tel:+918263073283"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Phone
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Social</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2025 Vedant Naikwadi. All rights reserved.
        </p>
        <p className="font-mono text-[10px] text-muted-foreground">Full Stack Developer • UI/UX Designer</p>
      </div>
    </section>
  )
}
