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
      <div className="padded-div">
        Add a new {props.plantTypeToAdd.name}
      </div>
      <div className="padded-div">
        <textarea
          value={plantName}
          rows={1}
          cols={34}
          maxLength={34}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => { setPlantName(event.target.value) }}
          placeholder="Enter name or leave blank..."
          className="userplant__name-edit-input"
        />
        <textarea
          value={plantNotes}
          rows={5}
          cols={34}
          maxLength={170}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => { setPlantNotes(event.target.value) }}
          placeholder="Enter notes or leave blank..."
          className="userplant__notes-edit-input"
        />
      </div>

      <div className="padded-div">
        <button
          className="button"
          onClick={() => { void submitCreateUserPlantRequest() }}>
          Add plant to collection
        </button>
      </div>
    </React.Fragment>
  )
}

export default AddPlant
