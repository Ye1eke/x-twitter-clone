import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from './Authprovider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitter Clone',
  description: 'Generated by create next app',
}

export default function RootLayout({ children } : any) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider>
        {children}
      </AuthProvider>
      </body>
    </html>
  )
}
