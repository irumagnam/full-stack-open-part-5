import { useState } from 'react'
import session from '../services/login'
import Input from '../components/Input'

const LoginForm = ({ onSuccess, onFailure }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const authenticateUser = async (event) => {
    event.preventDefault()
    try {
      const user = await session.login({ username, password })
      onSuccess(user)
    } catch(exception) {
      onFailure(exception)
      setUsername('')
      setPassword('')
    }
  }

  if (session.getUser()) {
    return null
  }

  return <form>
    <div className="table">
      <Input
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="footer-row">
        <button id="login-button" onClick={authenticateUser}>login</button>
      </div>
    </div>
  </form>
}

export default LoginForm