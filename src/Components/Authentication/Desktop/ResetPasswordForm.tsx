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
import { ResetPasswordValidator } from "../Validators"

export interface ResetPasswordFormState {
  error?: string
}

export class ResetPasswordForm extends Component<
  FormProps,
  ResetPasswordFormState
> {
  state = {
    error: this.props.error,
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values}
        onSubmit={this.props.handleSubmit}
        validationSchema={ResetPasswordValidator}
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
              <ResetButton block type="submit" disabled={isSubmitting}>
                Send Reset Instructions
              </ResetButton>
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange(ModalType.login)
                }
                mode="reset_password"
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}

const ResetButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin: auto 0 10px 0;
`
