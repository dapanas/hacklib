import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import AuthSection from './components/AuthSection'
import './globals.css'

export const metadata: Metadata = {
  title: 'HackLib - HackLab Book Lending',
  description: 'A nerdy, low-ops lending system where GitHub is the database, YAML is the state, and PRs are the workflow',
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
          <header className="glass-header sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  <a href="/" className="hover:text-primary-600 transition-colors duration-200 flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-sm flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </div>
                    HackLib
                  </a>
                </h1>
                <nav className="flex items-center space-x-6">
                  <a 
                    href="/books" 
                    className="btn-ghost"
                  >
                    Browse Books
                  </a>
                  <a 
                    href="/my-loans" 
                    className="btn-ghost"
                  >
                    My Loans
                  </a>
                  <AuthSection />
                </nav>
              </div>
            </div>
          </header>
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
