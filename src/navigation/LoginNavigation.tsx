import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Login from '../screens/Login'
import CreateAccount from '../screens/CreateAccount'

const LoginNavigation = (props: { setUserToken: any, userToken: string | null }): JSX.Element => {
  return (
  <React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login setUserToken={props.setUserToken} userToken={props.userToken}/>} />
        <Route path="create_account" element={<CreateAccount />} />
        <Route path="login"
          element={<Login setUserToken={props.setUserToken} userToken={props.userToken}/>} />
      </Routes>
    </BrowserRouter>
  </React.Fragment>
  )
}

export default LoginNavigation
