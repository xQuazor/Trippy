import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const body = await request.json()
    console.log(body.query_email)
    // const query_email = 'dovydas.vilkevicius@gmail.com'
    const userId = user.id
    const { data: find_user, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', body.query_email)

    if(error) {
        return new Response('Cant Find User', {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
    const response_friend = await supabase.from('friends').insert([
        {
            user_id: userId,
            friend: find_user[0].id,
        },
        {
            user_id: find_user[0].id,
            friend: userId,
        },
    ])



    return new Response('Friend added', {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}
export async function GET(resquest: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userId = user.id
    const { data: friends, error } = await supabase
        .from('friends')
        .select(`friend, profiles!friends_friend_fkey(*)`)
        .eq('user_id', userId)
    const send = JSON.stringify(friends)
    return new Response(send, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}
