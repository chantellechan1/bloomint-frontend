import React from "react";

const Home = (props: any) => {

    const handleLogout = () => {
        localStorage.setItem('userToken', '');
        props.setUserToken(localStorage.getItem('userToken'));
    }

    return (
        <React.Fragment>
            Home component

        </React.Fragment>
    )
};

export default Home;