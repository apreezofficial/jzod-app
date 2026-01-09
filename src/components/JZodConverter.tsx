"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Copy, Check, Terminal, Zap, Github, Braces, Sparkles, ArrowLeftRight, Palette, Layout, Box, Wand2 } from "lucide-react"
import { jsonToZod, zodToJson } from "@/lib/converter"

const TEMPLATES = [
    { id: "default", name: "Modern Glass", class: "bg-primary/10 blur-[120px]" },
    { id: "nebula", name: "Deep Nebula", class: "bg-purple-600/20 blur-[150px] mix-blend-screen" },
    { id: "emerald", name: "Emerald Forest", class: "bg-emerald-500/15 blur-[100px]" },
    { id: "dawn", name: "Golden Dawn", class: "bg-orange-500/10 blur-[130px]" },
    { id: "cyber", name: "Cyberpunk", class: "bg-cyan-500/20 blur-[140px]" },
]

export default function JZodConverter() {
    const [input, setInput] = React.useState('{\n  "name": "JZod",\n  "version": 1,\n  "isActive": true,\n  "features": ["conversion", "copy-paste"],\n  "author": {\n    "name": "Apcodesphere",\n    "github": "https://github.com/apcodesphere"\n  }\n}')
    const [output, setOutput] = React.useState("")
    const [isValid, setIsValid] = React.useState(true)
    const [copied, setCopied] = React.useState(false)
    const [mode, setMode] = React.useState<"json-to-zod" | "zod-to-json">("json-to-zod")
    const [template, setTemplate] = React.useState(TEMPLATES[0])

    React.useEffect(() => {
        if (mode === "json-to-zod") {
            try {
                const data = JSON.parse(input)
                setOutput(jsonToZod(data))
                setIsValid(true)
            } catch (e) {
                setIsValid(false)
                setOutput("// Invalid JSON input")
            }
        } else {
            const result = zodToJson(input)
            setOutput(result)
            setIsValid(!result.startsWith("//"))
        }
    }, [input, mode])

    const toggleMode = () => {
        setMode(prev => prev === "json-to-zod" ? "zod-to-json" : "json-to-zod")
        setInput(output)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen relative flex flex-col items-center px-4 py-20 overflow-hidden">
            {/* Background elements */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none transition-all duration-1000 ${template.class}`} />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="relative w-full max-w-6xl">
                {/* Template Selector & Mode Toggle */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <div className="flex bg-foreground/5 p-1 rounded-2xl border border-foreground/10 backdrop-blur-sm">
                        {TEMPLATES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTemplate(t)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${template.id === t.id
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "hover:bg-foreground/5 text-foreground/50"
                                    }`}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Header */}
                <div className="text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={14} />
                            Open Source
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                            JZOD<span className="text-primary">.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto font-medium leading-relaxed">
                            {mode === "json-to-zod"
                                ? "The cleanest way to transform your JSON into Zod schemas."
                                : "Reverse engineer your Zod schemas back into sample JSON objects."}
                            {" "}Built for developers who value speed and type-safety.
                        </p>
                    </motion.div>
                </div>

                <div className="flex justify-center mb-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMode}
                        className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all"
                    >
                        <ArrowLeftRight className={`transition-transform duration-500 ${mode === "zod-to-json" ? "rotate-180" : ""}`} size={20} />
                        {mode === "json-to-zod" ? "SWITCH TO ZOD → JSON" : "SWITCH TO JSON → ZOD"}
                        <Wand2 size={18} className="ml-1 animate-pulse" />
                    </motion.button>
                </div>

                {/* Main Converter Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                    {/* Input Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group flex flex-col h-[600px] rounded-3xl overflow-hidden glass transition-all hover:border-primary/30"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/5 bg-foreground/[0.02]">
                            <div className="flex items-center gap-2 font-bold text-sm opacity-60">
                                {mode === "json-to-zod" ? <Braces size={16} /> : <Terminal size={16} />}
                                {mode === "json-to-zod" ? "JSON INPUT" : "ZOD SCHEMA INPUT"}
                            </div>
                            {!isValid && (
                                <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                                    {mode === "json-to-zod" ? "Invalid JSON" : "Invalid Zod Schema"}
                                </span>
                            )}
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "json-to-zod" ? "Paste your JSON here..." : "Paste your Zod schema code here..."}
                            className="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
                            spellCheck={false}
                        />
                    </motion.div>

                    {/* Output Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group flex flex-col h-[600px] rounded-3xl overflow-hidden glass border-primary/20 bg-primary/[0.01] transition-all hover:border-primary/40"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-foreground/5 bg-foreground/[0.02]">
                            <div className="flex items-center gap-2 font-bold text-sm text-primary">
                                {mode === "json-to-zod" ? <Terminal size={16} /> : <Braces size={16} />}
                                {mode === "json-to-zod" ? "ZOD SCHEMA" : "JSON OUTPUT"}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 p-2 rounded-xl transition-all hover:bg-primary/10 hover:text-primary active:scale-95"
                            >
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            className="flex items-center gap-2 text-xs font-bold"
                                        >
                                            <Check size={14} />
                                            COPIED
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="copy"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            className="flex items-center gap-2 text-xs font-bold"
                                        >
                                            <Copy size={14} />
                                            COPY CODE
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                        <pre className="flex-1 p-6 overflow-auto font-mono text-sm leading-relaxed text-primary/90">
                            <code>{output}</code>
                        </pre>
                    </motion.div>
                </div>

                {/* Footer Credits */}
                <div className="mt-32 text-center pb-10">
                    <p className="text-sm font-medium text-foreground/40 mb-6 font-mono uppercase tracking-[0.2em]">
                        Proudly Open Source by <a href="https://preciousadedokun.com.ng" className="text-primary hover:underline underline-offset-4 decoration-2">Apcodesphere</a>
                    </p>
                    <div className="flex items-center justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
                        <a href="https://github.com/apreezofficial/jzod-app" className="hover:text-primary transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            <Zap size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
