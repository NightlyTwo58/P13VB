import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Login({ navigate }) {
  const { login, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 400)) // simulate network
    const ok = login(email, password)
    setLoading(false)
    if (ok) navigate('dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <button className="nav-logo" onClick={() => navigate('home')} style={{ marginBottom: '3rem' }}>
          DETERMINISTIC<span>AI</span>
        </button>
        <h1>Welcome back.</h1>
        <p>Sign in to access your deterministic inference nodes, audit logs, and API keys.</p>

        <div className="login-hint">
          <span className="eyebrow">Demo credentials</span>
          <code>demo@deterministicai.com / demo1234</code>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form">
          <h2>Sign in</h2>

          {error && <div className="login-error">{error}</div>}

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <button
            className={`btn-primary btn-block ${loading ? 'btn-loading' : ''}`}
            onClick={handleSubmit}
            disabled={loading || !email || !password}
          >
            {loading ? <span className="spinner" /> : 'Sign in →'}
          </button>

          <div className="form-footer">
            <span>No account?</span>
            <button className="link-btn" onClick={() => navigate('home')}>Request early access</button>
          </div>
        </div>
      </div>
    </div>
  )
}