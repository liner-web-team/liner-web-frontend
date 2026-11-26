import { useEffect, useRef, useState } from 'react'
import type { Song } from '../../data/mockSongs'
import { usePlayer } from '../../store/player.context'
import Icon from '../ui/Icon'

export default function SongMenu({ song }: { song: Song }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { play, isSaved, toggleLibrary } = usePlayer()
  const saved = isSaved(song.id)

  useEffect(() => {
    if (!open) return
    const onMouse = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onMouse)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onMouse)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      className="ln-menu" ref={ref}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <button
        type="button" className="ln-icon-btn" aria-label={`More options for ${song.title}`}
        aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}
      >
        <Icon name="dots" />
      </button>
      {open && (
        <div className="ln-menu__panel" role="menu">
          <button type="button" role="menuitem" onClick={() => { play(song); setOpen(false) }}>Play now</button>
          <button type="button" role="menuitem" onClick={() => { toggleLibrary(song.id); setOpen(false) }}>
            {saved ? 'Remove from library' : 'Add to library'}
          </button>
        </div>
      )}
    </div>
  )
}
