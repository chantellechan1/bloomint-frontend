import React, { useEffect, useState } from 'react'
import { type UserPlant } from '../models/PlantModels'
import { type UpdateUserPlantRequest, UpdateUserPlant, type CreateUserPlantImageRequest, CreateUserPlantImages, GetUserPlantImages, type GetUserPlantImageResponse, DeleteUserPlantImage } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import './OverlayButton.css'

const ImageCarousel = (props: { base64Images: string[], userPlantImages: GetUserPlantImageResponse[], setCarouselUserImageID: (index: number) => void }): JSX.Element => {
  return (
    <Carousel
      width="700px"
      onChange={ (index: number, item: React.ReactNode) => { props.setCarouselUserImageID(props.userPlantImages[index].id) }}
      >
      {props.base64Images.map((base64Image, index) => (
        <div key={index}>
          <img src={`data:image/jpeg;base64,${base64Image}`} alt={`Image ${index}`} />
        </div>
      ))}
    </Carousel>
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
  const [plantName, setPlantName] = useState<string>('')
  const [plantNotes, setPlantNotes] = useState<string>('')
  const [userPlantImages, setUserPlantImages] = useState<GetUserPlantImageResponse[]>([])
  const [plantBase64ImagesToUpload, setPlantBase64ImagesToUpload] = useState<string[]>([])
  const [carouselSelectedUserImageID, setCarouselSelectedUserImageID] = useState<number>(-1)
  const navigate = useNavigate()

  const submitUpdateUserPlantRequest = async (): Promise<void> => {
    console.log(carouselSelectedUserImageID)

    const updateUserPlantRequest: UpdateUserPlantRequest = {
      planttype_id: props.userPlantToUpdate.planttype_id,
      plant_name: plantName,
      notes: plantNotes
    }

    await UpdateUserPlant(updateUserPlantRequest, props.userPlantToUpdate.id)

    if (plantBase64ImagesToUpload.length > 0) {
      const imagesRequest: CreateUserPlantImageRequest[] = []

      for (const plantBase64Image of plantBase64ImagesToUpload) {
        const imageRequest = {
          userplant_id: props.userPlantToUpdate.id,
          image_base_64: plantBase64Image
        }
        imagesRequest.push(imageRequest)
      }

      await CreateUserPlantImages(imagesRequest)
    }

    navigate('/user_plants')
  }

  const deleteSelectedImage = async (): Promise<void> => {
    await DeleteUserPlantImage(carouselSelectedUserImageID)
    setUserPlantImages(userPlantImages.filter(x => x.id !== carouselSelectedUserImageID))
  }

  const selectImages = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files: FileList | null = event.target.files
    if (files !== null) {
      const base64Strings = []
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i]
        const fileAsBase64: string = await readFileAsBase64(file)
        base64Strings.push(fileAsBase64)
      }

      setPlantBase64ImagesToUpload(base64Strings)
    }
  }

  const getUserPlantImagesFromServer = async (): Promise<void> => {
    const imageResponses: GetUserPlantImageResponse[] = await GetUserPlantImages(props.userPlantToUpdate.id)
    setUserPlantImages(imageResponses)

    // a hack, but the callback never gets
    // called until you actually swipe.
    if (imageResponses.length > 0) {
      setCarouselSelectedUserImageID(imageResponses[0].id)
    }
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
      Edit {props.userPlantToUpdate.plant_name}
      <input
        type="text"
        value={plantName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { setPlantName(event.target.value) }}
        placeholder="Enter name or leave blank..."
      />
      <input
        type="text"
        value={plantNotes}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { setPlantNotes(event.target.value) }}
        placeholder="Enter notes or leave blank..."
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => { void selectImages(event) }}
        placeholder="Upload photo"
      />
      <button onClick={() => { void submitUpdateUserPlantRequest() }}>
        Update
      </button>
      {userPlantImages.length > 0 &&
        (<div className="wrapper">
          <button className="overlay-button" onClick={() => { void deleteSelectedImage() }}>
            { /* TODO: ask user for confirmation */}
            Delete Image
          </button>
          <ImageCarousel base64Images={userPlantImages.map(x => x.image_data)} userPlantImages={userPlantImages} setCarouselUserImageID={setCarouselSelectedUserImageID} />
        </div>)}
    </React.Fragment>
  )
}

export default EditPlant
