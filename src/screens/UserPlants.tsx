import React, { useEffect, useState } from 'react'
import { GetUserPlants } from '../api/ServerCalls'
import { type UserPlant } from '../models/PlantModels'
import UserPlantRow from '../components/UserPlantRow'
import { useNavigate } from 'react-router-dom'
import { RiAddLine } from 'react-icons/ri'
import FoliageImage from '../assets/images/foliage.png'
import Loading from '../components/Loading'

const UserPlants = (props: { setUserPlantToEdit: (userPlantToEdit: UserPlant) => void }): JSX.Element => {
  const [userPlants, setUserPlants] = useState<UserPlant[]>([])
  const [loadedUserPlantsFromServer, setLoadedUserPlantsFromServer] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getUserPlants = async (): Promise<void> => {
      try {
        const userPlants: UserPlant[] = await GetUserPlants()
        setLoadedUserPlantsFromServer(true)
        setUserPlants(userPlants)
      } catch (e) {
        console.error(e)
      }
    }

    void getUserPlants()
  }, [])

  const userPlantRows = userPlants.map(userPlant => <UserPlantRow key={userPlant.id.toString()} userPlant={userPlant} setUserPlantToEdit={props.setUserPlantToEdit}/>)

  return (
    <React.Fragment>
      <img
        className="task-top-decoration"
        src={FoliageImage} />
      <div className="padded-div">
        <p>My plants</p>
      </div>
      {loadedUserPlantsFromServer
        ? (<ul className="userplant__row-container">{userPlantRows}</ul>)
        : (<div className="centered-div userplant__row-container"><Loading/></div>)
      }
      <button
        className="userplant__add-button"
        onClick={ () => { navigate('./plant_types') }}>
        <RiAddLine
          className="userplant__add-button__plus"/>
      </button>
    </React.Fragment>
  )
}

export default UserPlants
