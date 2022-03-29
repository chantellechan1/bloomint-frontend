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
    RiSettings4Line, RiSettings4Fill,
} from "react-icons/ri";
import { IconContext } from "react-icons";

import './App.css';

import Login from './components/Login';
import PlantTypes from './components/PlantTypes';
import PlantsAll from './components/PlantsAll';
import Settings from './components/Settings';
import PlantsInType from './components/PlantsInType';
import PlantIndividual from './components/PlantIndividual';
import PlantIndividualEdit from './components/PlantIndividualEdit';

function App() {

    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [selectedBottomNav, setSelectedBottomNav] = useState('plantsByType');

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
            <Router>
                <Routes>
                    <Route path="/" element={<PlantTypes />} />
                    <Route path="/plants_by_type" element={<PlantTypes />} />
                    <Route path="/plants_by_type/:plantTypeID" element={<PlantsInType />} />
                    <Route path="/plant/:plantID" element={<PlantIndividual />} />
                    <Route path="/plant/:plantID/edit" element={<PlantIndividualEdit />} />
                    <Route path="/all_plants" element={<PlantsAll />} />
                    <Route path="/settings" element={<Settings handleLogout={handleLogout}/>} />
                </Routes>

                {/* spacer for bottom nav bar */}
                <div style={{ height: '80px' }}></div>

                {/* bottom nav bar */}
                <nav className="navbar fixed-bottom navbar-light bg-light">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand"
                            onClick={() => {
                                setSelectedBottomNav('plantsByType')
                            }}
                        >
                            Bloom
                        </Link>
                        <Link to="/plants_by_type" className="nav-link active" aria-current="page"
                            onClick={() => {
                                setSelectedBottomNav('plantsByType')
                            }}
                        >
                            <IconContext.Provider value={{ size: "2em" }}>
                                <div>
                                    {
                                        selectedBottomNav === 'plantsByType'
                                            ?
                                            <RiLeafFill />
                                            :
                                            <RiLeafLine />
                                    }
                                </div>
                            </IconContext.Provider>
                        </Link>
                        <Link to="/all_plants" className="nav-link"
                            onClick={() => {
                                setSelectedBottomNav('allPlants')
                            }}
                        >
                            <IconContext.Provider value={{ size: "2em" }}>
                                <div>
                                    {
                                        selectedBottomNav === 'allPlants'
                                            ?
                                            <RiPlantFill />
                                            :
                                            <RiPlantLine />
                                    }
                                </div>
                            </IconContext.Provider>
                        </Link>
                        <Link to="/settings" className="nav-link"
                            onClick={() => {
                                setSelectedBottomNav('settings')
                            }}
                        >
                            <IconContext.Provider value={{ size: "2em" }}>
                                <div>
                                    {
                                        selectedBottomNav === 'settings'
                                            ?
                                            <RiSettings4Fill />
                                            :
                                            <RiSettings4Line />
                                    }
                                </div>
                            </IconContext.Provider>
                        </Link>
                    </div>
                </nav>
            </Router>
        </div>
    );
}

export default App;
