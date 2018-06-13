import React from "react"
import styled from "styled-components"
import { Formik, FormikProps } from "formik"

import {
  Error,
  SmallTextLink,
  Footer,
  FormContainer as Form,
} from "Components/Authentication/commonElements"
import { LoginValidator } from "Components/Authentication/Validators"
import Input from "Components/Input"
import Text from "Components/Text"
import Colors from "Assets/Colors"
import {
  FormComponentType,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import Checkbox from "Components/Checkbox"
import Button from "Components/Buttons/Inverted"

const ForgotPasswordLink = styled(SmallTextLink)`
  margin-left: auto;
  color: ${Colors.graySemibold};
`

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
              <Checkbox
                type="checkbox"
                name="remember-me"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <Text color={Colors.graySemibold}>Remember me</Text>
              </Checkbox>
              <ForgotPasswordLink
                onClick={() => props.handleTypeChange(ModalType.resetPassword)}
              >
                Forgot Password?
              </ForgotPasswordLink>
            </Row>
            {status && !status.success && <Error show>{status.error}</Error>}
            <LoginButton disabled={isSubmitting || hasErrors || !dirty}>
              Log In
            </LoginButton>
            <Footer
              handleTypeChange={() => props.handleTypeChange(ModalType.signup)}
              mode="login"
              inline
            />
          </Form>
        )
      }}
    </Formik>
  )
}
