import React from "react"
import { Step, Wizard } from "../../Wizard"

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

export const MobileRegisterForm: FormComponentType = props => {
  const steps = [
    <Step>
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
          />
          <GrayFacebookButton>Sign up with Facebook</GrayFacebookButton>
          <LoginText>
            Already have an account?{" "}
            <TextLink onClick={props.handleChangeMode("login")}>Login</TextLink>
          </LoginText>
        </div>
      )}
    </Step>,
    <Step>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur },
      }) => (
        <div>
          <Input
            block
            error={touched.password && errors.password}
            name="password"
            placeholder="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      )}
    </Step>,
    <Step>
      {({
        wizard,
        form: { errors, touched, values, handleChange, handleBlur },
      }) => (
        <div>
          <Input
            block
            error={touched.name && errors.name}
            name="name"
            placeholder="Name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      )}
    </Step>,
  ]
  return (
    <Wizard steps={steps} validationSchema={Validators}>
      {context => {
        const { wizard } = context
        const { currentStep } = wizard
        return (
          <Container>
            <Header>
              <BackButton onClick={wizard.previous as any}>Back</BackButton>
              <Logo name="logotype" />
            </Header>
            {currentStep}
            <Button onClick={wizard.next as any} block>
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
`

const Header = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
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

const BackButton = styled.button``
