'use client'

import { useSession } from "next-auth/react"
import SignInButton from "./SignInButton"
import UserMenu from "./UserMenu"

export default function AuthSection() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
      </div>
    )
  }

  if (session?.user) {
    return <UserMenu user={session.user} />
  }

  return <SignInButton />
}
