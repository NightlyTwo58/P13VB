export default function Technology({ navigate }) {
  return (
    <div className="page">
      <div className="page-hero">
        <span className="eyebrow">Under the Hood</span>
        <h1>The Architecture of Certainty</h1>
        <p>
          Determinism in neural networks isn't a configuration flag — it's a systems problem spanning
          hardware, compiler, runtime, and numerical precision. We solved all of it.
        </p>
      </div>

      <div className="page-content">
        {/* Stack diagram */}
        <section className="stack-diagram">
          <h2>The Deterministic Stack</h2>
          <p className="section-sub">
            Non-determinism enters at five distinct layers. We address each independently and in concert.
          </p>
          <div className="stack-layers">
            {[
              { label: 'Application Layer', status: 'sealed', note: 'Reproducible API contract with request fingerprinting' },
              { label: 'Inference Runtime', status: 'sealed', note: 'Custom CUDA kernel with locked op ordering' },
              { label: 'Floating-Point Unit', status: 'sealed', note: 'IEEE 754 strictness enforcement; no fast-math' },
              { label: 'Parallelism Engine', status: 'sealed', note: 'Deterministic NCCL collectives across N GPUs' },
              { label: 'Hardware Abstraction', status: 'sealed', note: 'Clock-locked execution; thermal throttle isolation' },
            ].map((layer, i) => (
              <div key={i} className="stack-layer">
                <div className="stack-index">{String(i + 1).padStart(2, '0')}</div>
                <div className="stack-info">
                  <span className="stack-label">{layer.label}</span>
                  <span className="stack-note">{layer.note}</span>
                </div>
                <div className="stack-status">✓ Sealed</div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep dives */}
        <section className="tech-cards">
          {[
            {
              title: 'Floating-Point Determinism',
              icon: '◈',
              body: `Modern GPUs process tensors in parallel across thousands of cores. The order in which floating-point additions occur affects results due to non-associativity — (a+b)+c ≠ a+(b+c) in float32. Our compiler enforces canonical operation ordering at the IR level, eliminating this source of variance entirely.`,
              tag: 'Numerical Precision',
            },
            {
              title: 'Multi-GPU Consistency',
              icon: '⬡',
              body: `Distributed inference compounds non-determinism: NCCL collectives use ring-reduce algorithms whose traversal order varies by cluster topology. We built a topology-invariant collective that produces identical reduction outputs regardless of GPU count, interconnect type, or node geography.`,
              tag: 'Distributed Systems',
            },
            {
              title: 'Thermal Isolation',
              icon: '◻',
              body: `Hardware frequency scaling (Turbo Boost, thermal throttling) introduces timing non-determinism that cascades into numerical differences. Our hypervisor layer pins execution frequency and routes thermal management out-of-band, keeping every inference cycle clock-locked.`,
              tag: 'Hardware Control',
            },
            {
              title: 'Request Fingerprinting',
              icon: '⌬',
              body: `Every inference request is assigned a deterministic fingerprint derived from model weights, prompt tokens, and execution context. This fingerprint is used to validate reproducibility post-hoc and serves as the root of a Merkle audit chain accessible via the Compliance API.`,
              tag: 'Auditability',
            },
          ].map(c => (
            <div key={c.title} className="tech-card">
              <div className="tech-card-header">
                <span className="tech-icon">{c.icon}</span>
                <span className="tech-tag">{c.tag}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </section>

        {/* Whitepaper CTA */}
        <section className="inline-cta">
          <div>
            <h3>Full Technical Whitepaper</h3>
            <p>42 pages covering kernel design, benchmarks, and formal correctness proofs.</p>
          </div>
          <button className="btn-primary">Download PDF</button>
        </section>

        {/* Benchmarks */}
        <section className="benchmarks">
          <h2>Overhead is negligible.</h2>
          <p className="section-sub">Determinism costs less than you think.</p>
          <div className="bench-grid">
            {[
              { label: 'Throughput impact', val: '−1.8%', note: 'vs. non-deterministic baseline' },
              { label: 'Latency added (P99)', val: '+1.4ms', note: 'across 10k inference samples' },
              { label: 'Memory overhead', val: '+0.3%', note: 'for op-ordering metadata' },
              { label: 'Variance confirmed', val: '0 bits', note: 'across 1M paired runs' },
            ].map(b => (
              <div key={b.label} className="bench-item">
                <span className="bench-val">{b.val}</span>
                <span className="bench-label">{b.label}</span>
                <span className="bench-note">{b.note}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}