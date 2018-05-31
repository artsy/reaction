import React from "react"
import { Formik, FormikProps } from "formik"

import {
  ChangeMode,
  FormContainer as Form,
} from "Components/Authentication/commonElements"
import Input from "Components/Input"
import { FormComponentType, InputValues, ModalType } from "../Types"
import { ResetPasswordValidator } from "../Validators"
import Button from "Components/Buttons/Inverted"

export const ResetPasswordForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={ResetPasswordValidator}
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
        return (
          <Form onSubmit={handleSubmit}>
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
            {/* touched.email && errors.email && <div>{errors.email}</div */}
            <Button block type="submit" disabled={isSubmitting}>
              Send Reset Instructions
            </Button>
            <ChangeMode onClick={() => props.handleTypeChange(ModalType.login)}>
              Log In
            </ChangeMode>
          </Form>
        )
      }}
    </Formik>
  )
}
