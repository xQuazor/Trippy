'use server'
require('dotenv').config()
import fs from 'node:fs/promises'
import file_data from '../../../json/google_places_objects.json'

export async function google_nearby_places(points, read_from_file) {
    if (read_from_file === true) {
        return file_data
    }

    let places = []
    const promises = points.map(async (point) => {
        const request_json = {
            excludedPrimaryTypes: [
                'parking', 'rest_stop', 'electric_vehicle_charging_station', 'farm', 'library', 'preschool', 'school',
                'primary_school', 'secondary_school', 'accounting', 'fire_station', 'local_government_office',
                'police', 'post_office', 'dental_clinic', 'doctor', 'dentist', 'drugstore', 'hospital',
                'medical_lab', 'pharmacy', 'physiotherapist', 'bed_and_breakfast', 'cottage', 'extended_stay_hotel',
                'hostel', 'hotel', 'motel', 'lodging', 'private_guest_room', 'resort_hotel', 'barber_shop',
                'beauty_salon', 'cemetery', 'child_care_agency', 'consultant', 'courier_service', 'electrician',
                'funeral_home', 'lawyer', 'locksmith', 'moving_company', 'painter', 'plumber', 'gym',
                'playground', 'light_rail_station', 'park_and_ride', 'subway_station', 'taxi_stand',
            ],
            languageCode: 'en',
            maxResultCount: 3,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: point.latitude,
                        longitude: point.longitude,
                    },
                    radius: 25.0,
                },
            },
        }
        const request_body = JSON.stringify(request_json)
        const nearby_places = await fetch(
            'https://places.googleapis.com/v1/places:searchNearby',
            {
                method: 'POST',
                body: request_body,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
                    'X-Goog-FieldMask':
                        'places.name,places.displayName,places.formattedAddress,places.photos,places.rating,places.userRatingCount,places.editorialSummary,places.location',
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                places.push(data.places)
            })
            .catch((err) => {
                console.error('Google_Places:' + err)
            })

        return nearby_places
    })
    console.log("Google Places promisess" + promises)
    await Promise.all(promises)
    const formated = formatResponse(places)
    console.log("Formatted " + formated)
    const nearby_places_string = JSON.stringify(formated)
    fs.writeFile('./json/google_places_objects.json', nearby_places_string)
    return formated
}
function formatResponse(response) {
    let formated = []
    const places_data = response.filter((n) => n).flat(2)
    places_data.map((place) => {
        if (place.photos && place.editorialSummary) {
            const address = place.formattedAddress.split(', ')[-2]
            const place_data = {
                id: place.name ?? null,
                name: place.displayName.text ?? null,
                address: address ?? null,
                rating: place.rating ?? null,
                userRatingCount: place.userRatingCount ?? null,
                editorialSummary: place.editorialSummary ?? null,
                photos_partial_url: place.photos[0].name ?? null,
                photo_width: place.photos[0].widthPx ?? null,
                photo_height: place.photos[0].heightPx ?? null,
                latitude: place.location.latitude.toFixed(6),
                longitude: place.location.longitude.toFixed(6),
                provider: 'google',
            }
            formated.push(place_data)
        }
    })
    return formated
}
