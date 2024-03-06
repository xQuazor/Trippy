"use client";

import {fetchCoordinates} from "@/server/maps";
import {getPois} from "@/server/get_pois";

import styles from "./page.module.scss";
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl} from "react-leaflet";
import {useState, useEffect} from "react";
import data from '../../../saves/location.json'
import {Icon, LatLngExpression} from "leaflet";
import SearchBar from "@/components/searchbar/searchbar";


const icon = new Icon({
        iconUrl: "./icons/marker.png",
        iconSize: [32, 32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [16, 0],// point from which the popup should open relative to the iconAnchor}
    }
)

// const docRef = addDoc(collection(db, "cities"), {
//     name: "Tokyo",
//     country: "Japan"
// });
// console.log("Document written with ID: ", docRef);

export default function Explore() {
    const [markers, setMarkers] = useState([]);
    const [location, setLocation] = useState([52.506, 13.095]);
    const [zoom, setZoom] = useState(5);

    function handleSubmit(e:any) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson.locationName);

        fetchCoordinates(formJson.locationName.toString()).then(function(coordinates){
            // @ts-ignore
            getPois(coordinates.lat,coordinates.lng, 2)
            // @ts-ignore
            setLocation([coordinates.lat, coordinates.lng]);
            setZoom(13);
        })

    }
    function handleLocationClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }
    function success(position: { coords: { latitude: any; longitude: any } }) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation([latitude, longitude]);
        setZoom(15)
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    function error() {
        console.log("Unable to retrieve your location");
    }
    function FlyMapTo(props: { center: LatLngExpression; zoom: number; }) {
        const map = useMap();
        useEffect(() => {
            map.flyTo(props.center, props.zoom);
        });

        return null;
    }
  return (
    <div className={styles.container}>
        <div className={styles.container__input}>
            <SearchBar passLocation={handleLocationClick} getLocationQuery={handleSubmit} ></SearchBar>
        </div>
      <MapContainer key={location[0]} center={[location[0],location[1]]} zoom={zoom} zoomControl={false}  scrollWheelZoom={true} className={styles.map} id={"map"}>
          <ZoomControl position="bottomright"  />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            data.map((marker, id) => {
            return(
            <Marker key={id} icon={icon} position={[parseFloat(marker.latitude),parseFloat(marker.longitude)]}>
              <Popup>
                  {"Position:" + parseFloat(marker.latitude) + " " + parseFloat(marker.longitude)}
              </Popup>
            </Marker>
          );})
        }
          <FlyMapTo center={[location[0],location[1]]} zoom={zoom} />
      </MapContainer>
    </div>
  );
}

