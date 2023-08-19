import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'
import {
  RiPlantFill,
  RiPlantLine,
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
  RiSettings4Line,
  RiSettings4Fill
} from 'react-icons/ri'

const BottomNavigationBar = (): JSX.Element => {
  const [selectedBottomNav, setSelectedBottomNav] = useState('tasks')

  return (
    <React.Fragment>
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <div className="container-fluid">
          <Link
            to="/tasks"
            className="nav-link active"
            aria-current="page"
            onClick={() => {
              setSelectedBottomNav('tasks')
            }}
          >
            <IconContext.Provider value={{ size: '2em' }}>
              <div>
                {selectedBottomNav === 'tasks'
                  ? (
                  <RiCheckboxCircleFill />
                    )
                  : (
                  <RiCheckboxCircleLine />
                    )}
              </div>
            </IconContext.Provider>
          </Link>

          <Link
            to="/user_plants"
            className="nav-link"
            onClick={() => {
              setSelectedBottomNav('user_plants')
            }}
          >
            <IconContext.Provider value={{ size: '2em' }}>
              <div>
                {selectedBottomNav === 'user_plants'
                  ? (
                  <RiPlantFill />
                    )
                  : (
                  <RiPlantLine />
                    )}
              </div>
            </IconContext.Provider>
          </Link>

          <Link
            to="/settings"
            className="nav-link"
            onClick={() => {
              setSelectedBottomNav('settings')
            }}
          >
            <IconContext.Provider value={{ size: '2em' }}>
              <div>
                {selectedBottomNav === 'settings'
                  ? (
                  <RiSettings4Fill />
                    )
                  : (
                  <RiSettings4Line />
                    )}
              </div>
            </IconContext.Provider>
          </Link>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default BottomNavigationBar
