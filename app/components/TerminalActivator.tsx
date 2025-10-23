'use client'
import { useKeySequence } from '@/hooks/useKeySequence'
import { useTerminal } from '@/contexts/TerminalContext'

export default function TerminalActivator() {
  const { activate } = useTerminal()

  useKeySequence({
    sequence: '$>',
    onMatch: activate,
    enabled: true
  })

  return null
}
