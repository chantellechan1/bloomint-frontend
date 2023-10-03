import React, { useEffect, useState } from 'react'
import { type PlantType } from '../models/PlantModels'
import PlantTypeRow from '../components/PlantTypeRow'
import { GetPlantTypes } from '../api/ServerCalls'
import Loading from '../components/Loading'

const PlantTypes = (props: { setPlantTypeToAdd: (id: PlantType) => void }): JSX.Element => {
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([])
  const [loadedPlantTypesFromServer, setLoadedPlantTypesFromServer] = useState<boolean>(false)

  // Get all planttypes from server
  useEffect(() => {
    const getPlantTypes = async (): Promise<void> => {
      try {
        const plantTypes: PlantType[] = await GetPlantTypes()
        setPlantTypes(plantTypes)
        setLoadedPlantTypesFromServer(true)
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
      <div className="padded-div">
        Select a plant type to add
      </div>
      {loadedPlantTypesFromServer
        ? (<>
          <ul>{plantTypeRows}</ul>
        </>)
        : (<div className="centered-div userplant__row-container"><Loading/></div>)
      }
    </React.Fragment>
  )
}

export default PlantTypes
