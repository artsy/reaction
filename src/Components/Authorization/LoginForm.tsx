import { Formik, FormikProps } from "formik"
import React from "react"
import Yup from "yup"

import {
  BlockButton as Button,
  ChangeMode,
  FormContainer as Form,
  inputValidators,
  GrayFacebookButton,
  StyledInput as Input,
  TOSCheckbox,
} from "./commonElements"

import Colors from "../../Assets/Colors"
import Text from "../Text"
import TextLink from "../TextLink"
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
              placeholder="Please enter your email address"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              block
              error={touched.password && errors.password}
              placeholder="Enter your password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TOSCheckbox
              error={
                touched.acceptedTermsOfService && errors.acceptedTermsOfService
              }
              value={values.acceptedTermsOfService}
              type="checkbox"
              name="accepted-terms-of-service"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.acceptedTermsOfService}
            >
              <Text color={Colors.grayDark}>
                I Agree to the <TextLink>Terms Of Service</TextLink> And{" "}
                <TextLink>Privacy Policy</TextLink>
              </Text>
            </TOSCheckbox>
            <Button type="submit" disabled={isSubmitting}>
              Log In
            </Button>
            <GrayFacebookButton>Log In with Facebook</GrayFacebookButton>
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
