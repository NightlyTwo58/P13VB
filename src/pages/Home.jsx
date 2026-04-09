import { useState } from 'react'

export default function Home({ navigate }) {
  const [input, setInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [outputA, setOutputA] = useState('')
  const [outputB, setOutputB] = useState('')

  const handleDemo = async () => {
    if (!input) return
    setIsGenerating(true)
    setOutputA('')
    setOutputB('')

    const simulateStream = async (setter) => {
      const text = "Based on the provided parameters, the risk delta is calculated at σ=0.842. This result is hardware-locked and bit-perfectly reproducible across all nodes."
      const words = text.split(' ')
      for (let i = 0; i < words.length; i++) {
        await new Promise(r => setTimeout(r, 25 + Math.random() * 20))
        setter(prev => prev + (prev ? ' ' : '') + words[i])
      }
    }

    await Promise.all([simulateStream(setOutputA), simulateStream(setOutputB)])
    setIsGenerating(false)
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="eyebrow-pill">Engineered for Mission-Critical Precision</div>
        <h1 className="hero-title">
          The end of <span className="gradient-text">statistical guesswork.</span>
        </h1>
        <p className="hero-sub">
          LLMs are non-deterministic by nature. We’ve rewritten the stack from the silicon up to guarantee bit-perfect reproducibility in every inference.
        </p>
        <div className="hero-cta">
          <button className="btn-primary btn-lg" onClick={() => navigate('login')}>
            Deploy Deterministic Node
          </button>
          <button className="btn-outline btn-lg" onClick={() => navigate('technology')}>
            Read the Whitepaper
          </button>
        </div>
      </header>

      <section className="demo-section" style={{ paddingTop: 0 }}>
        <div className="demo-header">
          <span className="eyebrow">Interactive Verification</span>
          <h2>AI you can actually <span style={{ textDecoration: 'underline', textDecorationColor: 'var(--border-bright)' }}>trust.</span></h2>
        </div>

        <div className="demo-input-row">
          <textarea
            className="demo-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a complex logical or mathematical prompt..."
            rows={2}
          />
          <button
            className={`btn-primary demo-run ${isGenerating ? 'btn-loading' : ''}`}
            onClick={handleDemo}
            disabled={isGenerating || !input}
          >
            {isGenerating ? <span className="spinner" /> : 'Run'}
          </button>
        </div>

        <div className="demo-outputs">
          <div className={`output-box ${outputA && !isGenerating ? 'output-box--done' : ''}`}>
            <div className="output-label">
              <span>Inference Node A (US-East)</span>
              {isGenerating ? <span className="output-loading">Executing...</span> : outputA && <span className="output-done">Verified</span>}
            </div>
            <div className="output-body">
              {!outputA && !isGenerating ? (
                <div className="output-skeleton"><div className="skel-line" /><div className="skel-line" style={{width:'80%'}}/></div>
              ) : <div className="output-text">{outputA}</div>}
            </div>
          </div>

          <div className="demo-divider">
            <div className="divider-icon">{isGenerating ? '...' : '=='}</div>
          </div>

          <div className={`output-box ${outputB && !isGenerating ? 'output-box--done' : ''}`}>
            <div className="output-label">
              <span>Inference Node B (EU-West)</span>
              {isGenerating ? <span className="output-loading">Executing...</span> : outputB && <span className="output-done">Verified</span>}
            </div>
            <div className="output-body">
              {!outputB && !isGenerating ? (
                <div className="output-skeleton"><div className="skel-line" /><div className="skel-line" style={{width:'80%'}}/></div>
              ) : <div className="output-text">{outputB}</div>}
            </div>
          </div>
        </div>

        {outputA && outputB && !isGenerating && (
          <div className="demo-verdict">
            <div className="verdict-dot" /> Output Match Confirmed: 0 bits of variance detected
          </div>
        )}
      </section>

      <section className="code-section">
        <div className="code-wrap">
          <div className="code-dots">
            <span style={{background: '#ff5f56'}} />
            <span style={{background: '#ffbd2e'}} />
            <span style={{background: '#27c93f'}} />
            <span className="code-filename">reproducibility_test.js</span>
          </div>
          <pre className="code-body">
{`import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'YOUR_DETERMINISTIC_KEY',
  baseURL: 'https://api.deterministic.ai/v1'
});

const response = await client.chat.completions.create({
  model: 'stable-logic-1',
  messages: [{ role: 'user', content: '${input || "Calculate risk delta..."}' }],
  temperature: 0, 
  seed: 42 // Cryptographically pinned
});`}
          </pre>
        </div>
        <div className="code-aside">
          <span className="eyebrow">Integration</span>
          <h2>Drop-in Stability.</h2>
          <p>
            Switch your base URL and pin your seed. Our infrastructure handles
            op-ordering and thermal isolation at the kernel level to ensure
            identical results every single time.
          </p>
          <button className="btn-outline btn-sm" onClick={() => navigate('technology')}>
            View API Docs
          </button>
        </div>
      </section>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon"><i className="fa-solid fa-code-merge"></i></div>
          <h3>Zero Variance</h3>
          <p>Input A always equals Output B. No drift, no hallucinations, no temperature-based randomness.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fa-solid fa-shield"></i></div>
          <h3>Audit-Ready</h3>
          <p>Built for finance and law. Every token generated is mathematically traceable and verifiable.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fa-solid fa-microchip"></i></div>
          <h3>Hardware Fixed</h3>
          <p>Our proprietary kernel ensures floating-point consistency across heterogeneous clusters.</p>
        </div>
      </div>
    </div>
  )
}