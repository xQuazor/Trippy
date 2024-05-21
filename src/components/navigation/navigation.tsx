'use client'

import styles from './navigation.module.scss'
import typography from '../../scss/typography.module.scss'

import MenuIcon from '@mui/icons-material/Menu'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import PeopleIcon from '@mui/icons-material/People'
import LogoutIcon from '@mui/icons-material/Logout';

import Image from 'next/image'
import Link from 'next/link'

import { usePathname, useRouter} from 'next/navigation'
import { useState } from 'react'

import { createClient } from '@/utils/supabase/client'
import { colorgrey900} from "@/components/variables";

const default_color = colorgrey900

export default function Navigation( {username}) {
    const pathname = usePathname()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const client = createClient()
    const toggleSetOpen = () => {
        setOpen((open) => !open)
    }
    const signOut = async () => {
        const { error } = await client.auth.signOut()
        if (error) {
            alert('There was an error, sign out again')
        }
        router.push('/login')
    }

    return (
        <div className={open ? styles.container__open : styles.container}>
            <div className={styles.container__icons}>
                <button
                    onClick={toggleSetOpen}
                    className={open ? styles.link__active : styles.link}
                >
                    <MenuIcon htmlColor={default_color} sx={{ fontSize: 24 }} />
                    {open ? <p className={typography.paragraph__grey}>Menu</p> : null}
                </button>
                <Link
                    href={'/auth/friends'}
                    className={`link ${pathname === '/auth/friends' ? styles.link__active : styles.link}`}
                >
                    <PeopleIcon
                        htmlColor={default_color}
                        sx={{ fontSize: 24 }}
                    />
                    {open ? (
                        <p className={`link ${pathname === '/auth/friends' ? typography.paragraph : typography.paragraph__grey}`}>Friends</p>
                    ) : null}
                </Link>
                <Link
                    href={'/auth/explore'}
                    className={`link ${pathname === '/auth/explore' ? styles.link__active : styles.link}`}
                >
                    <TravelExploreIcon
                        htmlColor={default_color}
                        sx={{ fontSize: 24 }}
                    />
                    {open ? (
                        <p className={`link ${pathname === '/auth/explore' ? typography.paragraph : typography.paragraph__grey}`}>Explore</p>
                    ) : null}
                </Link>

            </div>
            <div className={styles.container__profile}>
                <Link           href={'/auth/profile'}
                                className={`link ${pathname === '/auth/profile' ? styles.link__active : styles.link}`}>
                <div className={styles.container__profile__user}>

                    <div className={styles.container__profile__picture}>
                        <Image
                            fill={true}
                            src={'/icons/empty_profile.png'}
                            alt={'profile picture'}
                        ></Image>
                    </div>
                    {open ? (
                        <p className={typography.paragraph} style={{ textOverflow: "ellipsis"}}>Profile</p>
                    ) : null}
                </div>
                </Link>

                <button
                    onClick={signOut}
                    className={styles.link}
                    aria-label={"Sign Out"}
                >
                    <LogoutIcon htmlColor={default_color} sx={{fontSize: 28}}/>
                    {open ? (
                        <p className={typography.paragraph}>Log Out</p>
                    ) : null}
                </button>
            </div>
        </div>
    )
}
