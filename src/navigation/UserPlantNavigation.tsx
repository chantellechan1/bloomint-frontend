import React, { useState } from 'react'
import { type PlantType } from '../models/PlantModels'
import PlantTypes from '../screens/PlantTypes'
import AddPlant from '../screens/AddPlant'
import UserPlants from '../screens/UserPlants'
import { Routes, Route } from 'react-router-dom'

const UserPlantNavigation = (): JSX.Element => {
  const [plantTypeToAdd, setPlantTypeToAdd] = useState<PlantType>()
  return (
    <React.Fragment>
      <Routes>
        <Route
          path=""
          element={<UserPlants />}
        />
        <Route
          path="plant_types"
          element={<PlantTypes setPlantTypeToAdd={setPlantTypeToAdd}/>}
        />
        <Route
          path="add_plant"
          element={<AddPlant plantTypeToAdd={plantTypeToAdd}/>}
        />
      </Routes>
    </React.Fragment>
  )
}

export default UserPlantNavigation
