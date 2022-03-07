import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import jwt_decode from "jwt-decode";

import logo from './logo.svg';
import './App.css';

import Home from './components/Home/Home';
import Login from './components/Login/Login';

function App() {

  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));

  const isExpired = (token: string): boolean => {

    try {
      // get jwt token exipry time in seconds
      const { exp } = jwt_decode(token) as {
        exp: number;
      };

      // convert to milliseconds for comparison
      return exp * 1000 < Date.now()
    } catch (error) {
      // in case token is not set
      return true;
    }

  }

  const checkLoggedIn = (): boolean => {
    if (userToken === '' || userToken === null || isExpired(userToken)) {
      return false;
    } else {
      return true;
    }
  }

  if (checkLoggedIn() === false) {
    return <Login userToken={userToken} setUserToken={setUserToken}/>
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        App Header
      </header> */}

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login userToken={userToken} setUserToken={setUserToken}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
