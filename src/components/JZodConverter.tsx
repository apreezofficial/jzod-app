"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, Copy, Check, Terminal, Zap, Github, Braces, Sparkles } from "lucide-react"
import { jsonToZod } from "@/lib/converter"

export default function JZodConverter() {
    const [input, setInput] = React.useState('{\n  "name": "JZod",\n  "version": 1,\n  "isActive": true,\n  "features": ["conversion", "copy-paste"],\n  "author": {\n    "name": "Apcodesphere",\n    "github": "https://github.com/apcodesphere"\n  }\n}')
    const [output, setOutput] = React.useState("")
    const [isValid, setIsValid] = React.useState(true)
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => {
        try {
            const data = JSON.parse(input)
            setOutput(jsonToZod(data))
            setIsValid(true)
        } catch (e) {
            setIsValid(false)
            setOutput("// Invalid JSON input")
        }
    }, [input])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen relative flex flex-col items-center px-4 py-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-6xl">
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
                            The cleanest way to transform your JSON into Zod schemas.
                            Built for developers who value speed and type-safety.
                        </p>
                    </motion.div>
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
                                <Braces size={16} />
                                JSON INPUT
                            </div>
                            {!isValid && (
                                <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">
                                    Invalid JSON
                                </span>
                            )}
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your JSON here..."
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
                                <Terminal size={16} />
                                ZOD SCHEMA
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
                        <a href="https://github.com/apcodesphere/jzod" className="hover:text-primary transition-colors">
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
