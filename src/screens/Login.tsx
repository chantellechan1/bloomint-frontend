import React, { useState } from 'react'
import { Login as ServerLogin } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import FoliageImage from '../assets/images/foliage.png'
import { notify } from '../utils/Utils'

const Login = (props: { setUserToken: any, userToken: string | null }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPw] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (): Promise<void> => {
    try {
      // attempt login
      const { jwt } = await ServerLogin({ email, password })

      // store user token in local storage
      localStorage.setItem('userToken', jwt)
      props.setUserToken(localStorage.getItem('userToken'))
    } catch (error) {
      await notify('Failed to log in, please try again')
    }
  }

  const handleCreateAccount = async (): Promise<void> => {
    navigate('/create_account')
  }

  return (
  <React.Fragment>
    <img
      className="task-top-decoration"
      src={FoliageImage} />
    <div
      className="login-wrapper">
      <form>
        <h2>Sign In</h2>
        <br/>
        <div>
          <input
            type="email"
            className="input login-input"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </div>
        <div>
          <input
            type="password"
            className="input login-input"
            placeholder="password"
            value={password}
            onChange={(e) => { setPw(e.target.value) }}
          />
        </div>
        <br/>
        <button
          type="button"
          className="button login-button"
          onClick={() => { void handleLogin() }}
          >
          Sign In
        </button>
        <div>
          <button
            type="button"
            className="button login-button"
            onClick={() => { void handleCreateAccount() }}
            >
            Create Account
          </button>
        </div>
      </form>
    </div>
  </React.Fragment>
  )
}

export default Login
