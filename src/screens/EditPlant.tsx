import React, { useEffect, useState } from 'react'
import { type UserPlant, type PlantType } from '../models/PlantModels'
import { type UpdateUserPlantRequest, UpdateUserPlant, SetUserPlantImages, type SetUserPlantImagesRequest, GetUserPlantImages, type GetUserPlantImageResponse, DeleteUserPlant, GetPlantType } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftLine, RiSave2Line } from 'react-icons/ri'
import Loading from '../components/Loading'
import ImageCarousel from '../components/ImageCarousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '../index.css'
import { confirm } from '../utils/Utils'

const EditPlant = (props: { userPlantToUpdate: UserPlant }): JSX.Element => {
  const [imagesLoadedFromServer, setImagesLoadedFromServer] = useState<boolean>(false)
  const [imageSources, setImageSources] = useState<string[]>([])
  const [plantName, setPlantName] = useState<string>('')
  const [plantType, setPlantType] = useState<PlantType>()
  const [plantNotes, setPlantNotes] = useState<string>('')
  const [selectedUserImageIndex, setSelectedUserImageIndex] = useState<number>(0)

  // GetUserPlantImageResponse doesnt really feel right for this
  const navigate = useNavigate()

  useEffect(() => {
    const getPlantType = async (): Promise<void> => {
      try {
        const plantType: PlantType = await GetPlantType(props.userPlantToUpdate.planttype_id)
        setPlantType(plantType)
      } catch (e) {
        console.error(e)
      }
    }

    void getPlantType()
  }, [])

  const addSingleImage = (imageBase64: string | undefined): void => {
    if (imageBase64 !== undefined) {
      setImageSources([...imageSources, imageBase64])
      const lastIndex: number = imageSources.length
      setSelectedUserImageIndex(lastIndex)
    }
  }

  const plantHasUserImages = (): boolean => {
    if (!imagesLoadedFromServer) {
      throw new Error('do not call plantHasNoUserImages before receiving images from server')
    }
    return imageSources.length > 0
  }

  const goBack = (): void => {
    navigate('/user_plants')
  }

  const submitDeleteUserPlantRequest = async (): Promise<void> => {
    if (await confirm('Delete this plant?')) {
      await DeleteUserPlant(props.userPlantToUpdate.id)
      navigate('/user_plants')
    }
  }

  const submitUpdateUserPlantRequest = async (): Promise<void> => {
    const updateUserPlantRequest: UpdateUserPlantRequest = {
      planttype_id: props.userPlantToUpdate.planttype_id,
      plant_name: plantName,
      notes: plantNotes
    }

    const setUserPlantImagesRequest: SetUserPlantImagesRequest = {
      images_base_64: imageSources
    }

    await Promise.all([
      UpdateUserPlant(updateUserPlantRequest, props.userPlantToUpdate.id),
      SetUserPlantImages(setUserPlantImagesRequest, props.userPlantToUpdate.id)
    ])

    navigate('/user_plants')
  }

  const getUserPlantImagesFromServer = async (): Promise<void> => {
    const imageResponses: GetUserPlantImageResponse[] = await GetUserPlantImages(props.userPlantToUpdate.id)
    setImageSources(imageResponses.map(x => x.image_data))

    // a hack, but the callback never gets
    // called until you actually swipe.
    if (imageResponses.length > 0) {
      // setUserImageIndex(imageResponses.length)
    }

    setImagesLoadedFromServer(true)
  }

  useEffect(() => {
    setPlantName(props.userPlantToUpdate.plant_name)
    // if I fix this by adding !== null,
    // then typscript gives me an error on the setPlantNotes that I can't use
    // a variable of type string | undefined. If i use the ! to tell the compiler
    // that this is never undefined, then eslint complains that I shouldnt use !
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (props.userPlantToUpdate.notes) {
      setPlantNotes(props.userPlantToUpdate.notes)
    }

    void getUserPlantImagesFromServer()
  }, [])

  return (
    <React.Fragment>
      <div className="carousel__wrapper">
        {imagesLoadedFromServer
          ? (<div>
            <ImageCarousel
              onAddImage={addSingleImage}
              selectedUserImageIndex={selectedUserImageIndex}
              setSelectedUserImageIndex={setSelectedUserImageIndex}
              plantHasUserImages={plantHasUserImages()}
              setImageSources={setImageSources}
              imageSources={imageSources} />
          </div>)
          : (<div className="carousel__spinner-wrapper">
            <Loading/>
          </div>)}
      </div>
      <div className="padded-div">
        <h3>
          Edit {props.userPlantToUpdate.plant_name}
        </h3>
        <p>
          {/* Only display the plant type if its different from the name, otherwise it looks a bit redundant */}
          {plantType?.name.toLowerCase() !== props.userPlantToUpdate.plant_name.toLowerCase() &&
           plantType?.name}
        </p>
      </div>
      <div className="padded-div">
        <textarea
          value={plantName}
          rows={1}
          cols={30}
          maxLength={34}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => { setPlantName(event.target.value) }}
          placeholder="Name (blank for default)"
          className="userplant__name-edit-input"
        />
        <textarea
          value={plantNotes}
          rows={5}
          cols={30}
          maxLength={170}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => { setPlantNotes(event.target.value) }}
          placeholder="Enter notes or leave blank..."
          className="userplant__notes-edit-input"
        />
      </div>
      <br />
      <div className="padded-div">
        <button
          className="warning-button userplant__delete-button"
          onClick={() => { void submitDeleteUserPlantRequest() }}>
          Delete This Plant
        </button>
      </div>
      <button
        className="userplant__save-edits-button"
        onClick={() => { void submitUpdateUserPlantRequest() }}>
        <RiSave2Line
          className="userplant__save-edits-button__floppy"/>
      </button>
      <button
        className="userplant__back-button"
        onClick={goBack}>
        <RiArrowLeftLine
          className="userplant__save-edits-button__floppy"/>
      </button>
    </React.Fragment>
  )
}

export default EditPlant
