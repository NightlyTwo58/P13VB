export default function Security({ navigate }) {
  return (
    <div className="page">
      <div className="page-hero">
        <span className="eyebrow">Zero Trust. Always.</span>
        <h1>Security by<br />construction.</h1>
        <p>
          Determinism and security are co-dependent properties. A model that can be made
          non-deterministic can be coerced. We close that attack surface entirely.
        </p>
      </div>

      <div className="page-content">
        {/* Threat model */}
        <section className="threat-section">
          <h2>Threat Model</h2>
          <p className="section-sub">We design against adversaries, not just accidents.</p>
          <div className="threats-grid">
            {[
              {
                threat: 'Prompt Injection',
                vector: 'Input manipulation',
                mitigation: 'Structural prompt hashing; any injection alters the fingerprint and triggers a hold.',
                severity: 'Critical',
              },
              {
                threat: 'Model Weight Tampering',
                vector: 'Supply chain',
                mitigation: 'Weight checksums are stored in an air-gapped HSM and verified on every load.',
                severity: 'Critical',
              },
              {
                threat: 'Output Spoofing',
                vector: 'MITM / API interception',
                mitigation: 'Every response is signed with Ed25519. Clients verify before consuming output.',
                severity: 'High',
              },
              {
                threat: 'Non-Deterministic Coercion',
                vector: 'Adversarial temperature manipulation',
                mitigation: 'Temperature parameter is compile-time constant. No runtime override is possible.',
                severity: 'High',
              },
              {
                threat: 'Data Exfiltration via Inference',
                vector: 'Side-channel timing attacks',
                mitigation: 'Fixed-latency inference pipeline. All outputs are constant-time with respect to input length.',
                severity: 'Medium',
              },
              {
                threat: 'Replay Attacks',
                vector: 'Request replay',
                mitigation: 'Request IDs are time-bound. Duplicate fingerprints within a 30s window are rejected.',
                severity: 'Medium',
              },
            ].map(t => (
              <div key={t.threat} className="threat-card">
                <div className="threat-header">
                  <span className="threat-name">{t.threat}</span>
                  <span className={`threat-sev sev-${t.severity.toLowerCase()}`}>{t.severity}</span>
                </div>
                <span className="threat-vector">Vector: {t.vector}</span>
                <p className="threat-mit">{t.mitigation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Infrastructure */}
        <section className="infra-section">
          <h2>Infrastructure Controls</h2>
          <div className="infra-list">
            {[
              ['Network', [
                'Single-tenant VPC with no shared compute',
                'Egress-only internet access from inference nodes',
                'mTLS on all internal service calls',
                'Hardware firewall at hypervisor boundary',
              ]],
              ['Data', [
                'Prompts encrypted at rest (AES-256-GCM)',
                'Zero-retention option: prompts never touch disk',
                'Customer-managed KMS keys (AWS/GCP/Azure)',
                'Audit logs stored in write-once S3 with WORM',
              ]],
              ['Access', [
                'RBAC with least-privilege defaults',
                'Hardware MFA enforced for all human access',
                'Privileged access workstations (PAW) for infra ops',
                'Session recordings for all admin access',
              ]],
            ].map(([category, items]) => (
              <div key={category} className="infra-category">
                <h3 className="infra-cat-title">{category}</h3>
                <ul>
                  {items.map(item => (
                    <li key={item}><span className="list-check">✓</span> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pentest / bug bounty */}
        <section className="pentest-section">
          <div className="pentest-card">
            <div>
              <h3>Bug Bounty Program</h3>
              <p>
                We run a continuous bug bounty via HackerOne. Critical findings — especially
                anything that induces non-determinism — are eligible for awards up to $50,000.
              </p>
            </div>
            <div className="pentest-awards">
              {[
                { label: 'Critical', amt: 'Up to $50k' },
                { label: 'High', amt: 'Up to $15k' },
                { label: 'Medium', amt: 'Up to $5k' },
              ].map(a => (
                <div key={a.label} className="pentest-tier">
                  <span className={`threat-sev sev-${a.label.toLowerCase()}`}>{a.label}</span>
                  <span className="pentest-amt">{a.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="inline-cta">
          <div>
            <h3>Security Review Package</h3>
            <p>Pen test reports, CVE history, and architecture diagrams — available under NDA.</p>
          </div>
          <button className="btn-primary">Request Package</button>
        </section>
      </div>
    </div>
  )
}