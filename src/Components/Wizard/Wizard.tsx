import React from "react"

import { RenderProps, WizardSchema } from "./types"

// export const Step: StepType = ({ component: Component, ...restProps }) => (
//   <Component {...restProps} />
// )

interface Props {
  onComplete?: any // (values: any) => void // FormikHandler
  pages: WizardSchema
  children: React.ComponentType<RenderProps>
}

interface State {
  pageIndex: number
  values?: any
}

export class Wizard extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 0,
    }
  }

  get activePage() {
    return this.props.pages[this.state.pageIndex]
  }

  next = values =>
    this.setState(state => ({
      pageIndex: Math.min(state.pageIndex + 1, this.props.pages.length - 1),
      values,
    }))

  previous = () =>
    this.setState(state => ({
      pageIndex: Math.max(state.pageIndex - 1, 0),
    }))

  isLastPage = () => this.state.pageIndex === this.props.pages.length - 1

  handleSubmit = values => {
    const { onComplete } = this.props
    if (this.isLastPage()) {
      return onComplete(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { pageIndex } = this.state
    const { children: Wrapper } = this.props
    return (
      <Wrapper
        pages={this.props.pages}
        pageIndex={pageIndex}
        next={this.next}
        previous={this.previous}
        onComplete={this.props.onComplete}
        values={this.state.values}
        // goToPage=
        // reset=
        // exit=
      />
    )
  }
}
