import React from "react"
import { Step, Wizard } from "../../Wizard"
import { ProgressIndicator } from "../../ProgressIndicator"
import styled from "styled-components"
import Input from "../../Input"
import Button from "../../Buttons/Inverted"
import Icon from "../../Icon"
import { FormComponentType } from "../Types"
import Colors from "Assets/Colors"
import { LoginValidator } from "../Validators"
import { metaphysics } from "../../../Utils/metaphysics"
import * as sharify from "sharify"
import { Footer, MobileHeader } from "../commonElements"

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
      return true
    }
    actions.setFieldError("email", "Email does not exist.")
    actions.setSubmitting(false)
    return false
  })
}

export const MobileLoginForm: FormComponentType = props => {
  const steps = [
    <Step validationSchema={LoginValidator.email} onSubmit={checkEmail}>
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
              <MobileHeader>Log in</MobileHeader>
              {currentStep}
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
