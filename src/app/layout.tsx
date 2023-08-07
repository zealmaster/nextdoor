import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SiteTitle from './components/navigation/siteTitle'
import Navbar from './components/navigation/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nextdoor',
  description: 'The hood social network.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteTitle />
        <Navbar />
        {children}
        </body>
    </html>
  )
}
