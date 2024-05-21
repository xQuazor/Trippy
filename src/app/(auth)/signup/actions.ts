'use server'

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {z} from "zod";
export async function signup(form) {
    let zodErrors = {}
    const supabase = createClient()
    const result = signUpSchema.safeParse(form)
    // type-casting here for convenience
    // in practice, you should validate your inputs
    if (!result.success) {
        //@ts-ignore
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
        revalidatePath('/signup', 'layout')
        console.log("oopsie woopsie")
        return {success: false}
    } else {
        const data = {
            email: result.data.email,
            password: result.data.password,
        }
        const { error } = await supabase.auth.signUp(data)
        if (error) {
            console.log("SignUp Error" + error)
            revalidatePath('/signup', 'layout')
            return {success: false}
        }
        revalidatePath('/signup', 'layout')
        redirect('/login')
    }
}

const signUpSchema = z.object({
    email: z.string(z.string().email("Invalid email address")),
    confirm_email: z.string(z.string().email("Invalid email address")),
    password: z.string(
        z
            .string()
            .regex(
                /^(?=.*\\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                "Password must be between 8 to 32 characters, must include at least 1 uppercase and lowercase letter and 1 special character",
            ),
    ),
    confirm_password: z.string(
        z
            .string()
            .regex(/^(?=.*\\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                "Password must be between 8 to 32 characters, must include at least 1 uppercase and lowercase letter and 1 special character",),
    ),
}).refine((data) => data.password === data.confirm_password, {
    message:"Passwords must match",
    path: ["confirm_password"]
}).refine((data) => data.email === data.confirm_email, {
    message: "Email addresses must match",
    path: ["confirm_email"],
});