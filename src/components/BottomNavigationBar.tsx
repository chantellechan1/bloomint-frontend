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
          to="/add_plant"
          className="nav-link"
          onClick={() => {
            setSelectedBottomNav('add_plant')
          }}
        >
          <IconContext.Provider value={{ size: '2em' }}>
            <div>
              {selectedBottomNav === 'add_plant'
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
  )
}

export default BottomNavigationBar
