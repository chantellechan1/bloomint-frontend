import { type UserPlant } from '../models/PlantModels'
import React from 'react'

const UserPlantRow = (props: { userPlant: UserPlant }): JSX.Element => {
  /*
   * Displays a single row on the plants page with a small thumbnail
   */

  return (
    <React.Fragment>
      <li>
        <img
          src={`data:image/jpg;base64,${props.userPlant.encoded_thumbnail}`}
          alt=""
        />
        {props.userPlant.plant_name}
        {props.userPlant.notes !== null && (<><br/>{props.userPlant.notes}</>)}
      </li>
    </React.Fragment>
  )
}

export default UserPlantRow
