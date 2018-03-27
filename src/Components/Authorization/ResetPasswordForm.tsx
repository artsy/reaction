import { Formik, FormikProps } from "formik"
import React from "react"
import Yup from "yup"

import {
  BlockButton as Button,
  ChangeMode,
  FormContainer as Form,
  inputValidators,
  StyledInput as Input,
} from "./commonElements"
import { FormComponentType, InputValues } from "./Types"

export const ResetPasswordForm: FormComponentType = props => {
  const { email: emailValidator } = inputValidators
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={Yup.object().shape({
        email: emailValidator,
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
            {/* touched.email && errors.email && <div>{errors.email}</div */}
            <Button type="submit" disabled={isSubmitting}>
              Log In
            </Button>
            <ChangeMode handleClick={props.handleChangeMode("login")}>
              Log In
            </ChangeMode>
          </Form>
        )
      }}
    </Formik>
  )
}
