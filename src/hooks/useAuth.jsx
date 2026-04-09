import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock user database — swap for real API calls
const MOCK_USERS = {
  'demo@deterministicai.com': { password: 'demo1234', name: 'Demo User', tier: 'Pro', apiKey: 'dai-sk-••••••••••••••••3f9a' },
  'admin@deterministicai.com': { password: 'admin1234', name: 'Admin', tier: 'Enterprise', apiKey: 'dai-sk-••••••••••••••••7b2c' },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const login = (email, password) => {
    const record = MOCK_USERS[email]
    if (record && record.password === password) {
      setUser({ email, name: record.name, tier: record.tier, apiKey: record.apiKey })
      setError(null)
      return true
    }
    setError('Invalid credentials.')
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}