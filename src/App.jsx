import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Technology from './pages/Technology'
import Compliance from './pages/Compliance.jsx'
import Security from './pages/Security'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthProvider, useAuth } from './hooks/useAuth'
import './App.css'

function AppInner() {
  const [page, setPage] = useState('home')
  const { user } = useAuth()

  const navigate = (p) => {
    setPage(p)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const handler = (e) => navigate(e.detail)
    window.addEventListener('navigate', handler)
    return () => window.removeEventListener('navigate', handler)
  }, [])

  const renderPage = () => {
    if (page === 'login') return <Login navigate={navigate} />
    if (page === 'dashboard') return user ? <Dashboard navigate={navigate} /> : <Login navigate={navigate} />
    if (page === 'technology') return <Technology navigate={navigate} />
    if (page === 'compliance') return <Compliance navigate={navigate} />
    if (page === 'security') return <Security navigate={navigate} />
    return <Home navigate={navigate} />
  }

  return (
    <div className="app">
      <div className="grid-bg" />
      {page !== 'login' && <Nav page={page} navigate={navigate} />}
      <main>{renderPage()}</main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  )
}