import React, { useEffect, useState } from 'react'
import { type PlantType } from '../models/PlantModels'
import PlantTypeRow from '../components/PlantTypeRow'
import { GetPlantTypes } from '../api/ServerCalls'

const PlantTypes = (props: { setPlantTypeToAdd: (id: PlantType) => void }): JSX.Element => {
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([])

  // Get all planttypes from server
  useEffect(() => {
    const getPlantTypes = async (): Promise<void> => {
      try {
        const plantTypes: PlantType[] = await GetPlantTypes()
        setPlantTypes(plantTypes)
      } catch (e) {
        console.error(e)
      }
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
