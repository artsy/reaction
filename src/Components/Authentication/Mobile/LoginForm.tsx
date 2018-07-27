import Colors from "Assets/Colors"
import { checkEmail } from "Components/Authentication/helpers"
import React, { Component, Fragment } from "react"
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
  SubmitButton,
} from "../commonElements"
import { FormProps } from "../Types"
import { MobileLoginValidator } from "../Validators"

export class MobileLoginForm extends Component<FormProps> {
  render() {
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
            touchedOnChange={false}
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
              touchedOnChange={false}
              quick
            />
            <Row>
              <ForgotPassword onClick={() => (location.href = "/forgot")} />
            </Row>
          </Fragment>
        )}
      </Step>,
    ]
    return (
      <Wizard steps={steps} onComplete={this.props.handleSubmit}>
        {context => {
          const {
            wizard,
            form: { handleSubmit, status, values },
          } = context
          const { currentStep, isLastStep } = wizard

          return (
            <MobileContainer>
              <ProgressIndicator percentComplete={wizard.progressPercentage} />
              <MobileInnerWrapper>
                <BackButton
                  onClick={e =>
                    this.props.onBackButtonClicked &&
                    wizard.currentStepIndex === 0
                      ? this.props.onBackButtonClicked(e as any)
                      : wizard.previous(e as any, values)
                  }
                >
                  <Icon
                    name="chevron-left"
                    color={Colors.graySemibold}
                    fontSize="16px"
                  />
                </BackButton>
                <MobileHeader>Log in to Artsy</MobileHeader>
                {currentStep}
                {status &&
                  !status.success && <Error show>{status.error}</Error>}
                <SubmitButton onClick={handleSubmit}>
                  {isLastStep ? "Log in" : "Next"}
                </SubmitButton>
                <Footer
                  mode="login"
                  handleTypeChange={this.props.handleTypeChange}
                  onFacebookLogin={this.props.onFacebookLogin}
                  onTwitterLogin={this.props.onTwitterLogin}
                />
              </MobileInnerWrapper>
            </MobileContainer>
          )
        }}
      </Wizard>
    )
  }
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
