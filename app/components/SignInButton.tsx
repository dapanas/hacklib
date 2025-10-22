'use client'

import { signIn } from "next-auth/react"

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn('github')}
      className="btn-primary flex items-center gap-2"
    >
      <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-sm"></div>
      </div>
      Sign in with GitHub
    </button>
  )
}
