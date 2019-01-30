import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import Colors from "Assets/Colors"
import {
  BackButton,
  Error,
  Footer,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
  SubmitButton,
  TermsOfServiceCheckbox,
} from "Components/Authentication/commonElements"
import { checkEmail } from "Components/Authentication/helpers"
import { FormProps } from "Components/Authentication/Types"
import { MobileSignUpValidator } from "Components/Authentication/Validators"
import Icon from "Components/Icon"
import { ProgressIndicator } from "Components/ProgressIndicator"
import QuickInput from "Components/QuickInput"
import { Step, Wizard } from "Components/Wizard"
import React, { Component, Fragment } from "react"

export interface MobileSignUpFormState {
  isSocialSignUp: boolean
}

export const currentStepActionName = {
  0: Schema.ActionName.EmailNextButton,
  1: Schema.ActionName.PasswordNextButton,
}

@track()
export class MobileSignUpForm extends Component<
  FormProps,
  MobileSignUpFormState
> {
  state = {
    isSocialSignUp: false,
  }

  @track((props: { contextModule: string; intent: string }, state, args) => ({
    action_type: Schema.ActionType.Click,
    action_name: currentStepActionName[args[0]],
    contextModule: args[1],
    flow: "auth",
    subject: "clicked next button",
    intent: props.intent,
  }))
  trackNextClick(currentStepIndex, contextModule) {
    // no op
  }

  showError = status => {
    const { error } = this.props
    if (error) {
      return <Error show>{error}</Error>
    }

    if (status && !status.success) {
      return <Error show>{status.error}</Error>
    }

    return null
  }

  render() {
    const steps = [
      <Step
        validationSchema={MobileSignUpValidator.email}
        onSubmit={(values, actions) =>
          checkEmail({ values, actions, shouldExist: false })
        }
      >
        {({
          wizard,
          form: { errors, values, handleChange, handleBlur, setTouched },
        }) => (
          <Fragment>
            <QuickInput
              block
              error={!this.state.isSocialSignUp && errors.email}
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
            <TermsOfServiceCheckbox
              error={errors.accepted_terms_of_service}
              checked={values.accepted_terms_of_service}
              value={values.accepted_terms_of_service}
              type="checkbox"
              name="accepted_terms_of_service"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Fragment>
        )}
      </Step>,
      <Step validationSchema={MobileSignUpValidator.password}>
        {({
          wizard,
          form: { errors, values, handleChange, handleBlur, setTouched },
        }) => (
          <QuickInput
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
            showPasswordMessage
          />
        )}
      </Step>,
      <Step validationSchema={MobileSignUpValidator.name}>
        {({
          wizard,
          form: { errors, values, handleChange, handleBlur, setTouched },
        }) => (
          <QuickInput
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
            touchedOnChange={false}
          />
        )}
      </Step>,
    ]

    return (
      <Wizard steps={steps} onComplete={this.props.handleSubmit}>
        {context => {
          const {
            form: { handleSubmit, values, setTouched, isSubmitting, status },
            wizard,
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
                      : wizard.previous(e, values)
                  }
                >
                  <Icon
                    name="chevron-left"
                    color={Colors.graySemibold}
                    fontSize="16px"
                  />
                </BackButton>
                <MobileHeader>
                  {this.props.title || "Sign up for Artsy"}
                </MobileHeader>
                {currentStep}
                {this.showError(status)}
                <SubmitButton
                  onClick={e => {
                    if (wizard.shouldAllowNext && this.props.contextModule) {
                      this.trackNextClick(
                        wizard.currentStepIndex,
                        this.props.contextModule
                      )
                    }

                    this.setState(
                      {
                        isSocialSignUp: false,
                      },
                      () => {
                        handleSubmit(e)
                      }
                    )
                  }}
                  loading={isLastStep && isSubmitting}
                >
                  {isLastStep ? "Create account" : "Next"}
                </SubmitButton>
                <Footer
                  mode="signup"
                  onFacebookLogin={e => {
                    if (!values.accepted_terms_of_service) {
                      this.setState(
                        {
                          isSocialSignUp: true,
                        },
                        () => {
                          setTouched({
                            accepted_terms_of_service: true,
                          })
                        }
                      )
                    } else {
                      if (this.props.onFacebookLogin) {
                        this.props.onFacebookLogin(e)
                      }
                    }
                  }}
                  onTwitterLogin={this.props.onTwitterLogin}
                  handleTypeChange={this.props.handleTypeChange}
                />
              </MobileInnerWrapper>
            </MobileContainer>
          )
        }}
      </Wizard>
    )
  }
}
