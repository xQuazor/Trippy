import {createClient} from "@/utils/supabase/server";

export async function POST (request: Request){

    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userID = user.id
    const requestBody = await request.json()
    const pointID = requestBody.id
    const { data, error } = await supabase
        .from('checkin_points')
        .select('reactions')
        .eq('id', pointID)


    const responseEmoji = await supabase
        .from('user_checkins')
        .select('emoji_int')
        .eq('user_id', userID)
        .eq('checkin_points_id', pointID)

    const reactions = {
        "emoji": Number(responseEmoji.data[0].emoji_int),
        "reactions": Number(data[0].reactions)
    }
    const reactions_send = JSON.stringify(reactions)
    return new Response(reactions_send, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}