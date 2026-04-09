export default function Compliance({ navigate }) {
  return (
    <div className="page">
      <div className="page-hero">
        <span className="eyebrow">Regulatory Infrastructure</span>
        <h1>Built for the<br />regulated world.</h1>
        <p>
          Finance, healthcare, legal — industries where an AI that gives different answers
          to the same question isn't a nuisance. It's a liability.
        </p>
      </div>

      <div className="page-content">
        {/* Certifications */}
        <section className="certs-section">
          <h2>Certifications & Standards</h2>
          <div className="certs-grid">
            {[
              { cert: 'SOC 2 Type II', scope: 'Security, Availability, Processing Integrity', status: 'Active' },
              { cert: 'ISO 27001', scope: 'Information Security Management', status: 'Active' },
              { cert: 'HIPAA', scope: 'Healthcare data handling & BAA available', status: 'Active' },
              { cert: 'GDPR', scope: 'EU data residency & DPA available', status: 'Active' },
              { cert: 'FedRAMP', scope: 'Government cloud — Moderate baseline', status: 'In Progress' },
              { cert: 'PCI DSS', scope: 'Payment data environment segregation', status: 'Active' },
            ].map(c => (
              <div key={c.cert} className="cert-card">
                <div className="cert-top">
                  <span className="cert-name">{c.cert}</span>
                  <span className={`cert-status ${c.status === 'Active' ? 'cert-active' : 'cert-progress'}`}>
                    {c.status}
                  </span>
                </div>
                <p className="cert-scope">{c.scope}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Audit trail */}
        <section className="audit-section">
          <div className="audit-text">
            <h2>Immutable Audit Trail</h2>
            <p>
              Every inference is assigned a request ID, stamped with a Merkle root linking
              prompt → output → model weights → execution environment. Reconstructible, verifiable,
              and exportable as a signed PDF for regulatory submissions.
            </p>
            <ul className="audit-list">
              {[
                'SHA-256 hash of every prompt/output pair',
                'Model version pinning (SemVer + weight checksum)',
                'Execution environment snapshot (driver, kernel, CUDA)',
                'Signed attestations compatible with eDiscovery workflows',
                'Retention policy: 7 years (configurable per jurisdiction)',
              ].map(item => (
                <li key={item}><span className="list-check">✓</span> {item}</li>
              ))}
            </ul>
          </div>
          <div className="audit-terminal">
            <div className="code-dots">
              <span style={{ background: '#ff5f57' }} />
              <span style={{ background: '#febc2e' }} />
              <span style={{ background: '#28c840' }} />
              <span className="code-filename">audit_log.json</span>
            </div>
            <pre className="code-body small">{`{
  "request_id": "req_3f9a8b2c",
  "timestamp": "2024-11-14T09:22:11Z",
  "model": "stable-logic-1@v2.4.1",
  "prompt_hash": "sha256:a1b2c3...",
  "output_hash": "sha256:7e8f9a...",
  "weights_hash": "sha256:d4e5f6...",
  "env_snapshot": {
    "cuda": "12.3.2",
    "kernel": "5.15.0-91-generic",
    "gpu": "H100-SXM5-80GB"
  },
  "merkle_root": "sha256:0f1a2b...",
  "signature": "ed25519:9c8b7a..."
}`}</pre>
          </div>
        </section>

        {/* Verticals */}
        <section className="verticals">
          <h2>Industry Playbooks</h2>
          <div className="verticals-grid">
            {[
              {
                icon: '◈',
                sector: 'Financial Services',
                reqs: ['MiFID II explainability', 'SR 11-7 model risk', 'FINRA audit retention'],
                body: 'Trading desks and risk engines require provably identical model outputs for backtesting and regulatory review. Our audit trail integrates directly with Bloomberg and Refinitiv compliance workflows.',
              },
              {
                icon: '⬡',
                sector: 'Healthcare & Life Sciences',
                reqs: ['FDA 21 CFR Part 11', 'HIPAA ePHI', 'GxP validation'],
                body: 'Clinical decision support and drug discovery models must produce reproducible results for FDA submissions. Every inference in a validated workflow is permanently tied to model version and execution state.',
              },
              {
                icon: '◻',
                sector: 'Legal & Insurance',
                reqs: ['eDiscovery compatibility', 'AI Act compliance', 'Claims auditability'],
                body: 'Legal research and underwriting models face increasing regulatory scrutiny. Deterministic outputs mean consistent counsel and explainable risk scores — admissible in any jurisdiction.',
              },
            ].map(v => (
              <div key={v.sector} className="vertical-card">
                <span className="vertical-icon">{v.icon}</span>
                <h3>{v.sector}</h3>
                <div className="vertical-reqs">
                  {v.reqs.map(r => <span key={r} className="req-chip">{r}</span>)}
                </div>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="inline-cta">
          <div>
            <h3>Talk to our Compliance Team</h3>
            <p>We'll map your regulatory requirements to our audit capabilities in a 30-minute call.</p>
          </div>
          <button className="btn-primary">Book a Call</button>
        </section>
      </div>
    </div>
  )
}