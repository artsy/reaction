import { Formik, FormikProps } from "formik"
import React, { Component } from "react"
import styled from "styled-components"

import {
  Error,
  Footer,
  FormContainer as Form,
  TermsOfServiceCheckbox,
} from "Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import { SignUpValidator } from "Components/Authentication/Validators"
import Button from "Components/Buttons/Inverted"
import Input from "Components/Input"

const SignUpButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin-top: auto;
`

export interface SignUpFormState {
  error?: string
}

export class SignUpForm extends Component<FormProps, SignUpFormState> {
  state = {
    error: this.props.error,
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values}
        onSubmit={this.props.handleSubmit}
        validationSchema={SignUpValidator}
      >
        {({
          values,
          errors,
          touched,
          handleChange: formikHandleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
          setStatus,
          setTouched,
        }: FormikProps<InputValues>) => {
          const handleChange = e => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form onSubmit={handleSubmit} height={430}>
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
                placeholder="Enter a password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                showPasswordMessage
              />
              <Input
                block
                quick
                error={touched.name && errors.name}
                placeholder="Enter your full name"
                name="name"
                label="Name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TermsOfServiceCheckbox
                error={
                  touched.acceptedTermsOfService &&
                  errors.acceptedTermsOfService
                }
                checked={values.acceptedTermsOfService}
                value={values.acceptedTermsOfService}
                type="checkbox"
                name="acceptedTermsOfService"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {status && !status.success && <Error show>{status.error}</Error>}
              <SignUpButton disabled={isSubmitting}>Sign Up</SignUpButton>
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange(ModalType.login)
                }
                onFacebookLogin={e => {
                  if (!values.acceptedTermsOfService) {
                    setTouched({
                      acceptedTermsOfService: true,
                    })
                  } else {
                    this.props.onFacebookLogin(e)
                  }
                }}
                onTwitterLogin={this.props.onTwitterLogin}
                inline
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}
