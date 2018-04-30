import React from "react"
import { Step, Wizard } from "../../Wizard"
import { ProgressIndicator } from "../../ProgressIndicator"

import { GrayFacebookButton } from "../commonElements"
import styled from "styled-components"
import Input from "../../Input"
import Button from "../../Buttons/Inverted"
import Icon from "../../Icon"
import { FormComponentType } from "../Types"

import Text from "../../Text"
import TextLink from "../../TextLink"
import Colors from "Assets/Colors"
import { Validators } from "../Validators"
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

export const MobileRegisterForm: FormComponentType = props => {
  const steps = [
    <Step validationSchema={Validators.email} onSubmit={checkEmail}>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur },
      }) => (
        <div>
          <Input
            block
            error={touched.email && errors.email}
            placeholder="Enter your email address"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            quick
          />
          <GrayFacebookButton>Sign up with Facebook</GrayFacebookButton>
          <LoginText>
            Already have an account?{" "}
            <TextLink onClick={props.handleChangeMode("login")}>Login</TextLink>
          </LoginText>
        </div>
      )}
    </Step>,
    <Step validationSchema={Validators.password}>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur },
      }) => (
        <div>
          <Input
            block
            error={errors.password}
            name="password"
            placeholder="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            quick
          />
        </div>
      )}
    </Step>,
    <Step validationSchema={Validators.name}>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur },
      }) => (
        <div>
          <Input
            block
            error={errors.name}
            name="name"
            placeholder="Name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            quick
          />
        </div>
      )}
    </Step>,
  ]
  return (
    <Wizard steps={steps}>
      {context => {
        const { form, wizard } = context
        const { currentStep } = wizard
        return (
          <Container>
            <ProgressIndicator
              percentComplete={
                wizard.isLastStep
                  ? 1
                  : (wizard.currentStepIndex + 1) / wizard.steps.length
              }
            />
            <BackButton onClick={wizard.previous as any}>
              <Icon name="chevron-left" color="#cccccc" fontSize="20px" />
            </BackButton>
            <Header>
              <Logo name="logotype" />
            </Header>
            {currentStep}
            <Button
              onClick={form.handleSubmit as any}
              block
              disabled={!wizard.shouldAllowNext}
            >
              Next
            </Button>
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
  position: relative;
`

const Header = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  margin: 20px 0 0;
`

const Logo = styled(Icon).attrs({
  color: "black",
  fontSize: "34px",
})`
  display: block;
`

const LoginText = styled(Text).attrs({
  color: Colors.grayDark,
  align: "center",
})`
  margin-top: 0;
`

const BackButton = styled.div`
  display: flex;
  justify-self: start;
  align-self: center;
  position: absolute;
  left: -7px;
  top: 44px;
  color: Colors.grayMedium;
`
