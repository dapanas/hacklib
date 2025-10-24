'use client'

import { signIn } from "next-auth/react"
import { Github } from "lucide-react"

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn('github')}
      className="btn-primary flex items-center gap-2"
    >
      <Github className="w-4 h-4" />
      Sign in with GitHub
    </button>
  )
}
