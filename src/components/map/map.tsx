import styles from '@/components/map/map.module.scss'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    ZoomControl,
} from 'react-leaflet'
import { Icon, LatLngExpression } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useEffect, useState } from 'react'
import Recommendation from '@/components/recommendation/recommendation'
import UserMarker from '@/components/userMarker/userMarker'

const poi_marker = new Icon({
    iconUrl: '../../../icons/marker.png',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0.5, -32], // point from which the popup should open relative to the iconAnchor}
})
const user_marker = new Icon({
    iconUrl: '../../../icons/user_marker.png',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0.5, -32], // point from which the popup should open relative to the iconAnchor}
})
export default function Map({
    zoom,
    location,
    markers,
    isSelecting,
    handleSetUserMarker,
    userMarker,
    category,
}) {
    const [userMarkers, setUserMarkers] = useState(null)
    const [friendMarkers, setFriendMarkers] = useState(null)
    // function FlyMapTo(props: { center: LatLngExpression; zoom: number }) {
    //     const map = useMap()
    //     useEffect(() => {
    //         map.flyTo(props.center, props.zoom)
    //     }, [zoom])
    //     return null
    // }
    useEffect(() => {
        fetch('api/userData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserMarkers(data)
                console.log('Personal Category fetch ' + data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        fetch('api/friendMarkers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFriendMarkers(data)
                console.log('Friend Category fetch ' + data)
            })
            .catch((err) => console.log(err))
    }, [])
    //Add another use effect to update the checkin status
    return (
        <MapContainer
            center={[location[0], location[1]]}
            zoom={zoom}
            zoomControl={false}
            scrollWheelZoom={true}
            className={styles.map}
            id={'map'}
        >
            <ZoomControl position="bottomright" />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
                <ReturnCategoryMarkers
                    category={category}
                    markers={markers}
                    friendMarkers={friendMarkers}
                    userMarkers={userMarkers}
                />
            </MarkerClusterGroup>
            <CustomMarker
                pos={userMarker}
                handleSetUserMarker={handleSetUserMarker}
                isSelecting={isSelecting}
            />
            {/*<FlyMapTo center={[location[0], location[1]]} zoom={zoom} />*/}
        </MapContainer>
    )
}

function CustomMarker({ pos, handleSetUserMarker, isSelecting }) {
    if (isSelecting){
        return (
            <Marker
                position={pos}
                draggable
                autoPan
                eventHandlers={{
                    moveend: (event) => {
                        // console.log()
                        handleSetUserMarker(event.target.getLatLng())
                    },
                }}
                icon={poi_marker}
            />
        )
    }
    else{
        return null;
    }

}
function ReturnMarkers({ marker }) {
    return (
        <Marker
            icon={user_marker}
            position={[
                parseFloat(marker.latitude),
                parseFloat(marker.longitude),
            ]}
        >
            <Popup className={styles.custom_popup}>
                {marker.provider === 'user' ? (
                    <UserMarker place={marker} />
                ) : (
                    <Recommendation place={marker} />
                )}
            </Popup>
        </Marker>
    )
}
function ReturnCategoryMarkers({
    category,
    markers,
    userMarkers,
    friendMarkers,
}) {
    switch (category) {
        case 'Trippy':
            if (!markers) {
                return null
            }
            return markers.map((marker, id) => {
                return <ReturnMarkers key={id} marker={marker} />
            })
        case 'Personal':
            if (!userMarkers) {
                return null
            }
            return userMarkers.map((userMarker, id) => {
                return <ReturnMarkers key={id} marker={userMarker} />
            })
        case 'Friends':
            if (!friendMarkers) {
                return null
            }
            return friendMarkers.map((friendMarker, id) => {
                return <ReturnMarkers key={id} marker={friendMarker} />
            })
    }
}
