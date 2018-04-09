import { Formik, FormikProps } from "formik"
import React from "react"
import Yup from "yup"
import styled from "styled-components"

import {
  FormContainer,
  inputValidators,
  GrayFacebookButton,
  StyledInput as Input,
  TOSCheckbox,
} from "./commonElements"
import Button from "../Buttons/Inverted"
import { FormComponentType, InputValues } from "./Types"

import colors from "../../Assets/Colors"
import Text from "../Text"
import TextLink from "../TextLink"
import Colors from "../../Assets/Colors"

const LoginText = styled(Text).attrs({
  color: Colors.grayDark,
  align: "center",
})`
  margin-top: 0;
`

const SignUpButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin-top: 50px;
`

export const RegisterForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={Yup.object().shape(inputValidators)}
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
          <FormContainer onSubmit={handleSubmit}>
            <Input
              block
              error={touched.name && errors.name}
              placeholder="Enter your full name"
              name="name"
              label="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* touched.email && errors.email && <div>{errors.email}</div */}
            <Input
              block
              error={touched.email && errors.email}
              placeholder="Please enter your email address"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* touched.email && errors.email && <div>{errors.email}</div */}
            <Input
              block
              error={touched.password && errors.password}
              placeholder="Enter a password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* touched.password && errors.password && <div>{errors.password}</div> */}
            <TOSCheckbox
              error={
                touched.acceptedTermsOfService && errors.acceptedTermsOfService
              }
              value={values.acceptedTermsOfService}
              type="checkbox"
              name="accepted-terms-of-service"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.acceptedTermsOfService}
            >
              <Text color={colors.grayDark}>
                I Agree to the <TextLink>Terms Of Service</TextLink> And{" "}
                <TextLink>Privacy Policy</TextLink>
              </Text>
            </TOSCheckbox>
            {/* touched.password && errors.password && <div>{errors.password}</div> */}
            <SignUpButton disabled={isSubmitting}>Sign Up</SignUpButton>
            <GrayFacebookButton>Sign up with Facebook</GrayFacebookButton>
            <LoginText>
              Already have an account?{" "}
              <TextLink onClick={props.handleChangeMode("login")}>
                Login
              </TextLink>
            </LoginText>
          </FormContainer>
        )
      }}
    </Formik>
  )
}
