import styles from './searchBar.module.scss'
import typography from '@/scss/typography.module.scss'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { colorgrey900 } from '@/components/variables'

const default_color = '#38A169'
// @ts-ignore
export default function SearchBar({
    handleLocationClick,
    handleSubmitGeocode,
    handleCategorySelect,
}) {
    const [dropdown, setDropdown] = useState(false)
    const handleSetDropdown = () => {
        setDropdown(!dropdown)
    }
    return (
        <div className={styles.container}>
            <div className={styles.container__input}>
                <div className={styles.container__category}>
                    <button
                        className={styles.input__button}
                        onClick={handleSetDropdown}
                    >
                        <SwapVertIcon
                            sx={{ fontSize: 28 }}
                            htmlColor={colorgrey900}
                        />
                    </button>
                    {dropdown ? (
                        <div className={styles.categories}>
                            <button
                                className={
                                    typography.paragraph +
                                    ' ' +
                                    styles.categories__select
                                }
                                onClick={() => {
                                    handleCategorySelect('Trippy')
                                    handleSetDropdown()
                                }}
                            >
                                Trippy Suggestions
                            </button>
                            <button
                                className={
                                    typography.paragraph +
                                    ' ' +
                                    styles.categories__select
                                }
                                onClick={() => {
                                    handleCategorySelect('Friends')
                                    handleSetDropdown()
                                }}
                            >
                                Friends
                            </button>
                            <button
                                className={
                                    typography.paragraph +
                                    ' ' +
                                    styles.categories__select
                                }
                                onClick={() => {
                                    handleCategorySelect('Personal')
                                    handleSetDropdown()
                                }}
                            >
                                Personal
                            </button>
                        </div>
                    ) : null}
                </div>
                <form
                    method="post"
                    onSubmit={handleSubmitGeocode}
                    className={styles.container__forms}
                >
                    <input
                        name="locationName"
                        className={styles.input + ' ' + typography.paragraph}
                        placeholder={'Enter Location'}
                    />
                    <button className={styles.input__button} type={'submit'}>
                        <SearchIcon
                            sx={{ fontSize: 28 }}
                            htmlColor={colorgrey900}
                        />
                    </button>
                </form>
            </div>
            <div className={styles.container__marker}>
                <button
                    className={styles.input__button}
                    onClick={handleLocationClick}
                >
                    <MyLocationIcon
                        sx={{ fontSize: 24 }}
                        htmlColor={colorgrey900}
                    />
                </button>
            </div>
        </div>
    )
}
