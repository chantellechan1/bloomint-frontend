import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import jwt_decode from "jwt-decode";

import {
    RiPlantFill, RiPlantLine,
    RiLeafLine, RiLeafFill,
    RiSettings4Line,
    RiLogoutBoxLine
} from "react-icons/ri";
import { IconContext } from "react-icons";

import logo from './logo.svg';
import './App.css';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PlantTypes from './components/PlantTypes/PlantTypes';
import PlantsAll from './components/PlantsAll/PlantsAll';
import Settings from './components/Settings/Settings';

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

    const handleLogout = () => {
        localStorage.setItem('userToken', '');
        setUserToken(localStorage.getItem('userToken'));
    }

    if (checkLoggedIn() === false) {
        return <Login userToken={userToken} setUserToken={setUserToken} />
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
                    <Route path="/plants_by_type/*" element={<PlantTypes />} />
                    <Route path="/all_plants" element={<PlantsAll />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>

                {/* spacer for bottom nav bar */}
                <div style={{height: '80px'}}></div>
                {/* bottom nav bar */}
                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">Bloomint</Link>
                        <Link to="/plants_by_type" className="nav-link active" aria-current="page">
                            <IconContext.Provider value={{ size: "2em" }}>
                                <div>
                                    <RiLeafFill />
                                </div>
                            </IconContext.Provider>
                        </Link>
                        <Link to="/all_plants" className="nav-link">
                            <IconContext.Provider value={{ size: "2em" }}>
                                <div>
                                    <RiPlantLine />
                                </div>
                            </IconContext.Provider>
                        </Link>
                        <Link to="/settings" className="nav-link">
                            <IconContext.Provider value={{ size: "2em" }}>
                                <div>
                                    <RiSettings4Line />
                                </div>
                            </IconContext.Provider>
                        </Link>
                        <button className="btn btn-outline-primary" onClick={() => { handleLogout() }}>
                            <IconContext.Provider value={{ size: "2em" }}>
                                <div>
                                    <RiLogoutBoxLine />
                                </div>
                            </IconContext.Provider>
                        </button>
                    </div>
                </nav>
            </Router>
        </div>
    );
}

export default App;
