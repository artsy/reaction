import React from "react"
import { Step, Wizard } from "../../Wizard"
import { ProgressIndicator } from "../../ProgressIndicator"

import { Footer, MobileHeader, TOSCheckbox } from "../commonElements"
import styled from "styled-components"
import Input from "../../Input"
import Button from "../../Buttons/Inverted"
import Icon from "../../Icon"
import { FormComponentType, ModalType } from "../Types"

import Text from "../../Text"
import TextLink from "../../TextLink"
import Colors from "Assets/Colors"
import { CustomMobileValidator, MobileSignUpValidator } from "../Validators"
import { metaphysics } from "../../../Utils/metaphysics"
import * as sharify from "sharify"

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
        const checkboxError =
          touched.acceptedTermsOfService && errors.acceptedTermsOfService
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
            <TOSCheckbox
              error={checkboxError}
              value={values.acceptedTermsOfService}
              checked={values.acceptedTermsOfService}
              type="checkbox"
              name="acceptedTermsOfService"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <Text color={checkboxError ? Colors.redMedium : Colors.grayDark}>
                {"I agree to the "}
                <TextLink
                  href="https://www.artsy.net/terms"
                  target="_blank"
                  color={checkboxError ? Colors.redMedium : Colors.grayDark}
                  underline
                >
                  Terms Of Service
                </TextLink>
                {" and "}
                <TextLink
                  href="https://www.artsy.net/privacy"
                  target="_blank"
                  color={checkboxError ? Colors.redMedium : Colors.grayDark}
                  underline
                >
                  Privacy Policy
                </TextLink>
              </Text>
            </TOSCheckbox>
          </div>
        )
      }}
    </Step>,
  ]
  return (
    <Wizard steps={steps}>
      {context => {
        const { form, wizard } = context
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
              <Button
                onClick={form.handleSubmit as any}
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
