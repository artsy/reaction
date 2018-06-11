import React from "react"
import { Step, Wizard } from "../../Wizard"
import { ProgressIndicator } from "../../ProgressIndicator"
import Input from "../../Input"
import Button from "../../Buttons/Inverted"
import Icon from "../../Icon"
import { FormComponentType } from "../Types"
import Colors from "Assets/Colors"
import { LoginValidator } from "../Validators"
import {
  BackButton,
  Footer,
  MobileContainer,
  MobileHeader,
  MobileInnerWrapper,
} from "../commonElements"
import { checkEmailDoesNotExist } from "Components/Authentication/helpers"

export const MobileLoginForm: FormComponentType = props => {
  const steps = [
    <Step
      validationSchema={LoginValidator.email}
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
          <Button
            onClick={handleSubmit as any}
            block
            disabled={!wizard.shouldAllowNext}
          >
            Next
          </Button>
          <Footer
            mode="login"
            // handleTypeChange={}
          />
        </div>
      )}
    </Step>,
    <Step validationSchema={LoginValidator.password}>
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
          />
          <Button
            onClick={handleSubmit as any}
            block
            disabled={!wizard.shouldAllowNext}
          >
            Next
          </Button>
          <Footer
            mode="login"
            // handleTypeChange={}
          />
        </div>
      )}
    </Step>,
  ]
  return (
    <Wizard steps={steps}>
      {context => {
        const { wizard } = context
        const { currentStep } = wizard
        return (
          <MobileContainer>
            <ProgressIndicator percentComplete={wizard.progressPercentage} />
            <MobileInnerWrapper>
              <BackButton onClick={wizard.previous as any}>
                <Icon
                  name="chevron-left"
                  color={Colors.grayMedium}
                  fontSize="20px"
                />
              </BackButton>
              <MobileHeader>Log in</MobileHeader>
              {currentStep}
            </MobileInnerWrapper>
          </MobileContainer>
        )
      }}
    </Wizard>
  )
}
