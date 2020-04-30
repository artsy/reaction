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

interface LoginFormState {
  advanceWizardStep: boolean
  error: string
  hideBackButton: boolean
  steps: StepElement[]
}

class MobileLoginFormWithSystemContext extends Component<
  FormProps & {
    relayEnvironment: Environment
  },
  LoginFormState
> {
  static getDerivedStateFromProps(nextProps, prevState): LoginFormState | null {
    if (nextProps.error !== prevState.error) {
      if (nextProps.error === "missing two-factor authentication code") {
        return {
          advanceWizardStep: true,
          error: nextProps.error,
          hideBackButton: true,
          steps: prevState.steps.concat([
            MobileLoginFormWithSystemContext.buildOtpStep(),
          ]),
        }
      } else {
        return {
          ...prevState,
          error: nextProps.error,
        }
      }
    }

    return null
  }

  static buildOtpStep = () => {
    return (
      <Step validationSchema={MobileLoginValidator.otpAttempt}>
        {({
          form: { errors, values, handleChange, handleBlur, setTouched },
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

  constructor(props) {
    super(props)

    this.state = {
      error: null,
      advanceWizardStep: false,
      hideBackButton: false,
      steps: this.buildBaseSteps(),
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

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("login_submit")
    this.props.handleSubmit(values, formikBag)
  }

  buildBaseSteps = () => {
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
          form: { errors, values, handleChange, handleBlur, setTouched },
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

  render() {
    const { steps, hideBackButton, advanceWizardStep } = this.state

    return (
      <Wizard steps={steps} onComplete={this.onSubmit}>
        {context => {
          const {
            wizard,
            form: { handleSubmit, actions, values, status, isSubmitting },
          } = context

          const { currentStep, isLastStep, next } = wizard

          if (advanceWizardStep) {
            next(values, actions)
            this.setState({ advanceWizardStep: false })
          }

          return (
            <MobileContainer data-test="LoginForm">
              <ProgressIndicator percentComplete={wizard.progressPercentage} />
              <MobileInnerWrapper>
                {!hideBackButton && (
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
                )}
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
