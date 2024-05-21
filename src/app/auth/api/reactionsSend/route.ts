'use server'

import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const userID = user.id
    const requestBody = await request.json()
    console.log(requestBody)
    const emoji = requestBody.emoji_id
    const pointID = requestBody.point_id
    const existing = requestBody.existing

    if (existing) {
        const responseEmoji = await supabase
            .from('user_checkins')
            .update({ emoji_int: emoji })
            .eq('user_id', userID)
            .eq('checkin_points_id', pointID)
        const { data, error } = await supabase
            .from('checkin_points')
            .select('reactions')
            .eq('id', pointID)

        if (emoji == 0) {

            const newCount = Number(data[0].reactions) - 1
            console.log(newCount)
            const responseReactionCount = await supabase
                .from('checkin_points')
                .update({ reactions: newCount })
                .eq('id', pointID)
            const sendReactions = JSON.stringify({
                emoji: emoji,
                reactions: newCount,
            })
            return new Response(sendReactions, { status: 200 })
        }

        const sendReactions = JSON.stringify({ emoji: emoji, reactions: data[0].reactions })
        return new Response(sendReactions, { status: 200 })
    } else {
        //Updates Selected Emoji and Overall Point Emoji Count

        const responseEmoji = await supabase
            .from('user_checkins')
            .update({ emoji_int: emoji })
            .eq('user_id', userID)
            .eq('checkin_points_id', pointID)
        const { data, error } = await supabase
            .from('checkin_points')
            .select('reactions')
            .eq('id', pointID)
        const newCount = Number(data[0].reactions) + 1
        const responseReactionCount = await supabase
            .from('checkin_points')
            .update({ reactions: newCount })
            .eq('id', pointID)
        console.log(responseReactionCount.error?.message)
        // if(responseEmoji.error || responseReactionCount.error){
        //     return new Response('Internal server error', { status: 500 })
        // }
        const sendReactions = JSON.stringify({
            emoji: emoji,
            reactions: newCount,
        })
        return new Response(sendReactions, { status: 200 })
    }
}
