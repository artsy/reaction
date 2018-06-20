import {
  Error,
  Footer,
  FormContainer as Form,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
  MobileSubmitButton,
} from "Components/Authentication/commonElements"
import Input from "Components/Input"
import { Formik, FormikProps } from "formik"
import React from "react"
import { FormComponentType, InputValues } from "../Types"
import { ResetPasswordValidator } from "../Validators"

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
        status,
      }: FormikProps<InputValues>) => {
        return (
          <MobileContainer>
            <MobileInnerWrapper>
              <Form onSubmit={handleSubmit} height={270}>
                <MobileHeader>Reset your password</MobileHeader>
                <Input
                  block
                  quick
                  error={errors.email}
                  placeholder="Enter your email address"
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {status &&
                  !status.success && <Error show>{status.error}</Error>}
                <MobileSubmitButton disabled={isSubmitting}>
                  Next
                </MobileSubmitButton>
                <Footer
                  handleTypeChange={type => (window.location.href = "/" + type)}
                  mode="reset_password"
                />
              </Form>
            </MobileInnerWrapper>
          </MobileContainer>
        )
      }}
    </Formik>
  )
}
