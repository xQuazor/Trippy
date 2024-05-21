'use server'

import { Client } from '@googlemaps/google-maps-services-js'
const client = new Client({})

export async function fetchCoordinates(address: string) {
    return client
        .geocode({
            params: {
                address: address,
                // @ts-ignore
                key: process.env.GOOGLE_API_KEY,
            },
            timeout: 2000, // milliseconds
        })
        .then((r) => {
            return r.data.results[0].geometry.location
        })
        .catch((e) => {
            console.log(e.response.data.error_message)
            return null
        })
}
