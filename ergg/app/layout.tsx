import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shoi.ch | 정보 제공은 쇼평',
  description: '이터널리턴 통계 제공 웹서비스\n매일 21시쯤 업데이트',
  openGraph: {
    title: 'Shoi.ch',
    description: 'An Analysis Web Service for Eternal Return',
    url: 'https://shoi.ch',
    siteName: 'Shoi.ch',
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png',
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: 'https://nextjs.org/og-alt.png',
    //     width: 1800,
    //     height: 1600,
    //     alt: 'My custom alt',
    //   },
    // ],
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div 
        className='absolute'
        id='modal-root' />
      </body>
    </html>
  )
}
