import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shoi.ch | 쇼맘이 시켜서 만든 통계사이트 쇼이.치',
  description: '이터널리턴 통계 제공 웹서비스\n매일 21시쯤 업데이트',
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
