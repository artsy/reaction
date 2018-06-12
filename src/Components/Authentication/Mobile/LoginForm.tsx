import React from "react"
import styled from "styled-components"
import { Step, Wizard } from "../../Wizard"
import { ProgressIndicator } from "../../ProgressIndicator"
import Input from "../../Input"
import Icon from "../../Icon"
import { FormComponentType } from "../Types"
import Colors from "Assets/Colors"
import { MobileLoginValidator } from "../Validators"
import {
  BackButton,
  Footer,
  ForgotPassword,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
  MobileSubmitButton,
  RememberMe,
} from "../commonElements"
import { checkEmailDoesNotExist } from "Components/Authentication/helpers"

export const MobileLoginForm: FormComponentType = props => {
  const steps = [
    <Step
      validationSchema={MobileLoginValidator.email}
      onSubmit={checkEmailDoesNotExist}
    >
      {({
        wizard,
        form: {
          errors,
          touched,
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          setTouched,
        },
      }) => (
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
      )}
    </Step>,
    <Step validationSchema={MobileLoginValidator.password}>
      {({
        wizard,
        form: {
          errors,
          touched,
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          setTouched,
        },
      }) => (
        <div>
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
          />
          <Row>
            <RememberMe handleChange={handleChange} handleBlur={handleBlur} />
            <ForgotPassword
              handleForgotPasswordChange={() =>
                (window.location.href = "/forgot")
              }
            />
          </Row>
        </div>
      )}
    </Step>,
  ]
  return (
    <Wizard steps={steps}>
      {context => {
        const { wizard, form } = context
        const { currentStep } = wizard
        return (
          <MobileContainer>
            <ProgressIndicator percentComplete={wizard.progressPercentage} />
            <MobileInnerWrapper>
              <BackButton onClick={wizard.previous as any}>
                <Icon
                  name="chevron-left"
                  color={Colors.graySemibold}
                  fontSize="16px"
                />
              </BackButton>
              <MobileHeader>Log in</MobileHeader>
              {currentStep}
              <MobileSubmitButton
                disabled={!wizard.shouldAllowNext}
                onClick={form.handleSubmit as any}
              >
                Next
              </MobileSubmitButton>
              <Footer
                mode="login"
                handleTypeChange={type => (window.location.href = "/" + type)}
              />
            </MobileInnerWrapper>
          </MobileContainer>
        )
      }}
    </Wizard>
  )
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
