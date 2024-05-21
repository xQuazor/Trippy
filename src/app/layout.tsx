import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ChakraUIProvider } from '../providers/chakraUIProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Trippy',
    description: 'Find your next place to go!',
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className} style={{ margin: 0, padding: 0 }}>
                <ChakraUIProvider>{children}</ChakraUIProvider>
            </body>
        </html>
    )
}
