import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import Header from './components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'HackLib - HackLab Book Lending',
  description: 'A low-ops lending system where GitHub is the database, YAML is the state, and PRs are the workflow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SessionProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="mt-20 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Built with Next.js, Tailwind CSS, and GitHub as the database
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  A HackLab community project
                </p>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  )
}
