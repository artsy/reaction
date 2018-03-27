import { Formik, FormikProps } from "formik"
import React from "react"
import Yup from "yup"

import {
  BlockButton as Button,
  ChangeMode,
  FormContainer as Form,
  inputValidators,
  StyledFacebookButton,
  StyledInput as Input,
} from "./commonElements"
import { FormComponentType, InputValues } from "./Types"

export const LoginForm: FormComponentType = props => {
  const { email: emailValidator } = inputValidators
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={Yup.object().shape({
        email: emailValidator,
        password: Yup.string().required("Please enter your password."),
      })}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }: FormikProps<InputValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Input
              block
              error={touched.email && errors.email}
              name="email"
              placeholder="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              block
              error={touched.password && errors.password}
              name="password"
              placeholder="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit" disabled={isSubmitting}>
              Log In
            </Button>
            <StyledFacebookButton>Log In with Facebook</StyledFacebookButton>
            <ChangeMode handleClick={props.handleChangeMode("register")}>
              Sign Up
            </ChangeMode>
            <ChangeMode handleClick={props.handleChangeMode("reset_password")}>
              Forgot Password
            </ChangeMode>
          </Form>
        )
      }}
    </Formik>
  )
}
