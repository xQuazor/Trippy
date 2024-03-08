import styles from "./searchbar.module.scss";
import typography from "@/scss/typography.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {colorgrey900} from "@/components/variables";

const default_color = "#38A169";
// @ts-ignore
export default function SearchBar({passLocation, getLocationQuery}) {

  return (
    <div className={styles.container}>
      <div className={styles.container__input}>
        <button className={styles.input__button}>
          <SwapVertIcon sx={{ fontSize: 28 }} htmlColor={colorgrey900}/>
        </button>
        <form
          method="post"
          onSubmit={getLocationQuery}
          className={styles.container__forms}
        >
            <input
                name="locationName"
                className={styles.input + " " + typography.paragraph}
                placeholder={"Enter Location"}
            />
            <button className={styles.input__button} type={"submit"}>
                <SearchIcon sx={{fontSize: 28}} htmlColor={colorgrey900} />
            </button>
        </form>
      </div>
        <div className={styles.container__marker}>
            <button className={styles.input__button} onClick={passLocation}>
                <MyLocationIcon sx={{fontSize: 24}} htmlColor={colorgrey900} />
            </button>
        </div>
    </div>
  );
}