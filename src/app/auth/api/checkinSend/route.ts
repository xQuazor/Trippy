import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userId = user.id
    const body = await request.json()
    console.log(JSON.stringify(body.check_in))
    if (body.check_in === true) {
        const { error } = await supabase
            .from('user_checkins')
            .delete()
            .eq('user_id', userId)
            .eq('checkin_points_id', body.id)

        if (error) {
            return new Response('server error', {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }
        const send = JSON.stringify({check_in: false})
        return new Response(send, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const response = await supabase.from('user_checkins').insert([
        {
            user_id: userId,
            checkin_points_id: body.id,
            checked_in: 'True',
        },
    ])

    if (response.status == 200 || 201) {
        const send = JSON.stringify({check_in: true})
        return new Response(send, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    }
    return new Response('server error', {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    })
}
