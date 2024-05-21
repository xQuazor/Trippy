import styles from './recommendationList.module.scss'
import typography from '../../scss/typography.module.scss'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { colorblack900 } from '@/components/variables'
import Recommendation from '@/components/recommendation/recommendation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import recommendation_box from '../recommendation/recommendation.module.scss'

const variants = {
    open: { opacity: 1, transition: { ease: 'easeIn' }, height: '20rem' },
    closed: { opacity: 1, transition: { ease: 'easeIn' }, height: '4rem' },
}
export default function RecommendationList({ places }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <motion.nav animate={isOpen ? 'open' : 'closed'} variants={variants}>
            <div className={styles.container}>
                <Button setIsOpen={setIsOpen} isOpen={isOpen} />
                {isOpen ? <RenderRecommendation places={places} /> : null}
            </div>
        </motion.nav>
    )
}
function Button({ setIsOpen, isOpen }) {
    return (
        <button
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            className={styles.container__heading}
        >
            <ArrowDownwardIcon
                htmlColor={colorblack900}
                sx={{ fontSize: 32 }}
                style={
                    isOpen
                        ? { transitionDuration: '0.5s' }
                        : {
                              transform: 'rotate(180deg)',
                              transitionDuration: '0.5s',
                          }
                }
            />
            <h3 className={typography.heading3}>Top Picks</h3>
        </button>
    )
}

function RenderRecommendation({ places }) {
    return (
        <div className={styles.container__content}>
            {places ? (
                places.map((marker, id) => {
                    return <Recommendation key={id} place={marker} />
                })
            ) : (
                <div
                    className={recommendation_box.container__recommendation}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </div>
            )}
        </div>
    )
}
