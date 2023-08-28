import React, { useEffect, useState } from 'react'
import { type UserPlant } from '../models/PlantModels'
import { type EditUserPlantRequest, EditUserPlant, type CreateUserPlantImageRequest, CreateUserPlantImages } from '../api/ServerCalls'
import { useNavigate } from 'react-router-dom'

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

const EditPlant = (props: { userPlantToEdit: UserPlant }): JSX.Element => {
  const [plantName, setPlantName] = useState<string>('')
  const [plantNotes, setPlantNotes] = useState<string>('')
  const [plantBase64Images, setPlantBase64Images] = useState<string[]>([])
  const navigate = useNavigate()

  const submitEditUserPlantRequest = async (): Promise<void> => {
    const editUserPlantRequest: EditUserPlantRequest = {
      id: props.userPlantToEdit.id,
      planttype_id: props.userPlantToEdit.planttype_id,
      plant_name: plantName,
      notes: plantNotes
    }

    await EditUserPlant(editUserPlantRequest)

    if (plantBase64Images.length > 0) {
      const imagesRequest: CreateUserPlantImageRequest[] = []

      for (const plantBase64Image of plantBase64Images) {
        const imageRequest = {
          userplant_id: props.userPlantToEdit.id,
          image_base_64: plantBase64Image
        }
        imagesRequest.push(imageRequest)
      }

      await CreateUserPlantImages(imagesRequest)
    }

    navigate('/user_plants')
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

      setPlantBase64Images(base64Strings)
    }
  }

  useEffect(() => {
    setPlantName(props.userPlantToEdit.plant_name)
    // if I fix this by adding !== null,
    // then typscript gives me an error on the setPlantNotes that I can't use
    // a variable of type string | undefined. If i use the ! to tell the compiler
    // that this is never undefined, then eslint complains that I shouldnt use !
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (props.userPlantToEdit.notes) {
      setPlantNotes(props.userPlantToEdit.notes)
    }
  }, [])

  return (
    <React.Fragment>
      Edit {props.userPlantToEdit.plant_name}
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
      <button onClick={() => { void submitEditUserPlantRequest() }}>
        Update
      </button>
    </React.Fragment>
  )
}

export default EditPlant
