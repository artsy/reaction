import Colors from "Assets/Colors"
import { checkEmail } from "Components/Authentication/helpers"
import React, { Fragment } from "react"
import styled from "styled-components"
import Icon from "../../Icon"
import Input from "../../Input"
import { ProgressIndicator } from "../../ProgressIndicator"
import { Step, Wizard } from "../../Wizard"
import {
  BackButton,
  Error,
  Footer,
  ForgotPassword,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
  MobileSubmitButton,
  RememberMe,
} from "../commonElements"
import { FormComponentType } from "../Types"
import { MobileLoginValidator } from "../Validators"

export const MobileLoginForm: FormComponentType = props => {
  const steps = [
    <Step
      validationSchema={MobileLoginValidator.email}
      onSubmit={(values, actions) =>
        checkEmail({ values, actions, shouldExist: true })
      }
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
        <Fragment>
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
        </Fragment>
      )}
    </Step>,
  ]
  return (
    <Wizard steps={steps} onComplete={props.handleSubmit}>
      {context => {
        const {
          wizard,
          form: { handleSubmit, status },
        } = context
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
              {status && !status.success && <Error show>{status.error}</Error>}
              <MobileSubmitButton
                disabled={!wizard.shouldAllowNext}
                onClick={handleSubmit as any}
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
