import { Flex } from "@artsy/palette"
import {
  Error,
  Footer,
  ForgotPassword,
  FormContainer as Form,
  SubmitButton,
} from "Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "Components/Authentication/Types"
import { LoginValidator } from "Components/Authentication/Validators"
import PasswordInput from "Components/PasswordInput"
import QuickInput from "Components/QuickInput"
import { Formik, FormikProps } from "formik"
import React, { Component } from "react"
import { repcaptcha } from "Utils/repcaptcha"

export interface LoginFormState {
  error: string
}

export class LoginForm extends Component<FormProps, LoginFormState> {
  state = {
    error: this.props.error,
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    repcaptcha("login_submit")
    this.props.handleSubmit(values, formikBag)
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values}
        onSubmit={this.onSubmit}
        validationSchema={LoginValidator}
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
        }: FormikProps<InputValues>) => {
          const globalError =
            this.state.error || (status && !status.success && status.error)

          const handleChange = e => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form onSubmit={handleSubmit}>
              <QuickInput
                block
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
              <PasswordInput
                block
                error={touched.password && errors.password}
                placeholder="Enter your password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Flex alignItems="center" justifyContent="flex-end">
                <ForgotPassword
                  onClick={() => this.props.handleTypeChange(ModalType.forgot)}
                />
              </Flex>
              {globalError && <Error show>{globalError}</Error>}
              <SubmitButton loading={isSubmitting}>Log in</SubmitButton>
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange(ModalType.signup)
                }
                mode={"login" as ModalType}
                onFacebookLogin={this.props.onFacebookLogin}
                inline
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}
