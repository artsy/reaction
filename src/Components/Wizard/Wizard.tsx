import React from "react"
import { Step } from "./types"
import { Formik, FormikBag } from "formik"

interface Props {
  onComplete?: (values?: { (key: string): any }, actions?: any) => void
  initialValues?: any
  pages: Step[]
  children?: React.ComponentType<{ wizard: any; form: any }>
}

interface State {
  pageIndex: number
  values?: any
}

export class Wizard extends React.Component<Props, State> {
  static defaultProps = {
    initialValues: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 0,
    }
  }

  get activePage() {
    return this.props.pages[this.state.pageIndex]
  }

  get isLastPage() {
    return this.state.pageIndex === this.props.pages.length - 1
  }

  next = (e: React.FormEvent<any> | null, values) => {
    e && e.preventDefault()
    this.setState(state => ({
      pageIndex: Math.min(state.pageIndex + 1, this.props.pages.length - 1),
      values,
    }))
  }

  previous = (e: React.FormEvent<any> | null, values) => {
    e && e.preventDefault()
    this.setState(state => ({
      pageIndex: Math.max(state.pageIndex - 1, 0),
    }))
  }

  handleSubmit: (values: any, actions?: FormikBag<any, any>) => void = (
    values,
    actions
  ) => {
    const { onComplete } = this.props
    if (this.isLastPage) {
      onComplete && onComplete(values)
    } else {
      actions && actions.setSubmitting(false)
      this.next(null, values)
    }
  }

  render() {
    const { pageIndex } = this.state
    const { pages, onComplete, initialValues, children } = this.props
    const {
      component: ActiveComponent,
      validate,
      validationSchema,
    } = this.activePage

    const wizardProps = {
      activePage: this.activePage,
      isLastPage: this.isLastPage,
      previous: this.previous,
      next: this.next,
      onComplete,
      pageIndex,
      pages,
      values: this.state.values,
    }

    return (
      <Formik
        initialValues={initialValues}
        validate={validate}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
        render={formikRenderProps => {
          const { handleSubmit } = formikRenderProps
          return (
            <form onSubmit={handleSubmit}>
              {children ? (
                React.createElement(children, {
                  wizard: wizardProps,
                  form: formikRenderProps,
                })
              ) : (
                <ActiveComponent
                  form={formikRenderProps}
                  wizard={wizardProps}
                />
              )}
            </form>
          )
          // return children ?
          //   React.createElement(children, { wizard: wizardProps, formik: formikRenderProps})
          //   : ( <form onSubmit={handleSubmit}>
          //     <ActiveComponent form={formikRenderProps} wizard={wizardProps} />
          //   </form>
          // )
        }}
      />
    )
  }
}
