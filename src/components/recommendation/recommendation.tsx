import styles from './recommendation.module.scss'
import Image from 'next/image'
import typography from '@/scss/typography.module.scss'
import StarIcon from '@mui/icons-material/Star'

export default function Recommendation({ place }) {
    return (
        <div className={styles.container__recommendation}>
            <GetImage place={place} />
            <div className={styles.backdrop}></div>
            <div>
                <div className={styles.container__recommendation__heading}>
                    <h4 className={typography.heading4__white}>{place.name}</h4>
                </div>
                <div className={styles.container__recommendation__subHeading}>
                    <p className={typography.paragraph__small__green}>
                        {place.rating ? (
                            <>
                                {place.rating}
                                <StarIcon sx={{ fontSize: 12 }} />
                            </>
                        ) : null}
                    </p>
                    <p className={typography.paragraph__small__white}>
                        {place.address}
                    </p>
                </div>
            </div>
            <div className={styles.container__recommendation__body}>
                {place.editorialSummary ? (
                    <p className={typography.paragraph__white}>
                        {place.editorialSummary.text}
                    </p>
                ) : null}
            </div>
        </div>
    )
}
function GetImage({ place }) {
    switch (place.provider) {
        case 'google':
            return (
                <Image
                    className={styles.image}
                    alt={'rec'}
                    src={'/fallback/recommendation.jpg'}
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
    }
}
