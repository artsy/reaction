import { Flex } from "@artsy/palette"
import { withSystemContext } from "Artsy"
import { checkEmail } from "Components/Authentication/helpers"
import Icon from "Components/Icon"
import PasswordInput from "Components/PasswordInput"
import { ProgressIndicator } from "Components/ProgressIndicator"
import QuickInput from "Components/QuickInput"
import { Step, Wizard } from "Components/Wizard"
import { FormikProps } from "formik"
import React, { Component, Fragment } from "react"
import { Environment } from "relay-runtime"
import { recaptcha } from "Utils/recaptcha"
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
import { FormProps, InputValues, ModalType } from "../Types"
import { MobileLoginValidator } from "../Validators"
import { StepElement } from "Components/Wizard/types"

class MobileLoginFormWithSystemContext extends Component<
  FormProps & {
    relayEnvironment: Environment
  },
  { error: string; shouldGoToNextStep: boolean; steps: StepElement[] }
> {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      shouldGoToNextStep: false,
      steps: this.getBaseSteps(),
    }
  }

  showError = status => {
    const { error } = this.state
    if (error && error !== "missing two-factor authentication code") {
      return <Error show>{error}</Error>
    }

    if (status && !status.success) {
      return <Error show>{status.error}</Error>
    }

    return null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.error !== prevState.error) {
      let newState = {
        error: nextProps.error,
        steps: prevState.steps,
        shouldGoToNextStep: false,
      }

      if (nextProps.error === "missing two-factor authentication code") {
        newState.steps.push(MobileLoginFormWithSystemContext.getOtpStep())
        newState.shouldGoToNextStep = true
      }

      return newState
    }

    return null
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("login_submit")
    this.props.handleSubmit(values, formikBag)
  }

  getBaseSteps = () => {
    return [
      <Step
        validationSchema={MobileLoginValidator.email}
        onSubmit={(values, actions) =>
          checkEmail({
            relayEnvironment: this.props.relayEnvironment,
            values,
            actions,
            shouldExist: true,
          })
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
          <QuickInput
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
            autoFocus
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
            <PasswordInput
              block
              error={errors.password}
              name="password"
              label="Password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              setTouched={setTouched}
              touchedOnChange={false}
            />
            <Flex alignItems="center" justifyContent="flex-end">
              <ForgotPassword onClick={() => (location.href = "/forgot")} />
            </Flex>
          </Fragment>
        )}
      </Step>,
    ]
  }

  static getOtpStep = () => {
    return (
      <Step validationSchema={MobileLoginValidator.otpAttempt}>
        {({
          form: {
            errors,
            values,
            handleChange,
            handleBlur,
            setTouched,
            status,
          },
        }) => {
          return (
            <QuickInput
              block
              error={errors.otp_attempt}
              name="otp_attempt"
              placeholder="Authentication Code"
              value={values.otp_attempt}
              onChange={handleChange}
              onBlur={handleBlur}
              setTouched={setTouched}
              touchedOnChange={false}
            />
          )
        }}
      </Step>
    )
  }

  render() {
    const { steps } = this.state

    return (
      <Wizard steps={steps} onComplete={this.onSubmit}>
        {context => {
          const {
            wizard,
            form: { handleSubmit, actions, values, status, isSubmitting },
          } = context

          const { currentStep, isLastStep, next } = wizard

          if (this.state.shouldGoToNextStep) {
            next(values, actions)
            this.setState({ shouldGoToNextStep: false })
          }

          return (
            <MobileContainer data-test="LoginForm">
              <ProgressIndicator percentComplete={wizard.progressPercentage} />
              <MobileInnerWrapper>
                <BackButton
                  onClick={e =>
                    this.props.onBackButtonClicked &&
                    wizard.currentStepIndex === 0
                      ? this.props.onBackButtonClicked(e as any)
                      : wizard.previous(e, values)
                  }
                >
                  <Icon name="chevron-left" color="black60" fontSize="16px" />
                </BackButton>

                <MobileHeader>Log in to Artsy</MobileHeader>
                {currentStep}
                {this.showError(status)}
                <SubmitButton
                  onClick={handleSubmit}
                  loading={isLastStep && isSubmitting}
                >
                  {isLastStep ? "Log in" : "Next"}
                </SubmitButton>
                <Footer
                  mode={"login" as ModalType}
                  handleTypeChange={this.props.handleTypeChange}
                  onAppleLogin={this.props.onAppleLogin}
                  onFacebookLogin={this.props.onFacebookLogin}
                />
              </MobileInnerWrapper>
            </MobileContainer>
          )
        }}
      </Wizard>
    )
  }
}

export const MobileLoginForm = withSystemContext(
  MobileLoginFormWithSystemContext
)
