'use server'

import fs from 'node:fs/promises'
import { clusterPoints } from './clusterPoints'

require('dotenv').config()

const api_key = '&api_key=' + process.env.FLICKR_KEY
const format = '&format=' + 'json'
const callback = '&nojsoncallback=' + '1'

export async function flickr_search(
    latitude: number,
    longitude: number,
    radius: number
) {
    return getPhotos(latitude, longitude, radius)
}
function getPhotos(latitude: number, longitude: number, radius: number) {
    const has_geo = '&has_geo' + 'true'
    const lat = '&lat=' + latitude
    const lon = '&lon=' + longitude
    const rad = '&radius=' + radius
    const query =
        'https://www.flickr.com/services/rest/?method=flickr.photos.search' +
        format +
        api_key +
        has_geo +
        lat +
        lon +
        rad +
        callback

    return fetch(query, { method: 'GET' })
        .then((res) => res.json())
        .then((write) => {
            const photos_trimmed = write.photos.photo.map((element) => {
                return {
                    id: element.id,
                    title: element.title,
                }
            })
            const photos_string = JSON.stringify(photos_trimmed)
            fs.writeFile('./json/flickr.json', photos_string)
            return photos_trimmed
        })
        .then(async (location) => {
            const promises_location = location.map((x: object) =>
                getLocation(x)
            )
            const responses_location = await Promise.all(promises_location)
            // const promises_tags = location.map((x:object) => getTags(x))
            // const responses_tags = await Promise.all(promises_tags)

            let locations = []
            responses_location?.forEach((element) => {
                locations.push({
                    id: element.photo.id ?? null,
                    latitude: element.photo.location.latitude ?? null,
                    longitude: element.photo.location.longitude ?? null,
                    country: element.photo.location.county ?? null,
                })
            })
            // const tags_string = JSON.stringify(responses_tags)
            // fs.writeFile('./json/flickr_tags.json', tags_string)
            const string = JSON.stringify(locations)
            fs.writeFile('./json/location.json', string)
            return locations
        })
        .catch((err) => console.log(`Error: ${err}`))
}
function getLocation(photo_id: object) {
    const photo_query = '&photo_id=' + (photo_id as any).id
    const query =
        'https://www.flickr.com/services/rest/?method=flickr.photos.geo.getLocation' +
        format +
        api_key +
        photo_query +
        callback
    return fetch(query, { method: 'GET' }).then((res) => res.json())
}
// function getTags(photo_id: object) {
//     const photo_query = '&photo_id=' + (photo_id as any).id
//     const query =
//         'https://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto' +
//         format +
//         api_key +
//         photo_query +
//         callback
//     return fetch(query, { method: 'GET' }).then((res) => res.json())
// }
