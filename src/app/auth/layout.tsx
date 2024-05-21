

import Navigation from "@/components/navigation/navigation";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    const supabase = createClient();
    const{ data: {user}} = await supabase.auth.getUser();
    if(!user){
        redirect('/login')
    }
    return (
        <div
            style={{
                  display: "flex",
                  margin: 0,
                  padding: 0,
                  position: "relative",
                }}
        >
            <Navigation username={user.email}></Navigation>
            <div style={{ margin: "0 0 0 4rem" }}>
                {children}
            </div>
        </div>
    );
}
