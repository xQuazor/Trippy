'use client'

import typography from '../../../scss/typography.module.scss'
import { useRouter } from 'next/navigation'
import styles from './page.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Input } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import {signup} from "@/app/(auth)/signup/actions";
interface IFormInput {
    email: string
    confirm_email: string
    password: string
    confirm_password: string
}

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        reset,
        setError,
    } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        const response = await signup(data);
        if (!response?.success) {
            alert('Invalid Email or Password')
            return
        }
        reset()
    }
    return (
        <div className={styles.container + ' ' + styles.background}>

            <div className={styles.container__logo}>
                <Image
                    src={'/icons/text_logo_color.png'}
                    fill={true}
                    alt={'Trippy Logo'}
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className={styles.container__login}>
                <h3 className={typography.heading3}>Create an account</h3>
                <form
                    className={styles.container__details}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={styles.container__error}>
                        <Input
                            placeholder="Email address"
                            errorBorderColor="crimson"
                            isInvalid={!!errors.email}
                            className={typography.paragraph}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                        />
                        {!errors.email && isSubmitting && (
                            <div className={styles.error__box}>
                                <CheckCircleOutlineOutlinedIcon
                                    htmlColor={'#50C878'}
                                />
                            </div>
                        )}
                        {errors.email && (
                            <div className={styles.error__box}>
                                <div className={styles.error__anchor}>
                                    <HighlightOffOutlinedIcon
                                        htmlColor={'#df2c14'}
                                    />
                                    <p
                                        className={
                                            typography.paragraph +
                                            ' ' +
                                            styles.error__message
                                        }
                                    >
                                        {errors.email?.message}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.container__error}>
                        <Input
                            placeholder="Confirm email address"
                            errorBorderColor="crimson"
                            className={typography.paragraph}
                            isInvalid={!!errors.confirm_email}
                            {...register('confirm_email', {
                                required: 'Confirm Email is required',
                                validate: (value) =>
                                    value === getValues('email') ||
                                    'Emails must match',
                                maxLength: 100,
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Enter a valid email address',
                                },
                            })}
                        />
                        {!errors.confirm_email && isSubmitting && (
                            <div className={styles.error__box}>
                                <CheckCircleOutlineOutlinedIcon
                                    htmlColor={'#50C878'}
                                />
                            </div>
                        )}
                        {errors.confirm_email && (
                            <div className={styles.error__box}>
                                <div className={styles.error__anchor}>
                                    <HighlightOffOutlinedIcon
                                        htmlColor={'#df2c14'}
                                    />
                                    <p
                                        className={
                                            typography.paragraph +
                                            ' ' +
                                            styles.error__message
                                        }
                                    >
                                        {errors.confirm_email?.message}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.container__error}>
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
                        {!errors.password && isSubmitting && (
                            <div className={styles.error__box}>
                                <CheckCircleOutlineOutlinedIcon
                                    htmlColor={'#50C878'}
                                />
                            </div>
                        )}
                        {errors.password && (
                            <div className={styles.error__box}>
                                <div className={styles.error__anchor}>
                                    <HighlightOffOutlinedIcon
                                        htmlColor={'#df2c14'}
                                    />
                                    <p
                                        className={
                                            typography.paragraph +
                                            ' ' +
                                            styles.error__message
                                        }
                                    >
                                        {errors.password?.message}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.container__error}>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            errorBorderColor="crimson"
                            isInvalid={!!errors.confirm_password}
                            className={typography.paragraph}
                            {...register('confirm_password', {
                                required: 'Confirm Password is required',
                                validate: (value) =>
                                    value === getValues('password') ||
                                    'Passwords must match',
                                maxLength: {
                                    value: 32,
                                    message:
                                        'Password must be shorter than 32 characters',
                                },
                                minLength: {
                                    value: 8,
                                    message:
                                        'Password must be at least 8 characters',
                                },
                            })}
                        />
                        {!errors.confirm_password && isSubmitting && (
                            <div className={styles.error__box}>
                                <CheckCircleOutlineOutlinedIcon
                                    htmlColor={'#50C878'}
                                />
                            </div>
                        )}
                        {errors.confirm_password && (
                            <div className={styles.error__box}>
                                <div className={styles.error__anchor}>
                                    <HighlightOffOutlinedIcon
                                        htmlColor={'#df2c14'}
                                    />
                                    <p
                                        className={
                                            typography.paragraph +
                                            ' ' +
                                            styles.error__message
                                        }
                                    >
                                        {errors.confirm_password?.message}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={typography.paragraph}
                    >
                        Create an account
                    </Button>
                </form>
                <div className={styles.container__recovery}>
                    <p className={typography.paragraph__small}>
                        Already have an account?
                    </p>
                    <Link
                        href={'/login'}
                        className={typography.paragraph__small__green}
                    >
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}
