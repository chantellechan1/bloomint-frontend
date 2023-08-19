import React from 'react'
import BottomNavigationBar from '../components/BottomNavigationBar'

const Home = (): JSX.Element => {
  return (
    <React.Fragment>
      {/* spacer for bottom nav bar */}
      <div style={{ height: '80px' }}></div>
      <BottomNavigationBar />
    </React.Fragment>
  )
}

export default Home
