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
import Input from "Components/Input"
import { ProgressIndicator } from "Components/ProgressIndicator"
import { Step, Wizard } from "Components/Wizard"
import React, { Component, Fragment } from "react"

export interface MobileSignUpFormState {
  isSocialSignUp: boolean
}
export class MobileSignUpForm extends Component<
  FormProps,
  MobileSignUpFormState
> {
  state = {
    isSocialSignUp: false,
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
              quick
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
            showPasswordMessage
          />
        )}
      </Step>,
      <Step validationSchema={MobileSignUpValidator.name}>
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
            quick
          />
        )}
      </Step>,
    ]

    return (
      <Wizard steps={steps} onComplete={this.props.handleSubmit}>
        {context => {
          const {
            form: { handleSubmit, status, values, setTouched },
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
                      : wizard.previous(e as any, values)
                  }
                >
                  <Icon
                    name="chevron-left"
                    color={Colors.graySemibold}
                    fontSize="16px"
                  />
                </BackButton>
                <MobileHeader>Sign up for Artsy</MobileHeader>
                {currentStep}
                {status &&
                  !status.success && <Error show>{status.error}</Error>}
                <SubmitButton
                  onClick={e => {
                    this.setState(
                      {
                        isSocialSignUp: false,
                      },
                      () => {
                        handleSubmit(e)
                      }
                    )
                  }}
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
