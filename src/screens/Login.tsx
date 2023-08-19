import React, { useState } from 'react'
import { Login as ServerLogin } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'

const ErrorMessage = (props: any): JSX.Element => {
  return (
    <React.Fragment>
      <div className="alert alert-danger mb-3" role="alert">
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
    <div className="text-center mt-5 pt-5 px-5">
      <div className="col-xs-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
        <form>
        <h1 className="h3 mb-3 fw-normal">Sign In Page</h1>
        <div className="form-floating mb-3">
          <input
          type="email" className="form-control" id="floatingInput" placeholder="name@email.com"
          value={email} onChange={(e) => { setEmail(e.target.value) }}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
          type="password" className="form-control" id="floatingPassword" placeholder="password"
          value={password} onChange={(e) => { setPw(e.target.value) }}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          type="button" className="w-100 btn btn-outline-primary"
          onClick={() => { void handleLogin() }}
          >
          Sign In
        </button>
        </form>
      </div>
      <div className="col-xs-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4 mt-3">
        <button
          type="button" className="w-100 btn btn-outline-primary"
          onClick={() => { void handleCreateAccount() }}
          >
          Create Account
        </button>
      </div>
    </div>
  </React.Fragment>
  )
}

export default Login
