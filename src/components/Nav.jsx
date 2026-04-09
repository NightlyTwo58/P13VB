import { useAuth } from '../hooks/useAuth'

export default function Nav({ page, navigate }) {
  const { user, logout } = useAuth()

  const link = (label, target) => (
    <button
      key={target}
      onClick={() => navigate(target)}
      className={`nav-link ${page === target ? 'nav-link--active' : ''}`}
    >
      {label}
    </button>
  )

  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => navigate('home')}>
        DETERMINISTIC<span>AI</span>
      </button>

      <div className="nav-links">
        {link('Technology', 'technology')}
        {link('Compliance', 'compliance')}
        {link('Security', 'security')}
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <button className="nav-link" onClick={() => navigate('dashboard')}>
              {user.name} <span className="tier-badge">{user.tier}</span>
            </button>
            <button className="btn-outline btn-sm" onClick={() => { logout(); navigate('home') }}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={() => navigate('login')}>Sign In</button>
            <button className="btn-primary btn-sm" onClick={() => navigate('login')}>
              Get Access
            </button>
          </>
        )}
      </div>
    </nav>
  )
}