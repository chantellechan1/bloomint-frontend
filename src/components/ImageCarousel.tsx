import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { RiDeleteBin2Line } from 'react-icons/ri'
import missingImage from '../assets/images/no-image.jpeg'
import ImagePicker from '../components/ImagePicker'

const ImageCarousel = (props: { imageSources: string[], setImageSources: (imageSources: string[]) => void, selectedUserImageIndex: number, setSelectedUserImageIndex: (index: number) => void, onAddImage: (imageBase64: string | undefined) => void, plantHasUserImages: boolean }): JSX.Element => {
  const deleteSelectedImage = async (): Promise<void> => {
    props.setImageSources(props.imageSources.slice(0, props.selectedUserImageIndex).concat(props.imageSources.slice(props.selectedUserImageIndex + 1)))

    // if were deleted the last image, we gotta reselect an image
    // or else we'll be left looking at a black box>
    if (props.selectedUserImageIndex === props.imageSources.length - 1) {
      const lastIndex: number = Math.max(0, props.imageSources.length - 2)
      props.setSelectedUserImageIndex(lastIndex)
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
      <ImagePicker
        onAddImage={props.onAddImage}/>
      <Carousel
        onChange={ (index: number, item: React.ReactNode) => {
          props.setSelectedUserImageIndex(index)
        }}
        showStatus={false}
        showThumbs={false}
        selectedItem={props.selectedUserImageIndex}
        >
        {imagesList}
      </Carousel>
    </div>
  )
}

export default ImageCarousel
