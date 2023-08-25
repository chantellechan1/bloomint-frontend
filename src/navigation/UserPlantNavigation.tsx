import React, { useState } from 'react'
import { type UserPlant, type PlantType } from '../models/PlantModels'
import PlantTypes from '../screens/PlantTypes'
import AddPlant from '../screens/AddPlant'
import UserPlants from '../screens/UserPlants'
import EditPlant from '../screens/EditPlant'
import { Routes, Route } from 'react-router-dom'

const UserPlantNavigation = (): JSX.Element => {
  const [plantTypeToAdd, setPlantTypeToAdd] = useState<PlantType>()
  const [userPlantToEdit, setUserPlantToEdit] = useState<UserPlant>()
  return (
    <React.Fragment>
      <Routes>
        <Route
          path=""
          element={<UserPlants setUserPlantToEdit={setUserPlantToEdit}/>}
        />
        <Route
          path="plant_types"
          element={<PlantTypes setPlantTypeToAdd={setPlantTypeToAdd}/>}
        />
        <Route
          path="add_plant"
          element={<AddPlant plantTypeToAdd={plantTypeToAdd}/>}
        />
        <Route
          path="edit_plant"
          element={<EditPlant userPlantToEdit={userPlantToEdit}/>}
        />
      </Routes>
    </React.Fragment>
  )
}

export default UserPlantNavigation
