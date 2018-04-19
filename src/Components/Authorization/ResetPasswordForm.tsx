import React from "react"
import { Formik, FormikProps } from "formik"

import {
  BlockButton as Button,
  ChangeMode,
  FormContainer as Form,
} from "./commonElements"
import Input from "../Input"
import { FormComponentType, InputValues } from "./Types"
import { Validators } from "./Validators"

export const ResetPasswordForm: FormComponentType = props => {
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
          <Form onSubmit={handleSubmit}>
            <Input
              block
              quick
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
