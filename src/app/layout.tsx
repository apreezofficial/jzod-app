import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'JZod - JSON to Zod Converter',
    description: 'Convert JSON objects to Zod schemas instantly. Simple, fast, and open-source.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <div className="relative min-h-screen pt-16">
                        <Navbar />
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
