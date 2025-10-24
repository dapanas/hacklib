'use client'

import { signOut } from "next-auth/react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Nickname from "./Nickname"

interface UserMenuProps {
  user: {
    name?: string | null
    username?: string | null
    avatar?: string | null
  }
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || user.username || 'User'}
            className="w-8 h-8 rounded-full border border-gray-200"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {(user.name || user.username || 'U').charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user.name || user.username}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 glass-card p-2 z-20 animate-scale-in">
            <div className="px-3 py-2 border-b border-gray-200/50 mb-2">
              <p className="text-sm font-medium text-gray-900">
                {user.name || user.username}
              </p>
              <p className="text-xs text-gray-500">
                {user.username && <Nickname username={user.username} className="text-xs" />}
              </p>
            </div>
            <button
              onClick={() => {
                signOut()
                setIsOpen(false)
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100/50 rounded-lg transition-colors duration-200"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
