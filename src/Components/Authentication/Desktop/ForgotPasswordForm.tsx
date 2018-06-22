import { Formik, FormikProps } from "formik"
import React from "react"
import styled from "styled-components"

import {
  Error,
  Footer,
  FormContainer as Form,
} from "Components/Authentication/commonElements"
import Button from "Components/Buttons/Inverted"
import Input from "Components/Input"
import { FormComponentType, InputValues, ModalType } from "../Types"
import { ForgotPasswordValidator } from "../Validators"

const SubmitButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin: auto 0 10px 0;
`

export const ForgotPasswordForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={ForgotPasswordValidator}
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
        const hasErrors = Object.keys(errors).length > 0

        return (
          <Form onSubmit={handleSubmit} height={180}>
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
            {status && !status.success && <Error show>{status.error}</Error>}
            <SubmitButton
              block
              type="submit"
              disabled={isSubmitting || hasErrors}
            >
              Send Reset Instructions
            </SubmitButton>
            <Footer
              handleTypeChange={() => props.handleTypeChange(ModalType.login)}
              mode="forgot"
            />
          </Form>
        )
      }}
    </Formik>
  )
}
