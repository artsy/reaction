import { Formik } from "formik"
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
import { FormComponentType } from "./Types"

const RegisterForm: FormComponentType = props => {
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
      }) => {
        return (
          <FormContainer onSubmit={handleSubmit}>
            <Input
              block
              error={touched.name && errors.name}
              name="name"
              placeholder="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* touched.email && errors.email && <div>{errors.email}</div */}
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
            <Input
              block
              error={touched.password && errors.password}
              name="password"
              placeholder="Password"
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
              I Agree to the TOS And PP
            </TOSCheckbox>
            {/* touched.password && errors.password && <div>{errors.password}</div> */}
            <Button type="submit" disabled={isSubmitting}>
              Sign Up
            </Button>
            <StyledFacebookButton>Sign up with Facebook</StyledFacebookButton>
            <p>
              Already have an account?
              <ChangeMode handleClick={props.handleChangeMode("log_in")}>
                Log In
              </ChangeMode>
            </p>
          </FormContainer>
        )
      }}
    </Formik>
  )
}
export default RegisterForm
