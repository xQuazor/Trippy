'use server'

import fs from 'node:fs/promises'
import file_data from '../../../json/foursquare_objects.json'
require('dotenv').config()
export async function foursquare_nearby_places(points, read_from_file) {
    if (read_from_file === true) {
        return file_data
    }
    const entertainement_art = '10000'
    const food_drink = '13000'
    const landmarks = '16000'
    // Retrieving place info
    const places_response = points.map(async (object) => {
        let to_return = []
        try {
            const searchParams = new URLSearchParams({
                ll: object.latitude + ',' + object.longitude,
                radius: '25',
                categories:
                    entertainement_art + ',' + food_drink + ',' + landmarks,
            })
            console.log("Search params " + searchParams)
            const results = await fetch(
                `https://api.foursquare.com/v3/places/search?${searchParams}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: process.env.FOURSQUARE_KEY ?? 'null',
                    },
                }
            )
                .then((res) =>
                    res.json().then((data) => {
                        to_return.push(data.results)
                    })
                )
                .catch((err) => {
                    console.error('Foursquare Placecs:' + err)
                })

        } catch (err) {
            console.error('Foursquare Placecs:' + err)
        }
        return to_return
    })

    // Retrieving photo URLS
    let places_data: any[] = await Promise.all(places_response)
    places_data = places_data.filter((n) => n).flat(2)
    console.log("Foursquare Places " + places_data)
    const photos_response = places_data.map(async (places_data) => {
        let to_return = []
        try {
            if (!places_data.fsq_id) return
            const searchParams = new URLSearchParams({
                limit: '1',
                classifications: 'outdoor,indoor',
            })
            const results = await fetch(
                `https://api.foursquare.com/v3/places/${places_data.fsq_id}/photos?${searchParams}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: process.env.FOURSQUARE_KEY ?? 'null',
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    let data_id
                    console.log('photo data foursquare' + data)
                    if (data.length === 1) {
                        data_id = { photo: data, fsq_id: places_data.fsq_id }
                    } else {
                        data_id = { photo: data[0], fsq_id: places_data.fsq_id }
                    }
                    to_return.push(data_id)
                })
                .catch((err) => {
                    console.log('Foursquare Photos:' + err)
                })
        } catch (err) {
            console.log('Foursquare Photos:' + err)
        }
        return to_return
    })
    console.log("Foursquare Photos resp " + photos_response)
    let photos_data: any[] = await Promise.all(photos_response)
    photos_data = photos_data.filter((n) => n).flat(2)

    // const photos_string = JSON.stringify(photos_data)
    // const places_string = JSON.stringify(places_data)
    // await fs.writeFile('./json/foursquare_photos.json', photos_string)
    // await fs.writeFile('./json/foursquare_places.json', places_string)

    let data_merged = []
    places_data.map((t1) => {
        if (photos_data.find((t2) => (t2.fsq_id === t1.fsq_id) === undefined)) {
            data_merged.push({ ...t1, photos: 'null' })
        } else {
            data_merged.push({
                ...t1,
                ...photos_data.find((t2) => t2.fsq_id === t1.fsq_id),
            })
        }
    })
    const formatedData = formatData(data_merged)
    const extracted_places = JSON.stringify(formatedData)
    await fs.writeFile('./json/foursquare_objects.json', extracted_places)
    return formatedData
}

function formatData(data) {
    let formated = []
    data.map((place) => {
        let image_url = null
        if (place.photo)
            image_url =
                place.photo[0].prefix +
                Math.ceil(place.photo[0].width / 4) +
                'x' +
                Math.ceil(place.photo[0].height / 4) +
                place.photo[0].suffix

        const place_data = {
            id: place.fsq_id ?? null,
            name: place.name ?? null,
            address: place.location.post_town ?? null,
            rating: null,
            userRatingCount: null,
            editorialSummary: null,
            photos_partial_url: image_url ?? null,
            photo_width: null,
            photo_height: null,
            latitude: place.geocodes.main.latitude.toFixed(6) ?? null,
            longitude: place.geocodes.main.longitude.toFixed(6) ?? null,
            provider: 'foursquare',
        }
        formated.push(place_data)
    })

    return formated
}
