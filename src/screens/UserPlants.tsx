import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as AxiosService from '../api/AxiosService'
import { type UserPlant } from '../models/PlantModels'
import UserPlantRow from '../components/UserPlantRow'
import { useNavigate } from 'react-router-dom'

const UserPlants = (): JSX.Element => {
  const [userPlants, setUserPlants] = useState<UserPlant[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const getUserPlants = (): void => {
      // TODO: move this to api/servercalls for consistency
      axios.get('/plants/user/get_plants', AxiosService.getOptionsAuthed()).then(
        (res) => {
          setUserPlants(res.data)
        }).catch(
        (err) => { console.log(err) }
      )
    }

    getUserPlants()
  }, [])

  const userPlantRows = userPlants.map(userPlant => <UserPlantRow key={userPlant.id.toString()} userPlant={userPlant}/>)

  return (
    <React.Fragment>
      <ul>{userPlantRows}</ul>
      <button onClick={ () => { navigate('./plant_types') }}>+</button>
    </React.Fragment>
  )
}

export default UserPlants
