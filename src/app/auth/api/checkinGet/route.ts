import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userId = user.id
    const body = await request.json()
    const response = await supabase
        .from('user_checkins')
        .select('checked_in')
        .eq('user_id', userId)
        .eq('checkin_points_id', body.id)

    if (response.error) {
        return new Response('server error', {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
    const send = JSON.stringify(response.data[0].checked_in)
    return new Response(send, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}
