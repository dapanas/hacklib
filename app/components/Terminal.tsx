'use client'
import { useState, useRef, useEffect } from 'react'
import { useTerminal } from '@/contexts/TerminalContext'
import { getTheme } from '@/lib/terminalThemes'

interface TerminalLine {
  type: 'command' | 'output' | 'error'
  content: string
  timestamp?: Date
  path?: string
}

const WELCOME_MESSAGE = `
██╗  ██╗ █████╗  ██████╗██╗  ██╗██╗     ██╗██████╗ 
██║  ██║██╔══██╗██╔════╝██║ ██╔╝██║     ██║██╔══██╗
███████║███████║██║     █████╔╝ ██║     ██║██████╔╝
██╔══██║██╔══██║██║     ██╔═██╗ ██║     ██║██╔══██╗
██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝╚═════╝ 

Welcome to HackLib Terminal
Type 'help' for available commands

Lbh sbhaq gur uvqqra trz!
`

export default function Terminal() {
  const { isActive, currentPath, theme, executeCommand } = useTerminal()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)

  const currentTheme = getTheme(theme)

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus()
      if (!hasShownWelcome) {
        setHistory([{ type: 'output', content: WELCOME_MESSAGE, timestamp: new Date() }])
        setHasShownWelcome(true)
      }
    }
  }, [isActive, hasShownWelcome])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommandLine()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  const executeCommandLine = async () => {
    if (!input.trim()) return

    const command = input.trim()
    setInput('')
    setHistoryIndex(-1)
    
    // Handle clear command specially
    if (command.toLowerCase() === 'clear') {
      setHistory([])
      return
    }
    
    // Add command to history with current path
    setHistory(prev => [...prev, { type: 'command', content: command, timestamp: new Date(), path: currentPath }])
    
    // Add to command history
    setCommandHistory(prev => [...prev, command])

    try {
      const output = await executeCommand(command)
      if (output) {
        setHistory(prev => [...prev, { type: 'output', content: output, timestamp: new Date() }])
      }
    } catch (error) {
      setHistory(prev => [...prev, { 
        type: 'error', 
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 
        timestamp: new Date() 
      }])
    }
  }

  const formatPrompt = (path?: string) => {
    const displayPath = path || currentPath
    const finalPath = displayPath === '/' ? '~' : displayPath
    return `hacklib@terminal:${finalPath}$`
  }

  if (!isActive) return null

  return (
    <div 
      className={`terminal-overlay terminal-${theme}`}
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
      }}
    >
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-title">HackLib Terminal</div>
        </div>
        
        <div 
          ref={terminalRef}
          className="terminal-content"
          style={{ backgroundColor: currentTheme.bg }}
        >
          {history.map((line, index) => (
            <div key={index} className="terminal-line">
              {line.type === 'command' && (
                <div className="terminal-prompt-line">
                  <span 
                    className="terminal-prompt"
                    style={{ color: currentTheme.prompt }}
                  >
                    {formatPrompt(line.path)}
                  </span>
                  <span>{line.content}</span>
                </div>
              )}
              {line.type === 'output' && (
                <div 
                  className="terminal-output"
                  style={{ 
                    color: currentTheme.text,
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
                  }}
                >
                  {line.content.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex}>
                      {line.split(/(https?:\/\/[^\s]+)/g).map((part, partIndex) => {
                        if (part.match(/^https?:\/\//)) {
                          return (
                            <span 
                              key={partIndex}
                              style={{ 
                                color: currentTheme.urlColor,
                                textDecoration: 'underline',
                                cursor: 'pointer'
                              }}
                              onClick={() => window.open(part, '_blank', 'noopener,noreferrer')}
                            >
                              {part}
                            </span>
                          )
                        }
                        return part
                      })}
                    </div>
                  ))}
                </div>
              )}
              {line.type === 'error' && (
                <div 
                  className="terminal-error"
                  style={{ 
                    color: '#ff4444',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
                  }}
                >
                  {line.content}
                </div>
              )}
            </div>
          ))}
          
          <div className="terminal-input-line">
            <span 
              className="terminal-prompt"
              style={{ color: currentTheme.prompt }}
            >
              {formatPrompt()}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              style={{
                backgroundColor: 'transparent',
                color: currentTheme.text,
                border: 'none',
                outline: 'none',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                flex: 1
              }}
              autoComplete="off"
              spellCheck={false}
            />
            <span 
              className="terminal-cursor"
              style={{ color: currentTheme.cursor }}
            >
              █
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
