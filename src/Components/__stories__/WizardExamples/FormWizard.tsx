import React from "react"
import yup from "yup"
import { WizardSchema, Wizard, RenderProps } from "../../Wizard"
import { StepMarker } from "../../StepMarker"
import {
  FormikInput,
  FormikCheckbox,
  validateYupSchemaSync,
  WizardForm,
} from "../../Forms/support"
import Button from "../../Buttons/Default"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import Icon from "../../Icon"

export const FormWizard = () => {
  const submitForm = (values, actions) => {
    window.alert(`Name: ${values.name} | Age: ${values.age}`)
    actions.setSubmitting(false)
  }

  const pages: WizardSchema = [
    {
      label: "Name",
      component: props => (
        <FormPage>
          <Fields>
            <FormikInput
              autoFocus
              name="name"
              type="text"
              placeholder="Your Name"
            />
          </Fields>
          <Button onClick={props.form.handleSubmit}>Continue to Age</Button>
        </FormPage>
      ),
      stepName: "name",
      validate: validateYupSchemaSync({
        name: yup.string().required("Please enter your name"),
      }),
    },
    {
      label: "Terms",
      component: ({ form, wizard }) => (
        <FormPage>
          <Fields>
            <FormikInput
              autoFocus
              name="age"
              type="text"
              placeholder="Your Age"
            />
            <FormikCheckbox name="agree">Agree</FormikCheckbox>
          </Fields>
          <Button onClick={form.handleSubmit}>Finish</Button>
          <Button onClick={wizard.previous}>Back</Button>
        </FormPage>
      ),
      stepName: "age",
      validate: validateYupSchemaSync({
        agree: yup.boolean().oneOf([true], "You must agree"),
        age: yup
          .number()
          .min(18, "You must be at least 18 to proceed")
          .required("Age is required"),
      }),
    },
    {
      label: "Review",
      component: ({ wizard, form }) => (
        <FormPage>
          <Fields>
            Please Confirm:
            {JSON.stringify(form.values)}
          </Fields>

          <Button onClick={form.handleSubmit}>Submit</Button>
          <Button onClick={wizard.previous}>Back</Button>
        </FormPage>
      ),
      stepName: "review",
    },
  ]
  return (
    <Wizard onComplete={submitForm} pages={pages}>
      {(wizardBag: RenderProps) => (
        <Container>
          <Nav>
            <Icon name="logotype" color="black" fontSize="32px" />
            <StepMarker
              steps={wizardBag.pages}
              currentStepIndex={wizardBag.pageIndex}
            />
          </Nav>
          <WizardForm {...wizardBag} container={Form} />
          <pre>{JSON.stringify(wizardBag.values, null, 2)}</pre>
        </Container>
      )}
    </Wizard>
  )
}

const Container = styled.div`
  margin: 20px;
  width: 500px;
  height: 400px;
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

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 20px;
`

const Fields = styled.div`
  margin: auto;
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
// ${NavIcon} {
//   height: ${(p: any) => p.height}px;
// }
