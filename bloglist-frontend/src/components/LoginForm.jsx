import { useState } from 'react'
import loginService from '../services/login'
import Input from '../components/Input'

const LoginForm = ({ onSuccess, onFailure }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const authenticateUser = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      onSuccess(user)
    } catch(exception) {
      onFailure(exception)
      setUsername('')
      setPassword('')
    }
  }

  return <form id='loginForm'>
    <div className='table'>
      <Input
        label='username:'
        name='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type='password'
        name='password'
        label='password:'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='footer-row'>
        <button id='login-button' onClick={authenticateUser}>login</button>
      </div>
    </div>
  </form>
}

export default LoginForm