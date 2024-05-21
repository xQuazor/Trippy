'use server'
import { NextResponse } from 'next/server'
import { fetchPOIS } from '@/utils/maps/retrievePOIS'
require('dotenv').config()

export async function POST(request: Request) {
    try {
        const response = await request.json()
        // console.log("EXPLORE ROUTE REQUEST" + JSON.stringify(response))
        const points = await fetchPOIS(response.latitude, response.longitude)
        console.log("EXPLORE ROUTE POINTS" + JSON.stringify(points[0]))
        const send = JSON.stringify(points)
        return new Response(send, {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (err) {
        // console.log(err)
        return new Response(null, {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
