import React from "react"
import styled from "styled-components"
import * as sharify from "sharify"
import { metaphysics } from "Utils/metaphysics"

import { Step, Wizard } from "Components/Wizard"
import { ProgressIndicator } from "Components/ProgressIndicator"
import {
  Error,
  Footer,
  MobileHeader,
  TermsOfServiceCheckbox,
} from "Components/Authentication/commonElements"
import Input from "Components/Input"
import Button from "Components/Buttons/Inverted"
import Icon from "Components/Icon"
import { FormComponentType, ModalType } from "Components/Authentication/Types"
import Colors from "Assets/Colors"
import {
  CustomMobileValidator,
  MobileSignUpValidator,
} from "Components/Authentication/Validators"

const checkEmail = (values, actions) => {
  const query = `
    query {
      user(email: "${values.email}") {
        userAlreadyExists
      }
    }
  `

  return metaphysics(
    { query },
    {
      appToken: sharify.data.XAPP_TOKEN,
    }
  ).then(({ data }: any) => {
    if (data.user.userAlreadyExists) {
      actions.setFieldError("email", "Email already exists.")
      actions.setSubmitting(false)
      return false
    }
    return true
  })
}

export const MobileSignUpForm: FormComponentType = props => {
  const steps = [
    <Step validationSchema={MobileSignUpValidator.email} onSubmit={checkEmail}>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur, setTouched },
      }) => (
        <div>
          <Input
            block
            error={errors.email}
            placeholder="Enter your email address"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            setTouched={setTouched}
            quick
          />
        </div>
      )}
    </Step>,
    <Step validationSchema={MobileSignUpValidator.password}>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur, setTouched },
      }) => (
        <div style={{ marginBottom: "80px" }}>
          <Input
            block
            error={errors.password}
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            setTouched={setTouched}
            quick
            showPasswordMessage
          />
        </div>
      )}
    </Step>,
    <Step validationSchema={CustomMobileValidator}>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur, setTouched },
      }) => {
        return (
          <div style={{ marginBottom: "80px" }}>
            <Input
              block
              error={errors.name}
              name="name"
              label="Name"
              placeholder="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              setTouched={setTouched}
              quick
            />
            <TermsOfServiceCheckbox
              error={
                touched.acceptedTermsOfService && errors.acceptedTermsOfService
              }
              checked={values.acceptedTermsOfService}
              value={values.acceptedTermsOfService}
              type="checkbox"
              name="acceptedTermsOfService"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        )
      }}
    </Step>,
  ]
  return (
    <Wizard steps={steps}>
      {context => {
        const {
          form: { handleSubmit, status },
          wizard,
        } = context
        const { currentStep } = wizard

        return (
          <Container>
            <ProgressIndicator percentComplete={wizard.progressPercentage} />
            <InnerWrapper>
              <BackButton onClick={wizard.previous as any}>
                <Icon
                  name="chevron-left"
                  color={Colors.grayMedium}
                  fontSize="20px"
                />
              </BackButton>
              <MobileHeader>Sign up</MobileHeader>
              {currentStep}
              {status && !status.success && <Error show>{status.error}</Error>}
              <Button
                onClick={handleSubmit as any}
                block
                disabled={!wizard.shouldAllowNext}
              >
                Next
              </Button>
              <Footer
                handleTypeChange={() => props.handleTypeChange(ModalType.login)}
              />
            </InnerWrapper>
          </Container>
        )
      }}
    </Wizard>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: stretch;
  width: 100%;
  min-width: 260px;
`

const InnerWrapper = styled.div`
  position: relative;
  margin-left: 35px;
  margin-right: 35px;
`

const BackButton = styled.div`
  display: flex;
  justify-self: start;
  align-self: center;
  position: absolute;
  left: -9px;
  top: 40px;
  color: Colors.grayMedium;
`
