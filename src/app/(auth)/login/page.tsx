'use client'

import typography from '../../../scss/typography.module.scss'
import {login} from "./actions";

import styles from './page.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Divider, Input } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
    email: string
    password: string
}
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        reset,
        setError,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        const response = await login(data);
        if (response?.success) {
            alert('Invalid Email or Password')
            return
        }
        reset()
    }
    return (
        <div className={styles.container}>
            <div className={styles.container__logo}>
                <Image
                    src={'/icons/text_logo_color.png'}
                    fill={true}
                    alt={'Trippy Logo'}
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className={styles.container__login}>
                <h3 className={typography.heading3}>Welcome back!</h3>
                <form
                    className={styles.container__details}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Input
                        type="email"
                        placeholder="Email address"
                        errorBorderColor="crimson"
                        className={typography.paragraph}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Enter a valid email address',
                            },
                        })}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        errorBorderColor="crimson"
                        isInvalid={!!errors.password}
                        className={typography.paragraph}
                        {...register('password', {
                            required: 'Password is required',
                            pattern: {
                                value: /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                                message:
                                    'Password must be have an upper and lower case letter, number, special character. Max 32 characters, min 8 characters.',
                            },
                        })}
                    />
                    <Button
                        width={'100%'}
                        type="submit"
                        disabled={isSubmitting}
                        className={typography.paragraph}
                    >
                        Log In
                    </Button>
                </form>
                <Divider />
                <div className={styles.container__recovery}>
                    <p className={typography.paragraph__small__green}>
                        Forgot password?
                    </p>
                    <Link href={'/signup'}>
                        <Button className={typography.paragraph}>
                            Create an account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
