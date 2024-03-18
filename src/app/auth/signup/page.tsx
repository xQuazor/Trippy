"use client";

import typography from "../../../scss/typography.module.scss";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm, Form } from "react-hook-form";

interface IFormInput {
  email: string;
  confirm_email: string;
  password: string;
  confirm_password: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    getValues,
    reset,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log(data);
    reset();
  };

  return (
    <div className={styles.container + " " + styles.background}>
      <div className={styles.container__logo}>
        <Image
          src={"/icons/text_logo_color.png"}
          fill={true}
          alt={"Trippy Logo"}
          style={{ objectFit: "contain" }}
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
              type="email"
              placeholder="Email address"
              errorBorderColor="crimson"
              className={typography.paragraph}
              {...register("email", {
                required: "Email is required",
                maxLength: 100,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && (
              <p className={typography.paragraph + " " + styles.error_box}>
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className={styles.container__error}>
            <Input
              placeholder="Confirm email address"
              errorBorderColor="crimson"
              className={typography.paragraph}
              {...register("confirm_email", {
                required: "Confirm Email is required",
                validate: (value) =>
                  value === getValues("email") || "Emails must match",
                maxLength: 100,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.confirm_email && (
              <p className={typography.paragraph + " " + styles.error_box}>
                {errors.confirm_email?.message}
              </p>
            )}
          </div>
          <div className={styles.container__error}>
            <Input
              type="password"
              placeholder="Password"
              errorBorderColor="crimson"
              className={typography.paragraph}
              {...register("password", {
                required: "Password is required",
                maxLength: 32,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className={typography.paragraph + " " + styles.error_box}>
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className={styles.container__error}>
            <Input
              type="password"
              placeholder="Password"
              errorBorderColor="crimson"
              className={typography.paragraph}
              {...register("confirm_password", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords must match",
                maxLength: {
                  value: 32,
                  message: "Password must be at least 8 characters",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.confirm_password && (
              <p className={typography.paragraph + " " + styles.error_box}>
                {errors.confirm_password?.message}
              </p>
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
            href={"/auth/login"}
            className={typography.paragraph__small__green}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
