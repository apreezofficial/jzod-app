"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Braces, BookOpen, Github, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    const navLinks = [
        { name: "Converter", href: "/", icon: Braces },
        { name: "Documentation", href: "/docs", icon: BookOpen },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-foreground/5 bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black rotate-3 transition-transform group-hover:rotate-0">
                            J
                        </div>
                        <span className="font-black text-xl tracking-tighter">JZOD<span className="text-primary">.</span></span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                                    pathname === link.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                                )}
                            >
                                <link.icon size={16} />
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2.5 rounded-xl hover:bg-foreground/5 transition-colors border border-transparent hover:border-foreground/10"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
                        </button>
                    )}

                    <a
                        href="https://github.com/apreezofficial/jzod-app"                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                        <Github size={18} />
                        GitHub
                    </a>

                    <button
                        className="md:hidden p-2 text-foreground/60"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-16 left-0 right-0 border-b border-foreground/5 bg-background p-6 flex flex-col gap-4"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "p-4 rounded-2xl text-lg font-bold flex items-center gap-4",
                                pathname === link.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground/60 hover:bg-foreground/5"
                            )}
                        >
                            <link.icon size={24} />
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="https://github.com/apreezofficial/jzod-app"
                        className="p-4 bg-foreground text-background rounded-2xl text-center font-bold"
                    >
                        Star on GitHub
                    </a>
                </motion.div>
            )}
        </nav>
    )
}
