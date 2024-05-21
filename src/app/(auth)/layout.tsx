"use server"

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function  RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const supabase = createClient();
    const{ data: {user}} = await supabase.auth.getUser();
    if(user){
        redirect('/auth/explore')
    }
    return (<>
                {children}
        </>
    );
}
