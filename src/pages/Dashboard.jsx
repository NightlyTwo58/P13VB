import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const MOCK_LOGS = [
  { id: 'req_3f9a8b', ts: '2024-11-14 09:22', prompt: 'Calculate risk delta on 10yr bond...', hash: 'sha256:a1b2c3d4', status: 'verified' },
  { id: 'req_7c2d1a', ts: '2024-11-14 09:18', prompt: 'Summarize patient history for case...', hash: 'sha256:e5f6a7b8', status: 'verified' },
  { id: 'req_9e4f2b', ts: '2024-11-14 09:11', prompt: 'Draft compliance memo for MiFID II...', hash: 'sha256:c9d0e1f2', status: 'verified' },
  { id: 'req_2a6c8d', ts: '2024-11-14 08:59', prompt: 'Classify transaction risk: SWIFT MT...', hash: 'sha256:g3h4i5j6', status: 'verified' },
  { id: 'req_5b3e7f', ts: '2024-11-14 08:44', prompt: 'Extract entities from legal filing...', hash: 'sha256:k7l8m9n0', status: 'verified' },
]

export default function Dashboard({ navigate }) {
  const { user, logout } = useAuth()
  const [copied, setCopied] = useState(false)

  const copyKey = () => {
    navigator.clipboard?.writeText(user.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <button className="nav-logo" onClick={() => navigate('home')}>
          DETERMINISTIC<span>AI</span>
        </button>
        <nav className="dash-nav">
          {[
            ['◈', 'Overview'],
            ['◻', 'Audit Logs'],
            ['⬡', 'API Keys'],
            ['⌬', 'Nodes'],
            ['⬡', 'Settings'],
          ].map(([icon, label], i) => (
            <button key={label} className={`dash-nav-item ${i === 0 ? 'active' : ''}`}>
              <span className="dash-nav-icon">{icon}</span>
              {label}
            </button>
          ))}
        </nav>
        <button className="dash-signout" onClick={() => { logout(); navigate('home') }}>
          Sign out
        </button>
      </aside>

      {/* Main */}
      <main className="dash-main">
        <div className="dash-header">
          <div>
            <h1>Welcome back, {user.name}</h1>
            <p className="dash-sub">Everything is deterministic. Nothing is guesswork.</p>
          </div>
          <span className="tier-badge tier-badge--lg">{user.tier}</span>
        </div>

        {/* Stats */}
        <div className="dash-stats">
          {[
            { label: 'Requests (24h)', val: '12,847' },
            { label: 'Verified outputs', val: '12,847', note: '100%' },
            { label: 'Avg latency', val: '183ms' },
            { label: 'Uptime (30d)', val: '99.99%' },
          ].map(s => (
            <div key={s.label} className="dash-stat">
              <span className="dash-stat-val">{s.val}</span>
              {s.note && <span className="dash-stat-note">{s.note}</span>}
              <span className="dash-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* API Key */}
        <div className="dash-section">
          <h2>API Key</h2>
          <div className="apikey-row">
            <code className="apikey-display">{user.apiKey}</code>
            <button className="btn-outline btn-sm" onClick={copyKey}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="apikey-hint">
            Use this with the <code>Authorization: Bearer</code> header. Your backend should proxy
            to <code>POST /api/generate</code>. See the <a href="#" onClick={e => { e.preventDefault(); navigate('technology') }}>integration guide →</a>
          </p>
        </div>

        {/* Audit logs */}
        <div className="dash-section">
          <h2>Recent Audit Log</h2>
          <div className="audit-table">
            <div className="audit-head">
              <span>Request ID</span>
              <span>Timestamp</span>
              <span>Prompt (truncated)</span>
              <span>Output Hash</span>
              <span>Status</span>
            </div>
            {MOCK_LOGS.map(log => (
              <div key={log.id} className="audit-row">
                <span className="audit-id">{log.id}</span>
                <span className="audit-ts">{log.ts}</span>
                <span className="audit-prompt">{log.prompt}</span>
                <span className="audit-hash">{log.hash}</span>
                <span className="audit-status">✓ Verified</span>
              </div>
            ))}
          </div>
        </div>

        {/* Node status */}
        <div className="dash-section">
          <h2>Inference Nodes</h2>
          <div className="nodes-grid">
            {[
              { id: 'node-us-east-1a', region: 'US East', gpu: '8× H100', status: 'Healthy', load: 42 },
              { id: 'node-eu-west-2b', region: 'EU West', gpu: '8× H100', status: 'Healthy', load: 67 },
              { id: 'node-ap-south-1c', region: 'AP South', gpu: '4× H100', status: 'Healthy', load: 28 },
            ].map(n => (
              <div key={n.id} className="node-card">
                <div className="node-top">
                  <span className="node-id">{n.id}</span>
                  <span className="node-status-dot" />
                </div>
                <div className="node-meta">{n.region} · {n.gpu}</div>
                <div className="node-load-bar">
                  <div className="node-load-fill" style={{ width: `${n.load}%` }} />
                </div>
                <div className="node-load-label">{n.load}% load</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}