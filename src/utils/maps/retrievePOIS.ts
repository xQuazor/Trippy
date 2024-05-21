import { foursquare_nearby_places } from '@/utils/maps/foursquare'
import { google_nearby_places } from '@/utils/maps/googlePlaces'
import { flickr_search } from '@/utils/maps/flickr'
import { clusterPoints } from '@/utils/maps/clusterPoints'
const read_from_file = true;
export async function fetchPOIS(latitude, longitude) {
    const flickr_places = await flickr_search(latitude, longitude, 2)

    if (read_from_file) {
        const google_places = await google_nearby_places(null, read_from_file)
        const foursquare_places = await foursquare_nearby_places(
            null,
            read_from_file
        )
        return [...google_places.flat(1), ...foursquare_places.flat(1)]
    }

    if (flickr_places) {
        const clustered_points = await clusterPoints(flickr_places, 0.0005, 2)
        // console.log(clustered_points)
        // const google_places = await google_nearby_places(
        //     clustered_points,
        //     read_from_file
        // )
        const google_places = null
        console.log(google_places)
        const foursquare_places = await foursquare_nearby_places(
            clustered_points,
            read_from_file
        )
        console.log(foursquare_places)
        return [...google_places.flat(1), ...foursquare_places.flat(1)]
    }
    return null
}
