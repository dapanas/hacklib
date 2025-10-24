'use client'
import { useState } from 'react'
import AuthSection from './AuthSection'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="glass-header sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-900">
            <a href="/" className="hover:text-primary-600 transition-colors duration-200 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              HackLib
            </a>
          </h1>
          
          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/books" 
              className="btn-ghost"
            >
              Browse Books
            </a>
            <a 
              href="/boardgames" 
              className="btn-ghost"
            >
              Board Games 🎲
            </a>
            <a 
              href="/videogames" 
              className="btn-ghost"
            >
              Video Games 🎮
            </a>
            <a 
              href="/my-loans" 
              className="btn-ghost"
            >
              My Loans
            </a>
            <AuthSection />
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out mt-1 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out mt-1 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
        mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobileMenu}
        ></div>
        
        {/* Menu */}
        <div className={`absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-lg z-50 transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <nav className="px-4 py-6 space-y-4">
            <a 
              href="/books" 
              className={`block py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-gray-900 font-medium transform hover:translate-x-1 ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? '100ms' : '0ms' }}
              onClick={closeMobileMenu}
            >
              Browse Books
            </a>
            <a 
              href="/boardgames" 
              className={`block py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-gray-900 font-medium transform hover:translate-x-1 ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? '125ms' : '0ms' }}
              onClick={closeMobileMenu}
            >
              Board Games 🎲
            </a>
            <a 
              href="/videogames" 
              className={`block py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-gray-900 font-medium transform hover:translate-x-1 ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? '150ms' : '0ms' }}
              onClick={closeMobileMenu}
            >
              Video Games 🎮
            </a>
            <a 
              href="/my-loans" 
              className={`block py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300 text-gray-900 font-medium transform hover:translate-x-1 ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? '175ms' : '0ms' }}
              onClick={closeMobileMenu}
            >
              My Loans
            </a>
            <div className={`pt-4 border-t border-white/20 transition-all duration-300 ${
              mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
            }`}
            style={{ transitionDelay: mobileMenuOpen ? '200ms' : '0ms' }}>
              <AuthSection />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
