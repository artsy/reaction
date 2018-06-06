import React from "react"
import { Formik, FormikProps } from "formik"
import {
  FormContainer as Form,
  Footer,
  MobileHeader,
} from "Components/Authentication/commonElements"
import Input from "Components/Input"
import { FormComponentType, InputValues, ModalType } from "../Types"
import { ResetPasswordValidator } from "../Validators"
import Button from "Components/Buttons/Inverted"

export const MobileResetPasswordForm: FormComponentType = props => {
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
            <MobileHeader>Reset your password</MobileHeader>
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
            <Button block type="submit" disabled={isSubmitting}>
              Next
            </Button>
            <Footer
              handleTypeChange={() => props.handleTypeChange(ModalType.login)}
              mode="reset_password"
            />
          </Form>
        )
      }}
    </Formik>
  )
}
