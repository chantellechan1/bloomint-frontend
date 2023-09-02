import { type UserPlant } from '../models/PlantModels'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiEdit2Line } from 'react-icons/ri'

const UserPlantRow = (props: { userPlant: UserPlant, setUserPlantToEdit: (userPlantToEdit: UserPlant) => void }): JSX.Element => {
  /*
   * Displays a single row on the plants page with a small thumbnail
   */
  const navigate = useNavigate()

  return (
    <li className="tasks-list__row">
      <img
        src={`data:image/jpg;base64,${props.userPlant.encoded_thumbnail}`}
        alt=""
        className="round-thumbnail"
      />
      <div>
        <div className="tasks-list__description">
          {props.userPlant.plant_name}
        </div>
        <div className="tasks-list__notes">
          {props.userPlant.notes !== null && (<>{props.userPlant.notes}</>)}
        </div>
      </div>
      <button
        className="userplant__edit-button"
        onClick={() => {
          props.setUserPlantToEdit(props.userPlant)
          // TODO: I don't like this relative path...
          // but this is called from ./plant_types page
          navigate('../edit_plant')
        }}>
        <RiEdit2Line className="userplant__edit-button__icon"/>
      </button>
    </li>
  )
}

export default UserPlantRow
