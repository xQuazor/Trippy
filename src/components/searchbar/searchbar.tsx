import styles from "./searchbar.module.scss";
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const default_color = "#38A169";
// @ts-ignore
export default function SearchBar({passLocation, getLocationQuery}) {

  return (
    <div className={styles.container}>
      <div className={styles.container__input}>
        <button className={styles.input__button}>
          <SwapVertIcon sx={{ fontSize: 28 }} />
        </button>
        <form method="post" onSubmit={getLocationQuery}>
          <input
              name="locationName"
            className={styles.input}
            placeholder={"Enter Location"}
          />
        </form>

        <button className={styles.input__button}>
          <SearchIcon sx={{ fontSize: 28 }} />
        </button>
      </div>
      <div className={styles.container__marker}>
        <button className={styles.input__button} onClick={passLocation}>
          <MyLocationIcon sx={{ fontSize: 24 }} /*htmlColor={default_color}*/ />
        </button>
      </div>
    </div>
  );
}