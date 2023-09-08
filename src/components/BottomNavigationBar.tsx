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
      <nav>
        <div className="bottom-navigation">
          <Link
            to="/tasks"
            aria-current="page"
            onClick={() => {
              setSelectedBottomNav('tasks')
            }}
          >
            <IconContext.Provider value={{ size: '2em' }}>
              <div className="bottom-navigation__button">
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
            onClick={() => {
              setSelectedBottomNav('user_plants')
            }}
          >
            <IconContext.Provider value={{ size: '2em' }}>
              <div className="bottom-navigation__button">
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
            onClick={() => {
              setSelectedBottomNav('settings')
            }}
          >
            <IconContext.Provider value={{ size: '2em' }}>
              <div className="bottom-navigation__button">
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
