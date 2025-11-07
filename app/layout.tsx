import './globals.css'
import { ReactNode } from 'react'
import AnnouncementBar from '../components/AnnouncementBar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Rubik } from 'next/font/google'

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  display: 'swap'
})

export const metadata = {
  title: 'Hindustanpost',
  description: 'A Next.js news site demo for Hindustanpost'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={rubik.className}>
      <body>
        <AnnouncementBar />
        <div className="container-full">
          <Header />
          <main className="mt-6 container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
