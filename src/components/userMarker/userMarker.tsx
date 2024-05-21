import styles from './userMarker.module.scss'
import Image from 'next/image'
import typography from '@/scss/typography.module.scss'
import StarIcon from '@mui/icons-material/Star'
import { Button, Spinner } from '@chakra-ui/react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useEffect, useState } from 'react'
export default function UserMarker({ place }) {
    const [photo, setPhoto] = useState(null)
    const [check, setCheck] = useState(false)
    const [reactions, setReactions] = useState(null)
    useEffect(() => {
        fetch('api/reactionsGet', {
            method: 'POST',
            body: JSON.stringify({ id: place.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((server) => {
                setReactions(server)
            })
            .catch((err) => {
                console.log('Getting reactions' + err)
            })
    }, [])
    useEffect(() => {
        fetch('api/checkinGet', {
            method: 'POST',
            body: JSON.stringify({ id: place.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((server) => {
                console.log(server)
                setCheck(server)
            })
            .catch((err) => {
                console.log('Getting checkin' + err)
            })
    }, []);
    const add_reaction = (emoji_id) => {
        let payload
        if (reactions.emoji == 0) {
            payload = JSON.stringify({
                emoji_id: emoji_id,
                point_id: place.id,
                existing: false,
            })
        } else if (emoji_id != 0 && reactions.emoji != 0 && emoji_id !== reactions.emoji) {
            payload = JSON.stringify({
                emoji_id: emoji_id,
                point_id: place.id,
                existing: true,
            })
        } else if (emoji_id === reactions.emoji) {

            payload = JSON.stringify({
                emoji_id: 0,
                point_id: place.id,
                existing: true,
            })
        }
        fetch('api/reactionsSend', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((server) => {
                setReactions(server)
            })
            .catch((err) => {
                console.log('sending reactions' + err)
            })
    }
    const add_checkin = async () => {
        const payload = JSON.stringify({ id: place.id, check_in: check })
        fetch('api/checkinSend', {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((server) => {
                console.log("server checkin" + server.check_in)
                setCheck(server.check_in)
            })
            .catch((err) => {
                console.log('POSTING USER checkins ' + err)
            })
    }
    const fetch_photo = async () => {
        fetch('api/dbPhoto', {
            method: 'POST',
            body: JSON.stringify({
                photos_partial_url: place.photos_partial_url,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((photo) => {
                setPhoto(photo.url)
            })
            .catch((err) => {
                console.log('POSTING USER checkins' + err)
            })
    }

    return (
        <div className={styles.container__recommendation}>
            <div>
                <div className={styles.container__recommendation__heading}>
                    <h4 className={typography.heading4}>{place.name}</h4>
                </div>
            </div>
            <div className={styles.container__photo}>
                <GetImage
                    photo={photo}
                    place={place}
                    fetch_photo={fetch_photo}
                />
            </div>
            <div className={styles.interact}>
                <GetEmojis reactions={reactions} add_reaction={add_reaction} />
                {check ? (
                    <Button
                        className={styles.button}
                        colorScheme="green"
                        size="xs"
                        onClick={() => add_checkin()}
                    >
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                    </Button>
                ) : (
                    <Button
                        className={styles.button}
                        size="xs"
                        onClick={() => add_checkin()}
                        style={{width: "5rem", height: "2rem"}}

                    >
                        <p className={typography.paragraph}>Check-in</p>
                    </Button>
                )}
            </div>
        </div>
    )
}

function GetEmojis({ reactions, add_reaction }) {
    const emojis = [
        { name: 'like', emoji: '👍', id: '1' },
        { name: 'hearts', emoji: '😍', id: '2' },
        { name: 'poop', emoji: '💩', id: '3' },
        { name: 'skull', emoji: '💀', id: '4' },
        { name: 'slay', emoji: '💅', id: '5' },
    ]
    return (
        <div className={styles.container__react}>
            <div className={styles.container__count}>
                <span
                    className={styles.emoji}
                    role="img"
                    aria-label="heart eyes emoji"
                >
                    👍
                </span>
                <p className={typography.paragraph__grey} style={{ margin: 0 }}>
                    {reactions?.reactions}
                </p>
            </div>
            <div className={styles.container__emojis}>
                {emojis.map((emoji) => {
                    return (
                        <span
                            className={
                                reactions?.emoji == emoji.id
                                    ? styles.emoji__highlighted
                                    : styles.emoji
                            }
                            role="img"
                            aria-label={emoji.name}
                            onClick={() => add_reaction(emoji.id)}
                            key={emoji.id}
                        >
                            {emoji.emoji}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
function GetImage({ place, photo, fetch_photo }) {
    switch (place.provider) {
        case 'google':
            return (
                <Image
                    className={styles.image}
                    alt={'rec'}
                    src={
                        // place.photos_partial_url
                        //     ? 'https://places.googleapis.com/v1/' +
                        //     place.photos_partial_url +
                        //     '/media?key=' +
                        //     'AIzaSyAIsf4soyAtus8dVesxV_Smt6Bl9RJoxJU&' +
                        //     'maxHeightPx=400&maxWidthPx=400 :
                        '/fallback/recommendation.jpg'
                    }
                    style={{ objectFit: 'cover' }}
                    fill={true}
                />
            )
        case 'foursquare':
            return (
                <Image
                    className={styles.image}
                    alt={'rec'}
                    src={
                        place.photos_partial_url
                            ? place.photos_partial_url
                            : '/fallback/recommendation.jpg'
                    }
                    style={{ objectFit: 'cover' }}
                    fill={true}
                />
            )
        case 'user':
            fetch_photo()
            if (photo) {
                return (
                    <Image
                        className={styles.image}
                        alt={'rec'}
                        src={photo ? photo : '/fallback/recommendation.jpg'}
                        style={{ objectFit: 'cover' }}
                        fill={true}
                    />
                )
            }
            return (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            )
    }
}
