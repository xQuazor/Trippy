import {createClient} from "@/utils/supabase/server";

export async function GET(resquest: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userId = user.id

    const { data: friends, error } = await supabase
        .from('friends')
        .select(`friend`)
        .eq('user_id', userId)

    let friend_points = [];

    const response = friends.map(async (friend) => {
        const friend_id = friend.friend
        const {data: user_checkins} = await supabase
            .from('user_checkins')
            .select(`checked_in, checkin_points(*)`)
            .eq('user_id', friend_id)
        user_checkins.map((check_in) => {
            friend_points.push({"friend_id":friend_id,...check_in.checkin_points});
        })

    })
    const promises = Promise.all(response)
    const resolve = await promises;

    const send = JSON.stringify(friend_points)
    return new Response(send, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
}