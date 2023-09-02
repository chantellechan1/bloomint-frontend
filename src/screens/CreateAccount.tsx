import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { VerifyEmail } from '../api/ServerCalls'

const CreateAccount = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [errorText, setErrorText] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const handleCreateAccount = async (): Promise<void> => {
    try {
      await VerifyEmail({ email })
      setShowConfirm(true)
    } catch (error) {
      console.error(error)
      setErrorText('Account creation failed, check console for details.')
    }
  }

  return (
  <React.Fragment>
    <div
      className="login-wrapper">
      {
        errorText !== '' &&
        <div role="alert">
          {errorText}
        </div>
      }
      {
        showConfirm &&
        <div role="alert">
          Thanks for signing up! Please check your email for next steps.
        </div>
      }
      <div>
        <div className="task-top-decoration">
        </div>
        <form>
          <h2>Create New Account</h2>
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
          <br/>
          <button
            type="button"
            className="button login-button"
            onClick={() => { void handleCreateAccount() }}
          >
            Confirm Email
          </button>
          <Link
            className="button login-button"
            to="/">
            Go Back
          </Link>
        </form>
      </div>
    </div>
  </React.Fragment>
  )
}

export default CreateAccount
