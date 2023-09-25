import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { GetUser } from '../api/ServerCalls'
import { type User } from '../models/AuthModels'
import FoliageImage from '../assets/images/foliage.png'
import '../index.css'

const Settings = (props: { setUserToken: any }): JSX.Element => {
  const navigate = useNavigate()

  const handleLogout = (): void => {
    localStorage.setItem('userToken', '')
    props.setUserToken(localStorage.getItem('userToken'))

    // take us back to home page
    navigate('/')
  }

  const [userInfo, setUserInfo] = useState({ email: '', created_at: '' })

  useEffect(() => {
    const getUserInfo = async (): Promise<void> => {
      try {
        const user: User = await GetUser()

        setUserInfo(user)
      } catch (e) {
        console.log(e)
      }
    }

    void getUserInfo()
  }, [])

  return (
    <React.Fragment>
      <img
        className="task-top-decoration"
        src={FoliageImage} />
      <div className="padded-div">
        <h1>Settings</h1>
      </div>
      <div className="padded-div">
        {/* TODO: implement get user information function */}
        <h3>{userInfo.email}</h3>
        Joined Bloomint:
        <br />
        {userInfo.created_at}
      </div>
      <div className="padded-div">
        <button className="button" onClick={() => { handleLogout() }}>
          <RiLogoutBoxLine /> Log out
        </button>
      </div>
    </React.Fragment>
  )
}

export default Settings
