'use client'
import { useEffect, useRef } from 'react'

interface UseKeySequenceOptions {
  sequence: string
  onMatch: () => void
  timeout?: number
  enabled?: boolean
}

export function useKeySequence({ 
  sequence, 
  onMatch, 
  timeout = 2000, 
  enabled = true 
}: UseKeySequenceOptions) {
  const sequenceRef = useRef('')
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (!enabled) return

    const handleKeyPress = (event: KeyboardEvent) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Add the pressed key to sequence
      sequenceRef.current += event.key

      // Check if sequence matches
      if (sequenceRef.current === sequence) {
        // Prevent the last character from being typed
        event.preventDefault()
        onMatch()
        sequenceRef.current = ''
        return
      }

      // Check if current sequence is still a valid prefix
      if (!sequence.startsWith(sequenceRef.current)) {
        sequenceRef.current = event.key
      }

      // Set timeout to reset sequence
      timeoutRef.current = setTimeout(() => {
        sequenceRef.current = ''
      }, timeout)
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [sequence, onMatch, timeout, enabled])
}
