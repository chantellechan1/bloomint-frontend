import React from 'react'
import Tasks from '../screens/Tasks'
import Settings from '../screens/Settings'
import UserPlantNavigation from '../navigation/UserPlantNavigation'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

const HomeNavigation = (props: { setUserToken: any, userToken: string | null }): JSX.Element => {
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
        path="/user_plants/*"
        element={<UserPlantNavigation />}
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
    <div style={{ height: '80px' }}></div>

    <BottomNavigationBar />
  </BrowserRouter>
  )
}

export default HomeNavigation
