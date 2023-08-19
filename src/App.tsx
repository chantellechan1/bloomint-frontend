import React, { useState } from 'react'
import jwt_decode from 'jwt-decode'
import './App.css'
import HomeNavigation from './navigation/HomeNavigation'
import LoginNavigation from './navigation/LoginNavigation'

const App = (): JSX.Element => {
  /*
   * App figures out if the user is currently logged in,
   * and will either display a login page or the home page.
   */

  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'))

  const isLoggedIn = (token: string | null): boolean => {
    if (token === '' || token === null) {
      return false
    }
    try {
      // get jwt token exipry time in seconds
      // no idea why eslint thinks this is unneccesary
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const { exp } = jwt_decode(token) as {
        exp: number
      }

      // convert to milliseconds for comparison
      return exp * 1000 > Date.now()
    } catch (error) {
      // in case token is not set
      return false
    }
  }

  return (
    <React.Fragment>
      {isLoggedIn(userToken)
        ? (<HomeNavigation
          userToken={userToken}
          setUserToken={setUserToken}
        />)
        : (<LoginNavigation
          userToken={userToken}
          setUserToken={setUserToken}
        />
          )}
    </React.Fragment>
  )
}

export default App
