import React from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { RiAddLine } from 'react-icons/ri'

const ImagePicker = (props: { onAddImage: (imageBase64: string | undefined) => void }): JSX.Element => {
  const openImagePicker = async (): Promise<void> => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      allowEditing: true,
      quality: 90
    })

    // Handle the selected image
    props.onAddImage(image.base64String)
  }

  return (
    <button
      onClick={ () => { void openImagePicker() }}
      className="carousel__overlay-add-image-button">
      <RiAddLine
        className="carousel__overlay-add-image-button__plus"/>
    </button>
  )
}

export default ImagePicker
