import { Formik, FormikProps } from "formik"
import React from "react"
import styled from "styled-components"

import {
  Error,
  Footer,
  FormContainer as Form,
  TermsOfServiceCheckbox,
} from "Components/Authentication/commonElements"
import {
  FormComponentType,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import { SignUpValidator } from "Components/Authentication/Validators"
import Button from "Components/Buttons/Inverted"
import Input from "Components/Input"

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
        dirty,
        status,
      }: FormikProps<InputValues>) => {
        const hasErrors = Object.keys(errors).length > 0

        return (
          <Form onSubmit={handleSubmit} height={430}>
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
            <TermsOfServiceCheckbox
              error={
                touched.acceptedTermsOfService && errors.acceptedTermsOfService
              }
              checked={values.acceptedTermsOfService}
              value={values.acceptedTermsOfService}
              type="checkbox"
              name="acceptedTermsOfService"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {status && !status.success && <Error show>{status.error}</Error>}
            <SignUpButton disabled={isSubmitting || hasErrors || !dirty}>
              Sign Up
            </SignUpButton>
            <Footer
              handleTypeChange={() => props.handleTypeChange(ModalType.login)}
              inline
            />
          </Form>
        )
      }}
    </Formik>
  )
}
