import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { VerifyEmail, type GenericResponse } from '../api/ServerCalls'
import FoliageImage from '../assets/images/foliage.png'
import { notify } from '../utils/Utils'

const CreateAccount = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleCreateAccount = async (): Promise<void> => {
    const response: GenericResponse = await VerifyEmail({ email })
    if (response.status === 'success') {
      await notify('Thanks for signing up! Please check your email for next steps.')
    } else if (response.status === 'error') {
      await notify(response.error)
    }
    navigate('/')
  }

  return (
  <React.Fragment>
    <img
      className="task-top-decoration"
      src={FoliageImage} />
    <div
      className="login-wrapper">
      <div>
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
