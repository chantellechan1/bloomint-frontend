import React from "react";
import Tasks from "../screens/Tasks"
import Settings from "../screens/Settings"
import AddPlant from "../screens/AddPlant"
import BottomNavigationBar from "../components/BottomNavigationBar"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

const HomeNavigation = (props: {setUserToken: any, userToken: string | null}) => {
  return (
  <BrowserRouter>
    <Routes>
      {/* Set the default route to redirect to "/task" */}
      <Route
        path="*"
        element={<Navigate to="/tasks" replace />}
      />
      <Route
        path="/tasks"
        element={<Tasks />}
      />
      <Route
        path="/add_plant"
        element={<AddPlant />}
      />
      <Route
        path="/settings"
        element={
          <Settings
            setUserToken={props.setUserToken}
          />}
      />
    </Routes>

    {/* spacer for bottom nav bar */}
    <div style={{ height: "80px" }}></div>

		<BottomNavigationBar />
  </BrowserRouter>   
  );
};

export default HomeNavigation;
