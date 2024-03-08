"use client"

import typography from "../../../scss/typography.module.scss"
import styles from "./page.module.scss";
import Image from "next/image";
import {Button, Divider, Input} from "@chakra-ui/react";
import Link from "next/link";

export default function Login() {
    return(
        <div className={styles.container}>
            <div className={styles.container__logo}>
                <Image src={"/icons/text_logo_color.png"} fill={true} alt={"Trippy Logo"}
                       style={{objectFit: "contain"}}/>
            </div>
            <div className={styles.container__login}>
                <h3 className={typography.heading3}>Create an account</h3>
                <form className={styles.container__details}>
                        <Input placeholder='Email address' className={typography.paragraph}/>
                        <Input placeholder='Confirm email address' className={typography.paragraph}/>
                        <Input placeholder='Password' className={typography.paragraph}/>
                        <Button className={typography.paragraph}>Create an account</Button>

                </form>
                <div className={styles.container__recovery}>
                    <p className={typography.paragraph__small}>Already have an account?</p>
                    <Link href={"/auth/login"} className={typography.paragraph__small__green}>Log in</Link>
                </div>
            </div>
        </div>)
}