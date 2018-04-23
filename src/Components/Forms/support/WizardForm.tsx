import React from "react"
import { Formik, FormikActions, FormikProps } from "formik"
import {
  RenderProps as WizardRenderProps,
  WizardSchema,
  Step,
} from "../../Wizard"

// TODO: resolve this
// interface FormStep extends Step {
//   component: React.ComponentType<{
//     wizard: WizardRenderProps
//     form: FormikProps<any>
//   }>
// }
interface Props extends WizardRenderProps {
  initialValues?: any
  container: any // a (probably styled) form element
  pages?: WizardSchema
}
export class WizardForm extends React.Component<Props> {
  static defaultProps = { initialValues: {} }
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
    if (this.isLastPage) {
      this.props.onComplete(values)
    } else {
      actions.setSubmitting(false)
      this.next(values)
    }
  }

  get isLastPage() {
    return this.props.pageIndex === this.props.pages.length - 1
  }

  get activePage(): any {
    return this.props.pages[this.props.pageIndex]
  }

  render() {
    // Don't pass props.next to the child- use formik's onSubmit
    const { initialValues, container: Form, next, ...wizardProps } = this.props
    const ActiveComponent = this.activePage.component

    return (
      <Formik
        initialValues={initialValues}
        validate={this.activePage.validate}
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
