'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function NavbarSearch() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const searchBoxStyle: React.CSSProperties = {
    alignItems: 'center',
    animationDuration: '0.3s',
    backgroundColor: 'rgb(10, 31, 68)',
    borderColor: 'rgb(184, 142, 47)',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderRadius: '9999px',
    boxShadow: 'rgba(184, 142, 47, 0.15) 0px 0px 15px 0px',
    boxSizing: 'border-box',
    color: 'rgb(31, 36, 46)',
    display: 'flex',
    fontFamily: 'Manrope, Inter, system-ui, sans-serif',
    fontFeatureSettings: '"calt", "rlig"',
    fontVariationSettings: 'normal',
    height: '48px',
    letterSpacing: '0.4px',
    lineHeight: '24px',
    overflowX: 'hidden',
    overflowY: 'hidden',
    position: 'relative',
    tabSize: 4,
    textSizeAdjust: '100%',
    transitionDuration: '0.3s',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    unicodeBidi: 'isolate',
    width: '100%',
    maxWidth: '940px',
    WebkitFontSmoothing: 'antialiased',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitTextSizeAdjust: '100%',
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className=""
      style={searchBoxStyle}
    >
      <Search className="ml-3 mr-1 h-5 w-5 shrink-0 text-[#B88E2F]" />
      <input
  value={query}
  onChange={e => setQuery(e.target.value)}
  placeholder="Search tours, destinations, activities"
  className="flex-1 bg-transparent pl-3 pr-4 text-sm font-semibold text-[#D8E3F2] placeholder:text-[#9FB2CC] focus:outline-none"
  aria-label="Search tours, destinations, activities"
/>
      <button
  type="submit"
  className="
    ml-2 mr-1
    h-9 px-5 rounded-full
    text-sm font-semibold text-white
    border border-[#B88E2F]
    bg-gradient-to-r from-[#0A1F44] via-[#16376D] to-[#0A1F44]
    transition-all duration-300
    hover:from-[#B88E2F] hover:via-[#D4AF37] hover:to-[#B88E2F]
    hover:text-[#0A1F44]
    whitespace-nowrap
  "
>
  Search
</button>
    </form>
  )
}