import './style.css'

const deployBtn = document.getElementById('deploy-btn')
const whitepaperBtn = document.getElementById('whitepaper-btn')

const pages = {
  technology: `
    <h1>Technology</h1>
    <p>Placeholder page for technology content.</p>
  `,
  compliance: `
    <h1>Compliance</h1>
    <p>Placeholder page for compliance policies and documentation.</p>
  `,
  security: `
    <h1>Security</h1>
    <p>Placeholder page for security controls and monitoring.</p>
  `
};

deployBtn?.addEventListener('click', () => {
    triggerDownload('/files/bigidea.txt')
})

whitepaperBtn?.addEventListener('click', () => {
    triggerDownload('/files/bigidea.txt')
})

function triggerDownload(path) {
    const a = document.createElement('a')
    a.href = path
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

function navigate(page) {
  const app = document.getElementById("app");
  app.innerHTML = pages[page] || "<h1>Not Found</h1>";
  window.location.hash = page;
}

window.navigate = navigate;

// handle initial load
const initial = window.location.hash.replace("#", "") || "technology";
navigate(initial);