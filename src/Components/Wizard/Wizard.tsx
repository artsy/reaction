import React from "react"
import { RenderProps, WizardSteps } from "./types"

interface Props {
  onComplete?: any
  pages: WizardSteps
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
    const { pages, onComplete } = this.props
    return React.createElement(this.props.children, {
      pages,
      pageIndex,
      next: this.next,
      previous: this.previous,
      onComplete,
      values: this.state.values,
    })
  }
}
