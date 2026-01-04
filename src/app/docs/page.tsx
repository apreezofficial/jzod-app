"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { BookOpen, Code2, Zap, Shield, ChevronRight, Terminal, Info } from "lucide-react"

export default function DocsPage() {
    const sections = [
        {
            title: "What is JZod?",
            description: "JZod is a high-performance, developer-first tool designed to solve the tedious problem of manually writing Zod schemas for JSON data. Whether you're working with external APIs or local config files, JZod generates production-ready TypeScript code in milliseconds.",
            icon: Info
        },
        {
            title: "Core Mechanics",
            description: "We use a recursive parsing logic that analyzes every field of your JSON object. It intelligently detects types like strings, numbers, booleans, arrays, and nested objects, generating a deeply nested Zod schema that matches your data structure exactly.",
            icon: Zap
        },
        {
            title: "Type Safety",
            description: "Beyond just generating the schema, JZod also exports a TypeScript type inferred from the generated schema. This ensures that your frontend and backend stay perfectly in sync without extra boilerplate.",
            icon: Shield
        }
    ]

    return (
        <div className="min-h-screen bg-background relative px-6 py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <BookOpen size={24} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Documentation</h1>
                    </div>

                    <p className="text-xl text-foreground/60 mb-16 leading-relaxed">
                        Learn how JZod handles your data and how to integrate the generated schemas into your workflow.
                    </p>

                    <div className="space-y-12">
                        {sections.map((section, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-3xl glass hover:border-primary/20 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <section.icon className="text-primary" size={20} />
                                    <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
                                </div>
                                <p className="text-foreground/70 leading-[1.8] font-medium">
                                    {section.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20">
                        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Code2 size={20} className="text-primary" />
                                Example Usage
                            </h3>
                            <div className="bg-black/50 p-6 rounded-2xl font-mono text-sm overflow-x-auto text-primary/80 border border-white/5">
                                <pre>
                                    {`// 1. Copy generated schema
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// 2. Use it in your code
const data = await response.json();
const validated = userSchema.parse(data);`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
