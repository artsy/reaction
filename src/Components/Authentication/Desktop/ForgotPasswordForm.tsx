import { Formik, FormikProps } from "formik"
import React from "react"

import {
  Error,
  Footer,
  FormContainer as Form,
  SubmitButton,
} from "Components/Authentication/commonElements"
import Input from "Components/Input"
import { FormComponentType, InputValues, ModalType } from "../Types"
import { ForgotPasswordValidator } from "../Validators"

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
            <SubmitButton disabled={isSubmitting || hasErrors}>
              Send reset instructions
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
