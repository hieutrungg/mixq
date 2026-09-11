import { AudioLines, MoonStar, Sun } from 'lucide-react'
import type { Theme } from '../../hooks/useTheme'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

function Header({ theme, onToggleTheme }: HeaderProps) {
  const isDark = theme === 'dark'

  return (
    <header className="site-header border-b backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <a href="/" className="group inline-flex items-center gap-3" aria-label="Mixq home">
          <span className="grid size-10 place-items-center rounded-xl border border-teal-300/20 bg-teal-300/10 text-teal-300 transition-colors group-hover:bg-teal-300/15">
            <AudioLines aria-hidden="true" size={20} strokeWidth={2} />
          </span>
          <span className="copy-primary text-xl font-semibold tracking-[-0.03em]">mixq</span>
        </a>

        <button
          type="button"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          onClick={onToggleTheme}
          className="secondary-control grid size-10 place-items-center rounded-xl border transition duration-200 active:scale-95"
        >
          {isDark ? <Sun aria-hidden="true" size={18} /> : <MoonStar aria-hidden="true" size={18} />}
        </button>
      </nav>
    </header>
  )
}

export default Header
