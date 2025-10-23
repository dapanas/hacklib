import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import Header from './components/Header'
import Terminal from './components/Terminal'
import TerminalActivator from './components/TerminalActivator'
import { TerminalProvider } from './contexts/TerminalContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'HackLib - HackLab Book Lending',
  description: 'A low-ops book lending system where GitHub is the database, YAML is the state, and PRs are the workflow',
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
          <TerminalProvider>
            <TerminalActivator />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <footer className="mt-20 py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <p className="text-gray-400 text-xs mt-2">
                    A HackLab Oriente community project
                  </p>
                </div>
              </div>
            </footer>
            <Terminal />
          </TerminalProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
