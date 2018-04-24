import React from "react"
import yup from "yup"
import { Field } from "formik"
import { Step, Wizard } from "../../Wizard"
import { StepMarker } from "../../StepMarker"
import Button from "../../Buttons/Default"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import Icon from "../../Icon"

export const FormWizard = () => {
  const submitForm = (values, actions) => {
    window.alert(`Name: ${values.name} | Age: ${values.age}`)
    actions.setSubmitting(false)
  }

  const pages: Step[] = [
    {
      label: "Name",
      component: ({ form, wizard }) => (
        <FormPage>
          <Fields>
            <InputContainer>
              <Label htmlFor="name">Name</Label>
              <Field
                autoFocus
                name="name"
                type="text"
                placeholder="Your Name"
              />
            </InputContainer>
          </Fields>
          <Button onClick={form.handleSubmit}>Continue to Age</Button>
          <pre>
            Errors: {form.errors && JSON.stringify(form.errors, null, 2)}
          </pre>
        </FormPage>
      ),
      stepName: "name",
      validationSchema: yup.object().shape({
        name: yup.string().required("Please enter your name"),
      }),
    },
    {
      label: "Terms",
      component: ({ form, wizard }) => (
        <FormPage>
          <Fields>
            <InputContainer>
              <Label htmlFor="age">Age</Label>
              <Field autoFocus name="age" type="text" placeholder="Your Age" />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="agree">Agree</Label>
              <Field checked={form.values.agree} type="checkbox" name="agree" />
            </InputContainer>
          </Fields>
          <Button onClick={form.handleSubmit}>Finish</Button>
          <Button onClick={wizard.previous}>Back</Button>
          <pre>
            Errors: {form.errors && JSON.stringify(form.errors, null, 2)}
          </pre>
        </FormPage>
      ),
      stepName: "age",
      validate: values => {
        const errors: any = {}
        const age = Number(values.age)
        if (age < 18) errors.age = "You must be at least 18 to proceed"
        if (Number.isNaN(age)) errors.age = "Ages are numbers"
        if (!values.agree) errors.agree = "You must agree"
        return errors
      },
    },
    {
      label: "Review",
      component: ({ form, wizard }) => (
        <FormPage>
          <Fields>
            Please Confirm:
            {JSON.stringify(form.values)}
          </Fields>
          <Button onClick={form.handleSubmit}>Submit</Button>
          <Button onClick={wizard.previous}>Back</Button>
          <pre>
            Errors: {form.errors && JSON.stringify(form.errors, null, 2)}
          </pre>
        </FormPage>
      ),
      stepName: "review",
    },
  ]

  return (
    <Wizard onComplete={submitForm} pages={pages}>
      {props => {
        const { wizard, form } = props
        const {
          activePage: { component: Component },
        } = wizard
        return (
          <Container>
            <Nav>
              <Icon name="logotype" color="black" fontSize="32px" />
              <StepMarker
                steps={wizard.pages}
                currentStepIndex={wizard.pageIndex}
              />
            </Nav>
            <Component wizard={wizard} form={form} />

            <pre>Values: {JSON.stringify(wizard.values, null, 2)}</pre>
          </Container>
        )
      }}
    </Wizard>
  )
}

const Container = styled.div`
  margin: 20px;
  width: 500px;
  height: 400px;
`

const Label = styled.label`
  margin-right: 10px;
`

const InputContainer = styled.div`
  text-align: left;
`

const FormPage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: ${colors.white};
  justify-content: space-between;
  align-items: center;
`

const Fields = styled.div`
  margin: auto;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  input,
  checkbox {
    margin-top: 20px;
  }
`

const Nav = styled.div`
  border-bottom: 1px solid ${colors.grayRegular};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
`
