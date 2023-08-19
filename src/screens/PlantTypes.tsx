import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as AxiosService from '../api/AxiosService'
import { type PlantType } from '../models/PlantModels'
import PlantTypeRow from '../components/PlantTypeRow'

const PlantTypes = (props: { setPlantTypeToAdd: (id: PlantType) => void }): JSX.Element => {
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([])

  // Get all planttypes from server
  useEffect(() => {
    const getPlantTypes = async (): Promise<void> => {
      await axios.get('/plants/plant_types/all', AxiosService.getOptionsAuthed()).then(
        (res) => {
          setPlantTypes(res.data)
        })
        .catch((res) => { setPlantTypes(res.data) }).catch((err) => { console.log(err) })
    }

    void getPlantTypes()
  }, [])

  const plantTypeRows =
    plantTypes.map(plantType =>
      <PlantTypeRow key={plantType.id.toString()} plantType={plantType} setPlantTypeToAdd={props.setPlantTypeToAdd}/>)

  return (
    <React.Fragment>
      <ul>{plantTypeRows}</ul>
    </React.Fragment>
  )
}

export default PlantTypes
