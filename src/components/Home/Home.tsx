import React from "react";

const Home = (props: any) => {

    const handleLogout = () => {
        localStorage.setItem('userToken', '');
        props.setUserToken(localStorage.getItem('userToken'));
    }

    return (
        <React.Fragment>
            Home component


            <nav className="navbar fixed-bottom navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    <a className="nav-link" href="#">Link</a>
                    <button className="btn btn-outline-primary" onClick={() => { handleLogout() }}>Logout</button>
                </div>
            </nav>
        </React.Fragment>
    )
};

export default Home;