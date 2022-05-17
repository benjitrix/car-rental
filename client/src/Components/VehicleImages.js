import React, { useState, useEffect } from 'react'
import { FaAngleLeft as FaAngleLeft2, FaAngleRight as FaAngleRight2 } from 'react-icons/fa'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import '../css/VehicleImages.css'

const VehicleImages = ({images, id}) => {
  const [photos, setPhotos] = useState(images)
  const [photo, setPhoto] = useState('')
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    // display scroll
    const lastIndex = photos.length - 1
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
  }, [index, photos])

  const selectGalleryImage = (galleryImage) => {
    setDisplay(true)
    setPhoto(galleryImage)
  }

  // gallery scroll
  const moveGalleryLeft = () => {
    const element = document.getElementById(`gallery-${id}`)
    element.scrollLeft -= 50
    console.log('left');
  }

  const moveGalleryRight = () => {
    const element = document.getElementById(`gallery-${id}`)
    element.scrollLeft += 50
    console.log('right');
  }

  return (
    <section className='estate-images'>
      <div className='image-on-display'>
        {
          images.map((image, imageIndex) => {
            let position = 'nextSlide'
            if (imageIndex === index) {
              position = 'activeSlide'
            }
            if (
              imageIndex === index - 1 ||
              (index === 0 && imageIndex === images.length - 1)
            ) {
              position = 'lastSlide'
            }

            return (
              <article className={position} key={imageIndex} >
                <img src={`${display ? photo : image}`} alt="" className='displayed-photo' />
              </article>
            )
          })
        }
        <button className="prev" onClick={() => {
          setIndex(index - 1)
          setDisplay(false)
          }}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => {
          setIndex(index + 1)
          setDisplay(false)
          }}>
          <FiChevronRight />
        </button>
      </div>
      <div className='gallery-container'>
        <div className='image-gallery ' id={`gallery-${id}`}>
        {
          images.map((image, i) => {
            return (
              <img 
                src={image} 
                alt="" 
                onClick={(e) => selectGalleryImage(images[i])}
                key={i}
                className='estate-photo'
                id="estate-image"
              />
            )
          })
        }
          <FaAngleLeft2 
            className='angle-two-left angle-two'
            onClick={moveGalleryLeft} 
          />
          <FaAngleRight2 
            className='angle-two-right angle-two'
            onClick={moveGalleryRight} 
          />
        </div>
      </div>  
    </section>
  )
}

export default VehicleImages
