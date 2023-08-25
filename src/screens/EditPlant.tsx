import React, { useEffect, useState } from 'react'
import { type UserPlant } from '../models/PlantModels'
import { type EditUserPlantRequest, EditUserPlant } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'

const EditPlant = (props: { userPlantToEdit: UserPlant }): JSX.Element => {
  const [plantName, setPlantName] = useState<string>('')
  const [plantNotes, setPlantNotes] = useState<string>('')
  const navigate = useNavigate()

  const submitEditUserPlantRequest = async (): Promise<void> => {
    const editUserPlantRequest: EditUserPlantRequest = {
      id: props.userPlantToEdit.id,
      planttype_id: props.userPlantToEdit.planttype_id,
      plant_name: plantName,
      notes: plantNotes
    }

    await EditUserPlant(editUserPlantRequest)
    navigate('/user_plants')
  }

  useEffect(() => {
    setPlantName(props.userPlantToEdit.plant_name)
    // if I fix this by adding !== null,
    // then typscript gives me an error on the setPlantNotes that I can't use
    // a variable of type string | undefined. If i use the ! to tell the compiler
    // that this is never undefined, then eslint complains that I shouldnt use !
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (props.userPlantToEdit.notes) {
      setPlantNotes(props.userPlantToEdit.notes)
    }
  }, [])

  return (
    <React.Fragment>
      Edit {props.userPlantToEdit.plant_name}
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

      <button onClick={() => { void submitEditUserPlantRequest() }}>
        Update
      </button>
    </React.Fragment>
  )
}

export default EditPlant
