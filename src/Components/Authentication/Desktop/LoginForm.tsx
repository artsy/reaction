import React from "react"
import styled from "styled-components"
import { Formik, FormikProps } from "formik"

import {
  Error,
  ForgotPassword,
  Footer,
  FormContainer as Form,
} from "Components/Authentication/commonElements"
import { LoginValidator } from "Components/Authentication/Validators"
import Input from "Components/Input"
import {
  FormComponentType,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import Button from "Components/Buttons/Inverted"

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LoginButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin: auto 0 10px 0;
`

export const LoginForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={LoginValidator}
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
        const globalError =
          props.error || (status && !status.success && status.error)

        return (
          <Form onSubmit={handleSubmit} height={320}>
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
              placeholder="Enter your password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Row>
              <ForgotPassword
                onClick={() => props.handleTypeChange(ModalType.resetPassword)}
              />
            </Row>
            {globalError && <Error show>{globalError}</Error>}
            <LoginButton disabled={isSubmitting || hasErrors || !dirty}>
              Log In
            </LoginButton>
            <Footer
              handleTypeChange={() => props.handleTypeChange(ModalType.signup)}
              mode="login"
              onFacebookLogin={props.onFacebookLogin}
              onTwitterLogin={props.onTwitterLogin}
              inline
            />
          </Form>
        )
      }}
    </Formik>
  )
}
