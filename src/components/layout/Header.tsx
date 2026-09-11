import { AudioLines, MoonStar } from 'lucide-react'

function Header() {
  return (
    <header className="border-b border-white/[0.07]">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <a href="/" className="group inline-flex items-center gap-3" aria-label="Mixq home">
          <span className="grid size-10 place-items-center rounded-xl border border-teal-300/20 bg-teal-300/10 text-teal-300 transition-colors group-hover:bg-teal-300/15">
            <AudioLines aria-hidden="true" size={20} strokeWidth={2} />
          </span>
          <span className="text-xl font-semibold tracking-[-0.03em] text-white">mixq</span>
        </a>

        <button
          type="button"
          disabled
          aria-label="Theme controls coming soon"
          title="Theme controls coming soon"
          className="grid size-10 cursor-not-allowed place-items-center rounded-xl border border-white/10 text-stone-500"
        >
          <MoonStar aria-hidden="true" size={18} />
        </button>
      </nav>
    </header>
  )
}

export default Header
