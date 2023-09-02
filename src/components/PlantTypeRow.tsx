import { type PlantType } from '../models/PlantModels'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiAddLine } from 'react-icons/ri'

const PlantTypeRow = (props: { plantType: PlantType, setPlantTypeToAdd: (id: PlantType) => void }): JSX.Element => {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <li className="tasks-list__row">
        <img
          src={`data:image/jpg;base64,${props.plantType.encoded_thumbnail}`}
          alt=""
          className="round-thumbnail tasks-list__plant-image"
        />
        <div className="tasks-list__description">
          {props.plantType.name}
        </div>
        <button
          className="plant-type__add-button"
          onClick={() => {
            props.setPlantTypeToAdd(props.plantType)
            // TODO: I don't like this relative path...
            // but this is called from ./plant_types page
            navigate('../add_plant')
          }}>
          <RiAddLine
            className="plant-type__add-button__plus"/>
        </button>
      </li>
    </React.Fragment>
  )
}

export default PlantTypeRow
