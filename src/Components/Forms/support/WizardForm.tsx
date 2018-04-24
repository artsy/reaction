import React from "react"
import {
  Formik,
  FormikActions,
  // FormikProps
} from "formik"
import { RenderProps as WizardRenderProps, Step } from "../../Wizard"
import styled from "styled-components"

interface Props extends WizardRenderProps {
  initialValues?: any
  container?: React.ComponentClass<any> // a (probably styled) form element
  pages?: Step[]
}

const FormContainer = styled.form`
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
`

export class WizardForm extends React.Component<Props> {
  static defaultProps = {
    initialValues: {},
    container: FormContainer,
  }
  private next: <Values>(v: Values) => void

  constructor(props) {
    super(props)
    this.next = props.next
  }

  handleSubmit: <V>(values: V, actions: FormikActions<V>) => void = (
    values,
    actions
    // formikActions I think this may not be available
  ) => {
    if (this.props.isLastPage) {
      this.props.onComplete(values)
    } else {
      actions.setSubmitting(false)
      this.next(values)
    }
  }

  render() {
    // Don't pass props.next to the child- use formik's onSubmit
    const { initialValues, container: Form, next, ...wizardProps } = this.props
    const ActiveComponent = this.props.activePage.component

    return (
      <Formik
        initialValues={initialValues}
        validate={this.props.activePage.validate}
        validationSchema={this.props.activePage.validationSchema}
        onSubmit={this.handleSubmit}
        render={formikRenderProps => {
          const { handleSubmit } = formikRenderProps
          return (
            <Form onSubmit={handleSubmit}>
              <ActiveComponent form={formikRenderProps} wizard={wizardProps} />
            </Form>
          )
        }}
      />
    )
  }
}
