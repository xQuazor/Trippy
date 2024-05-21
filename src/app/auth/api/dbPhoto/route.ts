import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

//Takes photo_id and retrieves photo for marker
export async function POST(request: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const body = await request.json()
    const fileName = 'user/' + body.photos_partial_url
    const { data, error } = await supabase.storage
        .from('poi_photos')
        .createSignedUrl(fileName, 1000)
    const promise = Promise.resolve(data)
    if (error) {
        console.log("dbPhoto" + error)
        return NextResponse.json({ error: error }, { status: 500 })
    }

    return NextResponse.json({ url: data.signedUrl }, { status: 200 })
}
