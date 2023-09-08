import React, { useState } from 'react'
import { Login as ServerLogin } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import FoliageImage from '../assets/images/foliage.png'

const ErrorMessage = (props: { loginErr: string }): JSX.Element => {
  return (
    <React.Fragment>
      <div className="" role="alert">
        {props.loginErr}
      </div>
    </React.Fragment>
  )
}

const Login = (props: { setUserToken: any, userToken: string | null }): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPw] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (): Promise<void> => {
    try {
      // attempt login
      const { jwt } = await ServerLogin({ email, password })

      // store user token in local storage
      localStorage.setItem('userToken', jwt)
      props.setUserToken(localStorage.getItem('userToken'))
    } catch (error) {
      console.error(error)
      setLoginErr('Error Logging In: ' + (error as Error).toString())
    }
  }

  const handleCreateAccount = async (): Promise<void> => {
    navigate('/create_account')
  }

  return (
  <React.Fragment>
    {
      loginErr !== '' && <ErrorMessage loginErr={loginErr} />
    }
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
