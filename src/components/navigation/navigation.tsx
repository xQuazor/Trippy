"use client"

import styles from "./navigation.module.scss";

import MenuIcon from "@mui/icons-material/Menu";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PeopleIcon from "@mui/icons-material/People";
import ModeIcon from "@mui/icons-material/Mode";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";

const default_color = "#F5F5F5";

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false);
  const toggleSetOpen = () => {
      setOpen(open => !open)
  };

  return (
    <div className={open ? styles.container__open : styles.container}>
      <div className={styles.container__icons}>
        <button onClick={toggleSetOpen} className={styles.toggleButton}>
          <MenuIcon htmlColor={default_color} sx={{ fontSize: 28 }} />
        </button>
        <Link href={"/friends"} className={`link ${pathname === '/friends' ? styles.link__active : styles.link}`} >
          <PeopleIcon htmlColor={default_color} sx={{ fontSize: 28 }} />
          {open ? (<p>Friends</p>) : null}
        </Link>
        <Link href={"/explore"} className={`link ${pathname === '/explore' ? styles.link__active : styles.link}`}>
          <TravelExploreIcon htmlColor={default_color} sx={{ fontSize: 28 }} />
          {open ? (<p>Explore</p>) : null}
        </Link>
        <Link href={"/planner"} className={`link ${pathname === '/planner' ? styles.link__active : styles.link}`}>
          <ModeIcon htmlColor={default_color} sx={{ fontSize: 28 }} />
          {open ? (<p>Planner</p>) : null}
        </Link>
      </div>
      <div className={styles.container__profile}>
        <Image
          fill={true}
          src={"/icons/empty_profile.png"}
          alt={"profile picture"}
        ></Image>
      </div>
    </div>
  );
}
