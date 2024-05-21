import typography from '../../../scss/typography.module.scss'
import { createClient } from '@/utils/supabase/server'
import styles from './page.module.scss'
import { Divider } from '@chakra-ui/react'

export default async function Profile() {
    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return (
        <div className={styles.container}>
            <h3 className={typography.heading3}>Profile</h3>
            <Divider />
            <div>
                <p className={typography.paragraph}>Email Address </p>
                <p className={typography.paragraph}>
                    {user ? user.email : 'loading'}
                </p>
            </div>
        </div>
    )
}
