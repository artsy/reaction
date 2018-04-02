import { Formik, FormikProps } from "formik"
import React from "react"
import Yup from "yup"

import {
  BlockButton as Button,
  ChangeMode,
  FormContainer,
  inputValidators,
  StyledFacebookButton,
  StyledInput as Input,
  TOSCheckbox,
} from "./commonElements"
import { FormComponentType, InputValues } from "./Types"

import colors from "../../Assets/Colors"
import Text from "../Text"
import TextLink from "../TextLink"

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
            <Button type="submit" disabled={isSubmitting}>
              Sign Up
            </Button>
            <StyledFacebookButton>Sign up with Facebook</StyledFacebookButton>
            <Text color={colors.grayDark} align="center">
              Already have an account?
              <ChangeMode handleClick={props.handleChangeMode("login")}>
                {" "}
                Log In
              </ChangeMode>
            </Text>
          </FormContainer>
        )
      }}
    </Formik>
  )
}
