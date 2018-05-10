import React from "react"
import styled from "styled-components"
import { Formik, FormikProps } from "formik"

import {
  ChangeMode,
  FormContainer,
  GrayFacebookButton,
  TOSCheckbox,
} from "./commonElements"
import Text from "../Text"
import TextLink from "../TextLink"
import Input from "../Input"
import { FormComponentType, InputValues } from "./Types"
import Button from "../Buttons/Inverted"
import { RegisterValidator } from "./Validators"
import Colors from "../../Assets/Colors"

const LoginText = styled(Text).attrs({
  color: Colors.grayDark,
  align: "center",
})`
  margin: 0;
`

const SignUpButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin-top: auto;
`

export const RegisterForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={RegisterValidator}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }: FormikProps<InputValues>) => {
        const checkboxError =
          touched.acceptedTermsOfService && errors.acceptedTermsOfService
        return (
          <FormContainer onSubmit={handleSubmit}>
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
            <TOSCheckbox
              error={checkboxError}
              checked={values.acceptedTermsOfService}
              value={values.acceptedTermsOfService}
              type="checkbox"
              name="acceptedTermsOfService"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <Text color={checkboxError ? Colors.redMedium : Colors.grayDark}>
                {"I agree to the "}
                <TextLink
                  href="https://www.artsy.net/terms"
                  target="_blank"
                  color={checkboxError ? Colors.redMedium : Colors.grayDark}
                  underline
                >
                  Terms Of Service
                </TextLink>
                {" and "}
                <TextLink
                  href="https://www.artsy.net/privacy"
                  target="_blank"
                  color={checkboxError ? Colors.redMedium : Colors.grayDark}
                  underline
                >
                  Privacy Policy
                </TextLink>
              </Text>
            </TOSCheckbox>
            <SignUpButton disabled={isSubmitting}>Sign Up</SignUpButton>
            <GrayFacebookButton>Sign up with Facebook</GrayFacebookButton>
            <LoginText>
              Already have an account?{" "}
              <ChangeMode onClick={() => props.handleTypeChange("login")}>
                Login
              </ChangeMode>
            </LoginText>
          </FormContainer>
        )
      }}
    </Formik>
  )
}
