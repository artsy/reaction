import { Formik, FormikProps } from "formik"
import React, { Component } from "react"

import {
  Error,
  Footer,
  FormContainer as Form,
  SubmitButton,
  TermsOfServiceCheckbox,
} from "Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import { SignUpValidator } from "Components/Authentication/Validators"
import Input from "Components/Input"

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
                autoFocus
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
                  touched.accepted_terms_of_service &&
                  errors.accepted_terms_of_service
                }
                checked={values.accepted_terms_of_service}
                value={values.accepted_terms_of_service}
                type="checkbox"
                name="accepted_terms_of_service"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {status && !status.success && <Error show>{status.error}</Error>}
              <SubmitButton loading={isSubmitting}>Sign up</SubmitButton>
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange(ModalType.login)
                }
                onFacebookLogin={e => {
                  if (!values.accepted_terms_of_service) {
                    setTouched({
                      accepted_terms_of_service: true,
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
