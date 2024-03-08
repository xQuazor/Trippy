"use client"

import { motion } from "framer-motion";
import styles from "./page.module.scss";
import Image from "next/image";
import {Button} from "@chakra-ui/react";
export default function Login() {
    return(
        <div className={styles.container}>
            <div className={styles.container__left}>
                <motion.div
                    className={styles.logo}
                    animate={{
                        scale: [1, 2, 2, 1, 1],
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
            </div>
            <div className={styles.container__right}>
                <Button>
                    Sign Up
                </Button>
                <Button>
                    Login
                </Button>
            </div>
        </div>)
}