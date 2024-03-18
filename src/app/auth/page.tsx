"use client"

import { motion } from "framer-motion";
import typography from "../../scss/typography.module.scss"
import styles from "./page.module.scss";
import Image from "next/image";
import {Button} from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import Link from "next/link";


export default function Auth() {
    return(
        <div className={styles.container}>
            <div className={styles.container__left}>
                <motion.div
                    className={styles.logo}
                    animate={{
                        scale: [1, 1.5, 1.5, 1, 1],
                        rotate: [0, 0, 180, 360, 0],
                        borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                    }}
                    transition={{
                        duration: 8,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                >
                    <div className={styles.logo__container}>
                        <Image src={"/icons/logo.png"} fill={true} alt={"alt"} style={{objectFit: "contain"}}/>
                    </div>
                </motion.div>
               <div className={styles.container__typewriter}>
                   <p className={typography.heading2__white} >
                       Trippy
                   </p>
                   <Typewriter
                       options={{
                           strings: ['For an interesting tomorrow.'],
                           autoStart: true,
                           loop: true,
                           wrapperClassName: typography.paragraph__white,
                       }}
                   />
               </div>
            </div>
            <div className={styles.container__right}>
                <h1 className={typography.heading2}>
                    Get Started
                </h1>
                <div className={styles.button__group}>
                    <Link href={"auth/login"}>
                        <Button className={typography.paragraph} width={"8rem"}>
                            Login
                        </Button>
                    </Link>
                    <Link href={"auth/signup"}>
                        <Button className={typography.paragraph} width={"8rem"}>
                            Sign Up
                        </Button>
                    </Link>
                </div>
                <div className={styles.bottom__anchor}>
                    <div className={styles.logo__text}>
                        <Image src={"/icons/text_logo_bw.png"} alt={"alt"} fill={true} style={{objectFit: "contain"}}/>
                    </div>
                </div>
            </div>
        </div>);
}