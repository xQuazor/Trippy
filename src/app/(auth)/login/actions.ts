'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {z} from "zod";


export async function login(form) {

    const supabase = createClient()
    const result = loginSchema.safeParse(form)
    // type-casting here for convenience
    // in practice, you should validate your inputs
    if (!result.success) {
        //@ts-ignore
        revalidatePath('/login', 'layout')
        return {success: false}
    } else {
        const data = {
            email: result.data.email,
            password: result.data.password,
        }
        const { error } = await supabase.auth.signInWithPassword(data)
        if (error) {
            revalidatePath('/login', 'layout')
            return {success: false}
        }
        revalidatePath('/login', 'layout')
        redirect('/auth/explore')
    }
}

const loginSchema = z.object({
    email: z.string(z.string().email("Invalid email address")),
    password: z.string(
        z.string().regex(
            /^(?=.*\\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
            "Password must be between 8 to 32 characters, must include at least 1 uppercase and lowercase letter and 1 special character",
        ),
    ),
})
