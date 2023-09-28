import React, { useEffect, useState } from 'react'
import { type UserPlant, type PlantType } from '../models/PlantModels'
import { type UpdateUserPlantRequest, UpdateUserPlant, SetUserPlantImages, type SetUserPlantImagesRequest, GetUserPlantImages, type GetUserPlantImageResponse, DeleteUserPlant, GetPlantType } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'
import { RiArrowLeftLine, RiDeleteBin2Line, RiSave2Line, RiAddLine } from 'react-icons/ri'
import Loading from '../components/Loading'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import '../index.css'
import missingImage from '../assets/images/no-image.jpeg'
import { confirm } from '../utils/Utils'

const ImageCarousel = (props: { imageSources: string[], setImageSources: (imageSources: string[]) => void, plantHasUserImages: boolean }): JSX.Element => {
  const [selectedUserImageIndex, setSelectedUserImageIndex] = useState<number>(0)

  const addSingleImage = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file: File | null = event.target.files[0]
    if (file !== null) {
      const fileAsBase64: string = await readFileAsBase64(file)

      props.setImageSources([...props.imageSources, fileAsBase64])
      const lastIndex: number = props.imageSources.length
      setSelectedUserImageIndex(lastIndex)
    }
  }

  const deleteSelectedImage = async (): Promise<void> => {
    props.setImageSources(props.imageSources.slice(0, selectedUserImageIndex).concat(props.imageSources.slice(selectedUserImageIndex + 1)))

    // if were deleted the last image, we gotta reselect an image
    // or else we'll be left looking at a black box>
    if (selectedUserImageIndex === props.imageSources.length - 1) {
      const lastIndex: number = Math.max(0, props.imageSources.length - 2)
      setSelectedUserImageIndex(lastIndex)
    }
  }

  let imagesList
  if (props.plantHasUserImages && props.imageSources.length > 0) {
    imagesList = props.imageSources.map((imageSource, index) => (
      <div key={index}>
        <img src={`data:image/jpeg;base64,${imageSource}`} alt={`Image ${index}`} />
      </div>
    ))
  } else {
    imagesList = <img src={missingImage}/>
  }

  return (
    <div>
      {props.plantHasUserImages && (<button className="carousel__overlay-delete-image-button" onClick={() => { void deleteSelectedImage() }}>
        { /* TODO: ask user for confirmation */}
        <RiDeleteBin2Line
          className="carousel__overlay-delete-image-button__bin" />
      </button>)}
      {/* file input looks pretty ugly, so instead im just using a label connected to it, and then hiding it.
          clicking the label will have the same effect */}
      <label
        htmlFor="image-upload"
        className="carousel__overlay-add-image-button">
        <RiAddLine
          className="carousel__overlay-add-image-button__plus"/>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { void addSingleImage(event) }}
        />
      </label>
      <Carousel
        onChange={ (index: number, item: React.ReactNode) => {
          setSelectedUserImageIndex(index)
        }}
        showStatus={false}
        showThumbs={false}
        selectedItem={selectedUserImageIndex}
        >
        {imagesList}
      </Carousel>
    </div>
  )
}

const readFileAsBase64 = async (file: File): Promise<string> => {
  const base64StringPromise: Promise<string> = new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (event: ProgressEvent<FileReader>) {
      // ping pong between typescript and eslint errors.
      // start with event.target !== null && event.target.result !== null
      // and eslint says i should do event.target?.result !== null,
      // then typescript complains that event.target could possibly be null.
      // so i add the !. then eslint compains that i should use non-null assertion.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (event.target?.result !== null && typeof event.target!.result === 'string') {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const base64String = event.target!.result.split(',')[1]
        resolve(base64String)
      }
    }

    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsDataURL(file)
  })

  return await base64StringPromise
}

const EditPlant = (props: { userPlantToUpdate: UserPlant }): JSX.Element => {
  const [imagesLoadedFromServer, setImagesLoadedFromServer] = useState<boolean>(false)
  const [imageSources, setImageSources] = useState<string[]>([])
  const [plantName, setPlantName] = useState<string>('')
  const [plantType, setPlantType] = useState<PlantType>()
  const [plantNotes, setPlantNotes] = useState<string>('')
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
