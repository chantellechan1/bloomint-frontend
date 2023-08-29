import React, { useEffect, useState } from 'react'
import { GetUserPlants } from '../api/ServerCalls'
import { type UserPlant } from '../models/PlantModels'
import UserPlantRow from '../components/UserPlantRow'
import { useNavigate } from 'react-router-dom'

const UserPlants = (props: { setUserPlantToEdit: (userPlantToEdit: UserPlant) => void }): JSX.Element => {
  const [userPlants, setUserPlants] = useState<UserPlant[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const getUserPlants = async (): Promise<void> => {
      try {
        const userPlants: UserPlant[] = await GetUserPlants()
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
      <ul>{userPlantRows}</ul>
      <button onClick={ () => { navigate('./plant_types') }}>+</button>
    </React.Fragment>
  )
}

export default UserPlants
