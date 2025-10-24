import { buildCreateLoanURL } from '@/lib/github'

interface CommandContext {
  currentPath: string
  setCurrentPath: (path: string) => void
  isActive: boolean
  setTheme?: (theme: string) => void
  deactivate?: () => void
  theme?: string
  themeColors?: {
    availableColor: string
    borrowedColor: string
    urlColor: string
  }
}

export async function executeCommand(
  command: string, 
  context: CommandContext
): Promise<string> {
  const [cmd, ...args] = command.trim().split(/\s+/)
  
  switch (cmd.toLowerCase()) {
    case 'ls':
      return await handleLs(args, context)
    case 'cd':
      return handleCd(args, context)
    case 'cat':
      return await handleCat(args, context)
    case 'borrow':
      return await handleBorrow(args, context)
    case 'clear':
      return handleClear()
    case 'bye':
    case 'exit':
      return handleExit(context)
    case 'help':
      return handleHelp()
    case 'theme':
      return handleTheme(args, context)
    case 'pwd':
      return handlePwd(context)
    default:
      return `Command not found: ${cmd}. Type 'help' for available commands.`
  }
}

async function handleLs(args: string[], context: CommandContext): Promise<string> {
  const path = args[0] || context.currentPath
  
  if (path === '/' || path === '') {
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    return `total 2
drwxr-xr-x  2 hacklib hacklib 4096 ${dateStr} ${timeStr} books
drwxr-xr-x  2 hacklib hacklib 4096 ${dateStr} ${timeStr} boardgames
`
  }
  
  if (path === '/books' || path === 'books') {
    try {
      const response = await fetch('/api/terminal/books')
      const books = await response.json()
      
      if (!books || books.length === 0) {
        return 'No books found in the library.'
      }
      
      const now = new Date()
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      
      let output = `total ${books.length}\n`
      output += `drwxr-xr-x  2 hacklib hacklib 4096 ${dateStr} ${timeStr} .\n`
      output += `drwxr-xr-x  2 hacklib hacklib 4096 ${dateStr} ${timeStr} ..\n`
      
      books.forEach((book: any) => {
        const status = book.availability?.available ? 'AVAILABLE' : 'BORROWED'
        output += `-rw-r--r--  1 ${book.owner} hacklib 1024 ${dateStr} ${timeStr} ${book.id} [${status}]\n`
      })
      
      return output
    } catch (error) {
      return `Error loading books: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
  
  if (path === '/boardgames' || path === 'boardgames') {
    try {
      const response = await fetch('/api/terminal/boardgames')
      const boardGames = await response.json()
      
      if (!boardGames || boardGames.length === 0) {
        return 'No board games found in the library.'
      }
      
      const now = new Date()
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      
      let output = `total ${boardGames.length}\n`
      output += `drwxr-xr-x  2 hacklib hacklib 4096 ${dateStr} ${timeStr} .\n`
      output += `drwxr-xr-x  2 hacklib hacklib 4096 ${dateStr} ${timeStr} ..\n`
      
      boardGames.forEach((boardGame: any) => {
        const status = boardGame.availability?.available ? 'AVAILABLE' : 'BORROWED'
        output += `-rw-r--r--  1 ${boardGame.owner} hacklib 1024 ${dateStr} ${timeStr} ${boardGame.id} [${status}]\n`
      })
      
      return output
    } catch (error) {
      return `Error loading board games: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
  
  return `ls: cannot access '${path}': No such file or directory`
}

function handleCd(args: string[], context: CommandContext): string {
  const path = args[0] || '/'
  
  if (path === '/' || path === '') {
    context.setCurrentPath('/')
    return ''
  }
  
  if (path === 'books' || path === '/books') {
    context.setCurrentPath('/books')
    return ''
  }
  
  if (path === 'boardgames' || path === '/boardgames') {
    context.setCurrentPath('/boardgames')
    return ''
  }
  
  if (path.startsWith('/book/') || path.startsWith('book/')) {
    const bookId = path.replace(/^\/?book\//, '')
    context.setCurrentPath(`/book/${bookId}`)
    return ''
  }
  
  if (path.startsWith('/boardgame/') || path.startsWith('boardgame/')) {
    const boardGameId = path.replace(/^\/?boardgame\//, '')
    context.setCurrentPath(`/boardgame/${boardGameId}`)
    return ''
  }
  
  return `cd: ${path}: No such file or directory`
}

async function handleCat(args: string[], context: CommandContext): Promise<string> {
  if (args.length === 0) {
    return 'cat: missing file operand'
  }
  
  const itemId = args[0]
  
  try {
    // Try book first
    let response = await fetch(`/api/terminal/book/${encodeURIComponent(itemId)}`)
    if (response.ok) {
      const book = await response.json()
      
      let output = `=== ${book.title} ===\n`
      output += `Author(s): ${Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}\n`
      output += `Owner: ${book.owner}\n`
      output += `Status: ${book.availability?.available ? 'AVAILABLE' : 'BORROWED'}\n`
      
      if (book.tags && book.tags.length > 0) {
        output += `Tags: ${book.tags.join(', ')}\n`
      }
      
      if (book.notes) {
        output += `\nNotes:\n${book.notes}\n`
      }
      
      if (!book.availability?.available && book.availability?.borrower) {
        output += `\nCurrently borrowed by: ${book.availability.borrower}\n`
        if (book.availability.until) {
          output += `Due: ${book.availability.until}\n`
        }
      }
      
      return output
    }
    
    // Try board game
    response = await fetch(`/api/terminal/boardgame/${encodeURIComponent(itemId)}`)
    if (response.ok) {
      const boardGame = await response.json()
      
      let output = `=== ${boardGame.title} ===\n`
      output += `Players: ${boardGame.min_players}-${boardGame.max_players}\n`
      output += `Owner: ${boardGame.owner}\n`
      output += `Status: ${boardGame.availability?.available ? 'AVAILABLE' : 'BORROWED'}\n`
      
      if (boardGame.duration_minutes) {
        output += `Duration: ${boardGame.duration_minutes} minutes\n`
      }
      
      if (boardGame.complexity) {
        output += `Complexity: ${boardGame.complexity}\n`
      }
      
      if (boardGame.tags && boardGame.tags.length > 0) {
        output += `Tags: ${boardGame.tags.join(', ')}\n`
      }
      
      if (boardGame.notes) {
        output += `\nNotes:\n${boardGame.notes}\n`
      }
      
      if (!boardGame.availability?.available && boardGame.availability?.borrower) {
        output += `\nCurrently borrowed by: ${boardGame.availability.borrower}\n`
        if (boardGame.availability.until) {
          output += `Due: ${boardGame.availability.until}\n`
        }
      }
      
      return output
    }
    
    return `cat: ${itemId}: No such file or directory`
  } catch (error) {
    return `cat: ${itemId}: ${error instanceof Error ? error.message : 'Unknown error'}`
  }
}

async function handleBorrow(args: string[], context: CommandContext): Promise<string> {
  if (args.length === 0) {
    return 'borrow: missing item ID operand\nUsage: borrow <item-id> [--open]\n  --open    Open URL in new tab instead of displaying it'
  }
  
  const itemId = args[0]
  const shouldOpen = args.includes('--open')
  
  try {
    // Try book first
    let response = await fetch(`/api/terminal/book/${encodeURIComponent(itemId)}`)
    let item = null
    let itemType = 'book'
    
    if (response.ok) {
      item = await response.json()
    } else {
      // Try board game
      response = await fetch(`/api/terminal/boardgame/${encodeURIComponent(itemId)}`)
      if (response.ok) {
        item = await response.json()
        itemType = 'boardgame'
      }
    }
    
    if (!item) {
      return `borrow: ${itemId}: Item not found`
    }
    
    if (!item.availability?.available) {
      return `borrow: ${itemId}: ${itemType === 'book' ? 'Book' : 'Board game'} is not available for loan`
    }
    
    const org = process.env.NEXT_PUBLIC_GH_ORG || 'your-org'
    const repo = process.env.NEXT_PUBLIC_GH_REPO || 'your-repo'
    const branch = process.env.NEXT_PUBLIC_GH_PR_BRANCH || 'main'
    const borrower = 'your-github-username' // This would need to be dynamic
    const requestedAt = new Date().toISOString().slice(0, 10)
    const until = new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString().slice(0, 10)
    const year = requestedAt.slice(0, 4)
    
    const createUrl = buildCreateLoanURL({
      org,
      repo,
      branch,
      year,
      owner: item.owner,
      bookId: item.id,
      borrower,
      requestedAt,
      until,
      itemType
    })
    
    if (shouldOpen) {
      // Open URL in new tab
      if (typeof window !== 'undefined') {
        window.open(createUrl, '_blank', 'noopener,noreferrer')
      }
      return `Opening loan request for "${item.title}" in new tab...`
    }
    
    return `Loan request URL generated for "${item.title}":
${createUrl}


Click the link above to create a GitHub Pull Request for this loan.
Use 'borrow ${itemId} --open' to open directly in new tab.`
  } catch (error) {
    return `borrow: ${itemId}: ${error instanceof Error ? error.message : 'Unknown error'}`
  }
}

function handleClear(): string {
  return '\x1b[2J\x1b[H' // ANSI escape codes to clear screen
}

function handleExit(context: CommandContext): string {
  context.setCurrentPath('/')
  if (context.deactivate) {
    context.deactivate()
  }
  return 'Goodbye!'
}

function handleHelp(): string {
  return `HackLib Terminal - Available Commands:

  ls [path]          List books or navigate directories
  cd <path>          Change directory
  pwd                Print working directory
  cat <book-id>      Display book details
  borrow <book-id>   Generate loan request URL
  clear              Clear terminal screen
  bye, exit          Close terminal mode
  help               Show this help message
  theme <name>       Switch theme (matrix, amber)

Examples:
  ls                 List root directory
  cd books           Navigate to books directory
  pwd                Show current directory
  ls books           List all books
  
Type '$>' anywhere to activate terminal mode.`
}

function handlePwd(context: CommandContext): string {
  return context.currentPath
}

function handleTheme(args: string[], context: CommandContext): string {
  if (args.length === 0) {
    const currentTheme = context.theme || 'matrix'
    return `Current theme: ${currentTheme}\nAvailable themes: matrix, amber\nUsage: theme <name>`
  }
  
  const themeName = args[0].toLowerCase()
  const validThemes = ['matrix', 'amber']
  
  if (!validThemes.includes(themeName)) {
    return `Invalid theme: ${themeName}\nAvailable themes: ${validThemes.join(', ')}`
  }
  
  if (context.setTheme) {
    context.setTheme(themeName)
  }
  
  return `Theme switched to: ${themeName}`
}
