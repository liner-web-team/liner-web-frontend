import { useEffect, useRef, useState } from 'react'
import { useLibraryStore } from '../../store/library.store'
import type { Song } from '../../types/music'
import { MoreIcon } from './Icons'

type SongMenuProps = {
  song: Song
}

export function SongMenu({ song }: SongMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const isSaved = useLibraryStore((state) => state.isSaved(song.id))
  const toggleLibrary = useLibraryStore((state) => state.toggleLibrary)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="song-menu" ref={rootRef}>
      <button
        type="button"
        className="song-menu__trigger"
        aria-label={`More options for ${song.title}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(event) => {
          event.stopPropagation()
          setOpen((value) => !value)
        }}
      >
        <MoreIcon />
      </button>

      {open ? (
        <div className="song-menu__panel" role="menu">
          <button
            type="button"
            role="menuitem"
            onClick={(event) => {
              event.stopPropagation()
              toggleLibrary(song.id)
              setOpen(false)
            }}
          >
            {isSaved ? 'Remove from library' : 'Add to library'}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={(event) => {
              event.stopPropagation()
              void navigator.clipboard?.writeText(`${song.title} — ${song.artist}`)
              setOpen(false)
            }}
          >
            Copy song info
          </button>
        </div>
      ) : null}
    </div>
  )
}
