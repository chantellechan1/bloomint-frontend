import { type UserPlant } from '../models/PlantModels'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserPlantRow = (props: { userPlant: UserPlant, setUserPlantToEdit: (userPlantToEdit: UserPlant) => void }): JSX.Element => {
  /*
   * Displays a single row on the plants page with a small thumbnail
   */
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <li>
        <img
          src={`data:image/jpg;base64,${props.userPlant.encoded_thumbnail}`}
          alt=""
        />
        {props.userPlant.plant_name}
        {props.userPlant.notes !== null && (<><br/>{props.userPlant.notes}</>)}
        <button onClick={() => {
          props.setUserPlantToEdit(props.userPlant)
          // TODO: I don't like this relative path...
          // but this is called from ./plant_types page
          navigate('../edit_plant')
        }}>Edit</button>
      </li>
    </React.Fragment>
  )
}

export default UserPlantRow
