import React from "react"
import styled from "styled-components"
import { Formik, FormikProps } from "formik"

import { Error, Footer, FormContainer as Form } from "../commonElements"
import { TermsOfServiceCheckbox } from "../TermsOfServiceCheckbox"
import Input from "Components/Input"
import { FormComponentType, InputValues, ModalType } from "../Types"
import Button from "Components/Buttons/Inverted"
import { SignUpValidator } from "../Validators"

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
            <SignUpButton disabled={isSubmitting}>Sign Up</SignUpButton>
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
