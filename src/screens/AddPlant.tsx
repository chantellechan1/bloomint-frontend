import React, { useState } from 'react'
import { type PlantType } from '../models/PlantModels'
import { type CreateUserPlantRequest, CreateUserPlant } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'

const AddPlant = (props: { plantTypeToAdd: PlantType }): JSX.Element => {
  const [plantName, setPlantName] = useState<string>('')
  const [plantNotes, setPlantNotes] = useState<string>('')
  const navigate = useNavigate()

  const submitCreateUserPlantRequest = async (): Promise<void> => {
    const createUserPlantRequest: CreateUserPlantRequest = {
      planttype_id: props.plantTypeToAdd.id,
      plant_name: plantName,
      notes: plantNotes
    }

    await CreateUserPlant(createUserPlantRequest)
    navigate('/user_plants')
  }

  return (
    <React.Fragment>
      Add a new {props.plantTypeToAdd.name}
      <input
        type="text"
        value={plantName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { setPlantName(event.target.value) }}
        placeholder="Enter name or leave blank..."
      />
      <input
        type="text"
        value={plantNotes}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { setPlantNotes(event.target.value) }}
        placeholder="Enter notes or leave blank..."
      />

      <button onClick={() => { void submitCreateUserPlantRequest() }}>
        Add
      </button>
    </React.Fragment>
  )
}

export default AddPlant
