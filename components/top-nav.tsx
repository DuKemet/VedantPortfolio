"use client"

import { useState, useEffect } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
]

export function TopNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo/Name */}
        <button
          onClick={() => scrollToSection("hero")}
          className="font-mono text-sm uppercase tracking-[0.3em] text-foreground hover:text-accent transition-colors duration-200"
        >
          VN
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "font-mono text-[10px] uppercase tracking-widest transition-colors duration-200",
                activeSection === id ? "text-accent" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <ScrambleTextOnHover text={label} as="span" duration={0.4} />
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
