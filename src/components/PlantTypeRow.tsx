import { type PlantType } from '../models/PlantModels'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PlantTypeRow = (props: { plantType: PlantType, setPlantTypeToAdd: (id: PlantType) => void }): JSX.Element => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <li>
        <img
          src={`data:image/jpg;base64,${props.plantType.encoded_thumbnail}`}
          alt=""
        />
        {props.plantType.name}
        <button onClick={() => {
          props.setPlantTypeToAdd(props.plantType)
          // TODO: I don't like this relative path...
          // but this is called from ./plant_types page
          navigate('../add_plant')
        }}></button>
      </li>
    </React.Fragment>
  )
}

export default PlantTypeRow
