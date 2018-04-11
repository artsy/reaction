import React from "react"
import styled from "styled-components"
import { Formik, FormikProps } from "formik"

import {
  BlockButton as Button,
  FormContainer as Form,
  GrayFacebookButton,
  StyledInput as Input,
} from "./commonElements"

import { Validators } from "./Validators"
import Colors from "../../Assets/Colors"
import Text from "../Text"
import TextLink from "../TextLink"
import { FormComponentType, InputValues } from "./Types"
import Checkbox from "../Checkbox"

const ForgotPasswordLink = styled(TextLink)`
  margin-left: auto;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LoginText = styled(Text).attrs({
  color: Colors.grayDark,
  align: "center",
})`
  margin-top: 0;
`

export const LoginForm: FormComponentType = props => {
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
                <Text color={Colors.grayDark}>Remember me</Text>
              </Checkbox>
              <ForgotPasswordLink
                onClick={() => props.handleChangeMode("reset_password")}
                color={Colors.grayDark}
                underline
              >
                Forgot Password?
              </ForgotPasswordLink>
            </Row>
            <Button type="submit" disabled={isSubmitting}>
              Log In
            </Button>
            <GrayFacebookButton>Sign In with Facebook</GrayFacebookButton>
            <LoginText>
              Don't have an account?{" "}
              <TextLink onClick={props.handleChangeMode("login")}>
                Sign Up
              </TextLink>
            </LoginText>
          </Form>
        )
      }}
    </Formik>
  )
}
