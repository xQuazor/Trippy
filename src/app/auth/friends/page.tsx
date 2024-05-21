'use client'
import typography from '../../../scss/typography.module.scss'
import styles from './page.module.scss'
import { useEffect, useRef, useState } from 'react'
import {Input, Divider, Button} from '@chakra-ui/react'
export default function Friends() {
    const [friends, setFriends] = useState(null)
    const [fetchStatus, setFetchStatus] = useState(null)
    const [searchPerson, setSearchPerson] = useState(null);
    const handleSetSearchPerson = (event) => {
        event.preventDefault()
        setSearchPerson(event.target.value)
    }
    useEffect(() => {
        fetch('api/friends', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((fetchedData) => setFriends(fetchedData))
            .catch((err) => {
                console.log('Error fetching ' + err)
            })
    }, [])
    const add_friends = (event) => {
        event.preventDefault();
        const payload = JSON.stringify({query_email: searchPerson})
        fetch('api/friends', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((body) => setFetchStatus(body))
            .catch((err) => {
                console.log(err)
            })
    }
    // add_friends()
    return (
        <div className={styles.container}>
            <h3 className={typography.heading3}>Friend List</h3>
            <Divider style={{ marginBottom: '1rem' }} />
            <div className={styles.container__friend}>
                {friends?.map((friend, id) => {
                    return (
                        <p key={id} className={typography.paragraph}>
                            {id + 1 + '. '}
                            {friend.profiles.username}
                        </p>
                    )
                })}
            </div>
            {fetchStatus ? (
                <p className={typography.paragraph}>{fetchStatus}</p>
            ) : null}
            <div className={styles.input}>
                <p
                    className={typography.heading4}
                    style={{ textAlign: 'right' }}
                >
                    Add Friend
                </p>
                <form onSubmit={add_friends}>
                <Input placeholder="find user"  onChange={handleSetSearchPerson}/>
                <Button className={typography.paragraph} type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}
