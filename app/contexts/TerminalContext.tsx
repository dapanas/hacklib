'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { getThemePreference, saveThemePreference, getTheme } from '@/lib/terminalThemes'
import { executeCommand } from '@/lib/terminalCommands'

interface TerminalContextType {
  isActive: boolean
  currentPath: string
  theme: string
  activate: () => void
  deactivate: () => void
  executeCommand: (command: string) => Promise<string>
  setTheme: (themeName: string) => void
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined)

export function useTerminal() {
  const context = useContext(TerminalContext)
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider')
  }
  return context
}

interface TerminalProviderProps {
  children: ReactNode
}

export function TerminalProvider({ children }: TerminalProviderProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentPath, setCurrentPath] = useState('/')
  const [theme, setThemeState] = useState(getThemePreference())

  const activate = useCallback(() => {
    setIsActive(true)
  }, [])

  const deactivate = useCallback(() => {
    setIsActive(false)
    setCurrentPath('/')
  }, [])

  const setTheme = useCallback((themeName: string) => {
    setThemeState(themeName)
    saveThemePreference(themeName)
  }, [])

  const handleExecuteCommand = useCallback(async (command: string): Promise<string> => {
    try {
      const currentTheme = getTheme(theme)
      const result = await executeCommand(command, {
        currentPath,
        setCurrentPath,
        isActive,
        setTheme,
        deactivate,
        theme,
        themeColors: {
          availableColor: currentTheme.availableColor,
          borrowedColor: currentTheme.borrowedColor,
          urlColor: currentTheme.urlColor
        }
      })
      return result
    } catch (error) {
      throw error
    }
  }, [currentPath, isActive, setTheme, deactivate, theme])

  const value: TerminalContextType = {
    isActive,
    currentPath,
    theme,
    activate,
    deactivate,
    executeCommand: handleExecuteCommand,
    setTheme
  }

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  )
}
