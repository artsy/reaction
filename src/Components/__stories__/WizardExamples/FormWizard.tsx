import React from "react"
import yup from "yup"
import { WizardSchema, Wizard, RenderProps } from "../../Wizard"
import { StepMarker } from "../../Wizard/StepMarker"
import { Field, validateYupSchemaSync, WizardForm } from "../../Forms/support"
import Button from "../../Buttons/Default"
import styled from "styled-components"
import colors from "../../../Assets/Colors"

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
          <Field autoFocus name="name" type="text" placeholder="Your Name" />
          <Button onClick={props.form.handleSubmit}>Continue to Age</Button>
        </FormPage>
      ),
      stepName: "name",
      validate: validateYupSchemaSync({
        name: yup.string().required("Please enter your name"),
      }),
    },
    {
      label: "Age",
      component: ({ form, wizard }) => (
        <FormPage>
          <Field autoFocus name="age" type="text" placeholder="Your Age" />
          <Button onClick={form.handleSubmit}>Finish</Button>
          <Button onClick={wizard.previous}>Back</Button>
        </FormPage>
      ),
      stepName: "age",
      validate: validateYupSchemaSync({
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
          {JSON.stringify(form.values)}
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
          <StepMarker
            steps={wizardBag.pages}
            currentStepIndex={wizardBag.pageIndex}
          />
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
  height: 500px;
`

const FormPage = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  text-align: center;
  background: ${colors.white};
  justify-content: flex-start;
`

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid black;
`
