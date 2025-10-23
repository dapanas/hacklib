export type TerminalTheme = {
  bg: string;
  text: string;
  prompt: string;
  cursor: string;
  accent: string;
  border: string;
  availableColor: string;
  borrowedColor: string;
  urlColor: string;
};

export const terminalThemes: Record<string, TerminalTheme> = {
  matrix: {
    bg: '#000000',
    text: '#00ff00',
    prompt: '#00ff00',
    cursor: '#00ff00',
    accent: '#00ff88',
    border: '#003300',
    availableColor: '#00ff00',
    borrowedColor: '#ff4444',
    urlColor: '#00ff88'
  },
  amber: {
    bg: '#1a0f00',
    text: '#ffb000',
    prompt: '#ffdd00',
    cursor: '#ffb000',
    accent: '#ffcc00',
    border: '#4a2c00',
    availableColor: '#ffcc00',
    borrowedColor: '#ff6600',
    urlColor: '#ffaa00'
  }
};

export const defaultTheme = 'matrix';

export function getTheme(name: string): TerminalTheme {
  return terminalThemes[name] || terminalThemes[defaultTheme];
}

export function saveThemePreference(themeName: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hacklib-terminal-theme', themeName);
  }
}

export function getThemePreference(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('hacklib-terminal-theme') || defaultTheme;
  }
  return defaultTheme;
}
