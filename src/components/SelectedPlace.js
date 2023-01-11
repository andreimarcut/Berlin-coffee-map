import './SelectedPlace.css'
import { FavoriteIcon } from './../assets/FavoriteIcon'
import { Direction } from './UI/Direction'
import { useEffect } from 'react'
import { CloseButton } from './UI/CloseButton'
import { Instagram } from '../assets/Instagram'

export const SelectedPlace = ({ data, favorites, setFavorites, onSetNewPlace }) => {
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites) {
      setFavorites(favorites)
    }
  }, [setFavorites])  

  const addFavorites = () => {
    if (!favorites?.includes(data.properties.placeId)) {
      setFavorites([...favorites, data.properties.placeId])
    } else {
      const unFavorites = favorites.filter(
        (value) => value !== data.properties.placeId
      )
      setFavorites(unFavorites)
    }
  }

  const isFavorite = favorites?.includes(data.properties.placeId)

  return (
    <div className='wrapper'>
      <div className='closeButton'>
        <CloseButton
          onClick={() => {
            onSetNewPlace(null)
          }}
        />
      </div>
      <div className='selectedPlaces'>
        <div className='description-container'>
          <div className='img-container'>
            <img
              src={require(`./../assets/img/${data.properties.img_src}.jpg`)}
              alt='PlaceView'
            />
          </div>
          <div className='description'>
            <a
              href={data.properties.contact_website}
              target='_blank'
              rel='noopener noreferrer'
            >
              <h3>
                <Instagram />
                {data.properties.name}
              </h3>
            </a>
            <p>{`📍${data.properties.addr_street} ${data.properties.addr_housenumber}`}</p>
          </div>
        </div>
        <div>
          <div
            onClick={addFavorites}
            className={isFavorite ? 'favorite_fill' : 'favorite'}
          >
            <FavoriteIcon />
          </div>
          <Direction
            lat={data.latitude}
            lng={data.longitude}
          />
        </div>
      </div>
    </div>
  )
}
