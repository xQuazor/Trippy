'use client'

import { fetchCoordinates } from '@/utils/maps/geocode'
import RecommendationList from '@/components/recommendationList/recommendationList'
import SearchBar from '@/components/searchBar/searchBar'
import Checkin from '@/components/checkin/checkin'
import Map from '@/components/map/map'
import { useState, useEffect } from 'react'
import styles from './page.module.scss'
import 'leaflet/dist/leaflet.css'

export default function Explore() {
    const [location, setLocation] = useState([54.9783, 1.6178])
    const [zoom, setZoom] = useState(5)
    const [places, setPlaces] = useState(null)
    const [isSelecting, setIsSelecting] = useState(false)
    const [userMarker, setUserMarker] = useState([52.506, 13.095])
    const [categorySelect, setCategorySelect] = useState('Trippy')
    const handleIsSelecting = (value) => {
        setIsSelecting(value)
    }
    const handleCategorySelect = (value) => {
        setCategorySelect(value)
    }
    const handleSetUserMarker = (value) => {
        setUserMarker([value.lat, value.lng])
    }
    const handleSubmitMarker = (name, file) => {
        handleIsSelecting(false)
        setUserMarker([52.506, 13.095])
        const file_type = file.name.split('.')[1]
        const formData = new FormData()
        formData.append('name', name)
        formData.append('file', file)
        formData.append('file_type', file_type)
        formData.append('latitude', userMarker[0].toString())
        formData.append('longitude', userMarker[1].toString())

        const response = fetch('api/userData', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => console.log('User Marker Submit' + data))
            .catch((error) => console.error('User Marker Submit Error' + error))
    }
    function handleSubmitGeocode(e: any) {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())
        fetchCoordinates(formJson.locationName.toString())
            .then((coordinates) => {
                setLocation([coordinates.lat, coordinates.lng])
                setZoom(13)

            })
            .catch((err) => {
                console.log(err)
            })
    }
    function handleLocationClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, null)
        }
        console.log('Geolocation not supported')
    }
    function success(position: { coords: { latitude: any; longitude: any } }) {
        setLocation([position.coords.latitude, position.coords.longitude])
        setZoom(15)
    }
    useEffect(() => {
        fetch('api/poiExtraction', {
            method: 'POST',
            body: JSON.stringify({
                latitude: location[0],
                longitude: location[1],
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((fetchedData) => {
                console.log('fetched POIS' + fetchedData)
                setPlaces(fetchedData)
            })
            .catch((err) => {
                console.log('fetched POIS error' + err)
                setPlaces(null)
            })
    },[])
    return (
        <div className={styles.container}>
            <div className={styles.container__input__left}>
                <SearchBar
                    handleLocationClick={handleLocationClick}
                    handleSubmitGeocode={handleSubmitGeocode}
                    handleCategorySelect={handleCategorySelect}
                />
            </div>
            <div className={styles.container__input__right}>
                <Checkin
                    isSelecting={isSelecting}
                    handleIsSelecting={handleIsSelecting}
                    handleSubmitMarker={handleSubmitMarker}
                />
            </div>
            <div className={styles.container__recommendation}>
                <RecommendationList places={places} />
            </div>
            <div>
                <Map
                    zoom={zoom}
                    location={location}
                    markers={places}
                    isSelecting={isSelecting}
                    handleSetUserMarker={handleSetUserMarker}
                    userMarker={userMarker}
                    category={categorySelect}
                />
            </div>
        </div>
    )
}
