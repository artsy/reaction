import { Formik, FormikProps } from "formik"
import React, { Component } from "react"
import styled from "styled-components"

import {
  Error,
  Footer,
  FormContainer as Form,
} from "Components/Authentication/commonElements"
import Button from "Components/Buttons/Inverted"
import Input from "Components/Input"
import { FormProps, InputValues, ModalType } from "../Types"
import { ForgotPasswordValidator } from "../Validators"

export interface ForgotPasswordFormState {
  error?: string
}

export class ForgotPasswordForm extends Component<
  FormProps,
  ForgotPasswordFormState
> {
  state = {
    error: this.props.error,
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values}
        onSubmit={this.props.handleSubmit}
        validationSchema={ForgotPasswordValidator}
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
          const handleChange = e => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form onSubmit={handleSubmit} height={180}>
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
              {status && !status.success && <Error show>{status.error}</Error>}
              <SubmitButton block type="submit" disabled={isSubmitting}>
                Send Reset Instructions
              </SubmitButton>
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange(ModalType.login)
                }
                mode="forgot"
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}

const SubmitButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin: auto 0 10px 0;
`
