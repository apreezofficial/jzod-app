import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'JZod - Intelligent JSON to Zod Converter',
    description: 'Convert JSON to Zod schemas and vice-versa instantly. The ultimate developer tool for type-safety and speed.',
    keywords: ["zod", "json", "converter", "typescript", "schema", "validation", "developer tools"],
    authors: [{ name: "Apcodesphere", url: "https://preciousadedokun.com.ng" }],
    openGraph: {
        title: 'JZod - JSON ↔ Zod Converter',
        description: 'The cleanest way to transform your JSON into Zod schemas and back.',
        url: 'https://jzod.vercel.app',
        siteName: 'JZod',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'JZod Preview',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'JZod - JSON ↔ Zod Converter',
        description: 'The cleanest way to transform your JSON into Zod schemas and back.',
        images: ['/og-image.png'],
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
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
