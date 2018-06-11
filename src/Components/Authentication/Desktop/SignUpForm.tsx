import React from "react"
import styled from "styled-components"
import { Formik, FormikProps } from "formik"

import { Error, Footer, FormContainer, TOSCheckbox } from "../commonElements"
import Text from "Components/Text"
import TextLink from "Components/TextLink"
import Input from "Components/Input"
import { FormComponentType, InputValues, ModalType } from "../Types"
import Button from "Components/Buttons/Inverted"
import { SignUpValidator } from "../Validators"
import Colors from "Assets/Colors"

const SignUpButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin-top: auto;
`

export const SignUpForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={SignUpValidator}
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
        status,
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
              showPasswordMessage
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
            {status && !status.success && <Error show>{status.error}</Error>}
            <SignUpButton disabled={isSubmitting}>Sign Up</SignUpButton>
            <Footer
              handleTypeChange={() => props.handleTypeChange(ModalType.login)}
            />
          </FormContainer>
        )
      }}
    </Formik>
  )
}
