import { LanguageSelect } from './LanguageSelect'
import { LinerLogo } from './LinerLogo'


export function AuthLeftPanel() {
  return (
    <aside className="auth-left">
      <div className="auth-left__top">
        <LinerLogo />
        <LanguageSelect />
        <h1 className="auth-left__title">Your music, your way</h1>
      </div>
   

      <div className="auth-left__copy">
      
      
      </div>

      <div className="auth-left__art" aria-hidden="true">
        <div className="auth-orbit auth-orbit--lg" />
        <div className="auth-orbit auth-orbit--md" />
        <div className="auth-orbit auth-orbit--sm" />
        <div className="auth-disc">
          <span className="auth-disc__ring" />
          <span className="auth-disc__core">L</span>
        </div>
        <span className="auth-wave auth-wave--left" />
        <span className="auth-wave auth-wave--right" />
        <span className="auth-pill auth-pill--a">FOCUS</span>
        <span className="auth-pill auth-pill--b">CHILL</span>
        <span className="auth-pill auth-pill--c">LIVE</span>
        <span className="auth-pill auth-pill--d">ALBUMS</span>
      </div>
    </aside>
  )
}
