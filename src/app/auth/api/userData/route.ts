'use server'

import { createClient } from '@/utils/supabase/server'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userId = user.id

    const form = await request.formData()
    const name = form.get('name')
    const file = form.get('file')
    const file_type = form.get('file_type')
    const latitude = form.get('latitude')
    const longitude = form.get('longitude')

    if (!file) {
        return NextResponse.json(
            { error: 'No files received.' },
            { status: 500 }
        )
    }
    if (!name) {
        return NextResponse.json({ error: 'Name Missing.' }, { status: 500 })
    }
    const uuid = uuidv4()
    const filename = uuid + '.' + file_type

    const responseCheckpoint = await supabase.from('checkin_points').insert([
        {
            id: uuid,
            name: name,
            address: null,
            rating: null,
            userRatingCount: null,
            editorialSummary: null,
            photos_partial_url: filename,
            photo_width: null,
            photo_height: null,
            latitude: latitude,
            longitude: longitude,
            provider: 'user',
        },
    ])
    const responseUser = await supabase.from('user_checkins').insert([
        {
            user_id: userId,
            checkin_points_id: uuid,
            checked_in: 'true',
        },
    ])
    const responsePhoto = await supabase.storage
        .from('poi_photos/user')
        .upload(filename, file)

    return new Response('Point Saved', { status: 200 })
}

export async function GET(request: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userId = user.id
    const { data: user_checkins, error } = await supabase
        .from('user_checkins')
        .select(`checked_in, checkin_points(*)`)
        .eq('user_id', userId)
    const reformat_data = []
    user_checkins.map((data) => {
        reformat_data.push({
            checked_in: data.checked_in,
            id: data.checkin_points['id'] ?? null,
            name: data.checkin_points['name'] ?? null,
            address: data.checkin_points['address'] ?? null,
            rating: data.checkin_points['rating'] ?? null,
            userRatingCount: data.checkin_points['userRatingCount'] ?? null,
            editorialSummary: data.checkin_points['editorialSummary'] ?? null,
            photos_partial_url:
                data.checkin_points['photos_partial_url'] ?? null,
            photo_width: data.checkin_points['photo_width'] ?? null,
            photo_height: data.checkin_points['photo_height'] ?? null,
            latitude: data.checkin_points['latitude'] ?? null,
            longitude: data.checkin_points['longitude'] ?? null,
            provider: 'user',
        })
    })
    return new Response(JSON.stringify(reformat_data), { status: 200 })
}
