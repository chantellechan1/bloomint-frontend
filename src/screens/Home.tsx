import React, { useState} from "react";
import BottomNavigationBar from "../components/BottomNavigationBar"

const Home = (props: {setUserToken: any}) => {
    const [selectedBottomNav, setSelectedBottomNav] = useState("tasks");

    return (
      <React.Fragment>

        {/* spacer for bottom nav bar */}
        <div style={{ height: "80px" }}></div>
        <BottomNavigationBar />
      </React.Fragment>
    )
};

export default Home;
