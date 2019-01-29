import {
  Error,
  Footer,
  FormContainer as Form,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
  SubmitButton,
} from "Components/Authentication/commonElements"
import Input from "Components/Input"
import { Formik, FormikProps } from "formik"
import React from "react"
import { FormComponentType, InputValues } from "../Types"
import { ForgotPasswordValidator } from "../Validators"

export const MobileForgotPasswordForm: FormComponentType = props => {
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
                  autoFocus
                />
                {status &&
                  !status.success && <Error show>{status.error}</Error>}
                <SubmitButton disabled={isSubmitting}>
                  Send me reset instructions
                </SubmitButton>
                <Footer
                  handleTypeChange={props.handleTypeChange}
                  mode="forgot"
                />
              </Form>
            </MobileInnerWrapper>
          </MobileContainer>
        )
      }}
    </Formik>
  )
}
