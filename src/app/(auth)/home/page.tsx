'use client'

import { motion } from 'framer-motion'
import typography from '../../../scss/typography.module.scss'
import styles from './page.module.scss'
import Image from 'next/image'
import { Button } from '@chakra-ui/react'
import Typewriter from 'typewriter-effect'
import Link from 'next/link'

export default function Auth() {
    return (
        <div className={styles.container}>
            <div className={styles.container__left}>
                <div className={styles.container__maze}>
                    <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 429.986 429.986"
                        xmlSpace="preserve"
                        fill={'transparent'}
                        className={styles.maze_border}
                    >
                        <path
                            stroke="#F5F5F5"
                            strokeWidth="8"
                            className={styles.draw_maze}
                            id="XMLID_46_"
                            d="M429.986,111.996v308.99c0,4.971-4.029,9-9,9H9c-4.971,0-9-4.029-9-9v-52.913c0-4.971,4.029-9,9-9
	s9,4.029,9,9v43.913h84.997v-42.498c0-4.971,4.029-9,9-9s9,4.029,9,9v42.498h290.989v-33.498H317.99c-4.971,0-9-4.029-9-9
	s4.029-9,9-9h93.996V120.996h-42.498c-4.971,0-9-4.029-9-9s4.029-9,9-9h51.498C425.957,102.996,429.986,107.025,429.986,111.996z
	 M111.997,308.989c-4.971,0-9,4.029-9,9s4.029,9,9,9h102.996c4.971,0,9-4.029,9-9v-93.996h42.499c4.971,0,9-4.029,9-9s-4.029-9-9-9
	h-93.996v-42.498c0-4.971-4.029-9-9-9s-9,4.029-9,9v42.498h-42.499c-4.971,0-9,4.029-9,9s4.029,9,9,9h93.996v84.996H111.997z
	 M420.986,0H9C4.029,0,0,4.029,0,9v308.989c0,4.971,4.029,9,9,9h42.498v42.496c0,4.971,4.029,9,9,9s9-4.029,9-9v-93.994h93.998
	c4.971,0,9-4.029,9-9s-4.029-9-9-9H69.498v-42.498c0-4.971-4.029-9-9-9s-9,4.029-9,9v93.996H18V120.996h42.498c4.971,0,9-4.029,9-9
	s-4.029-9-9-9H18V69.498h84.997v84.997H59.145c-4.971,0-9,4.029-9,9s4.029,9,9,9h52.852c4.971,0,9-4.029,9-9V60.498
	c0-4.971-4.029-9-9-9H18V18h136.496v93.996c0,4.971,4.029,9,9,9h102.996c4.971,0,9-4.029,9-9s-4.029-9-9-9h-93.996V18h239.49v33.498
	H214.993c-4.971,0-9,4.029-9,9s4.029,9,9,9h93.997l0.001,84.997h-93.998c-4.971,0-9,4.029-9,9s4.029,9,9,9h93.998v42.248
	c-0.002,0.083-0.003,0.166-0.003,0.25s0.001,0.167,0.003,0.25l0.001,51.253c0,4.971,4.029,9,9,9h42.498l-0.002,42.492
	c0,4.971,4.029,9.001,8.999,9.001c0.001,0,0.001,0,0.001,0c4.971,0,9-4.029,9-8.999l0.003-51.494c0-2.387-0.948-4.676-2.636-6.364
	c-1.688-1.688-3.978-2.636-6.364-2.636h-42.499v-33.503h42.494c2.387,0,4.676-0.948,6.364-2.636
	c1.688-1.688,2.636-3.978,2.636-6.364l-0.002-51.498c0-4.971-4.03-9-9-9c-4.971,0-9,4.029-9,9l0.002,42.498h-33.495L326.99,69.498
	h93.996c4.971,0,9-4.029,9-9V9C429.986,4.029,425.957,0,420.986,0z M326.99,317.989c0-4.971-4.029-9-9-9h-42.497l-0.001-42.498
	c0-4.971-4.029-9-9-9s-9,4.029-9,9l0.001,51.363c-0.001,0.045-0.001,0.09-0.001,0.135s0,0.09,0.001,0.135l0.001,42.364h-90.203
	c-4.971,0-9,4.029-9,9s4.029,9,9,9h99.203c2.387,0,4.676-0.948,6.364-2.636c1.688-1.688,2.636-3.978,2.636-6.364l-0.001-42.499
	h42.497C322.961,326.989,326.99,322.96,326.99,317.989z"
                        />
                    </svg>
                </div>
                <div className={styles.container__branding}>
                    <motion.div
                        className={styles.logo}
                        animate={{
                            scale: [1, 1.5, 1.5, 1, 1],
                            rotate: [0, 0, 180, 360, 0],
                            borderRadius: ['0%', '0%', '50%', '50%', '0%'],
                        }}
                        transition={{
                            duration: 8,
                            ease: 'easeInOut',
                            times: [0, 0.2, 0.5, 0.8, 1],
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    >
                        <div className={styles.logo__container}>
                            <Image
                                src={'/icons/logo.png'}
                                fill={true}
                                alt={'alt'}
                                style={{objectFit: 'contain'}}
                            />
                        </div>
                    </motion.div>
                    <div className={styles.container__typewriter}>
                        <p className={typography.heading2__white}>Trippy</p>
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

            </div>
            <div className={styles.container__right}>
                <h1 className={typography.heading2}>Get Started</h1>
                <div className={styles.button__group}>
                    <Link href={'/login'} aria-label={"login"}>
                        <Button className={typography.paragraph} width={'8rem'}>
                            Login
                        </Button>
                    </Link>
                    <Link href={'/signup'} aria-label={"sign up"}>
                        <Button className={typography.paragraph} width={'8rem'}>
                            Sign Up
                        </Button>
                    </Link>
                </div>
                <div className={styles.bottom__anchor}>
                    <div className={styles.logo__text}>
                        <Image
                            src={'/icons/text_logo_bw.png'}
                            alt={'alt'}
                            fill={true}
                            style={{objectFit: 'contain'}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
