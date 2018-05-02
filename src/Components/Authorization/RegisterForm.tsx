import React from "react"
import styled from "styled-components"
import { Formik, FormikProps } from "formik"

import {
  FormContainer,
  GrayFacebookButton,
  TOSCheckbox,
} from "./commonElements"
import Input from "../Input"
import Button from "../Buttons/Inverted"
import { FormComponentType, InputValues } from "./Types"

import { Validators } from "./Validators"

import Text from "../Text"
import TextLink from "../TextLink"
import Colors from "../../Assets/Colors"

const LoginText = styled(Text).attrs({
  color: Colors.grayDark,
  align: "center",
})`
  margin-top: 0;
`

const SignUpButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin-top: 50px;
`

export const RegisterForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={Validators}
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
          <FormContainer onSubmit={handleSubmit}>
            <Input
              block
              quick
              error={touched.name && errors.name}
              placeholder="Enter your full name"
              name="name"
              label="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              block
              quick
              error={touched.email && errors.email}
              placeholder="Enter your email address"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              block
              quick
              error={touched.password && errors.password}
              placeholder="Enter a password"
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
                {"I agree to the "}
                <TextLink href="https://www.artsy.net/terms" target="_blank">
                  Terms Of Service
                </TextLink>
                {" and "}
                <TextLink href="https://www.artsy.net/privacy" target="_blank">
                  Privacy Policy
                </TextLink>
              </Text>
            </TOSCheckbox>
            <SignUpButton disabled={isSubmitting}>Sign Up</SignUpButton>
            <GrayFacebookButton>Sign up with Facebook</GrayFacebookButton>
            <LoginText>
              Already have an account?{" "}
              <TextLink onClick={props.handleChangeMode("login")}>
                Login
              </TextLink>
            </LoginText>
          </FormContainer>
        )
      }}
    </Formik>
  )
}
