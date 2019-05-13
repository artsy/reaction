import { Flex } from "@artsy/palette"
import { checkEmail } from "Components/Authentication/helpers"
import Icon from "Components/Icon"
import PasswordInput from "Components/PasswordInput"
import { ProgressIndicator } from "Components/ProgressIndicator"
import QuickInput from "Components/QuickInput"
import { Step, Wizard } from "Components/Wizard"
import { FormikProps } from "formik"
import React, { Component, Fragment } from "react"
import { repcaptcha } from "Utils/repcaptcha"
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

export class MobileLoginForm extends Component<FormProps> {
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

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    repcaptcha("login_submit")
    this.props.handleSubmit(values, formikBag)
  }

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
    return (
      <Wizard steps={steps} onComplete={this.onSubmit}>
        {context => {
          const {
            wizard,
            form: { handleSubmit, values, status, isSubmitting },
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
