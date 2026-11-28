import { useSignOut } from '../hooks/useAuth'
import { usePlayer } from '../providers/player.context'
import Icon from '../components/ui/Icon'

export default function SettingsPage() {
  const signOut = useSignOut()
  const { volume, setVolume, library, clearLibrary } = usePlayer()

  return (
    <section className="ln-section">
      <h2 className="ln-heading"><Icon name="settings" /> Settings</h2>
      <div className="ln-panel ln-settings">
        <label className="ln-setting">
          <span>Volume</span>
          <input type="range" className="ln-range" min={0} max={1} step={0.01} value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ ['--fill' as string]: `${volume * 100}%`, maxWidth: 220 }} />
        </label>
        <div className="ln-setting">
          <span>Library ({library.length} saved)</span>
          <button type="button" className="ln-btn" onClick={clearLibrary} disabled={library.length === 0}>Clear library</button>
        </div>
        <div className="ln-setting">
          <span>Account</span>
          <button type="button" className="ln-btn ln-btn--dark" onClick={signOut}>
            <Icon name="logout" size={16} /> Sign out
          </button>
        </div>
      </div>
    </section>
  )
}
