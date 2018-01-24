import React from "react"

import { StepProps } from "./Types"

interface Props {
  stepComponents: Array<React.ComponentClass<StepProps>>
  redirectTo?: string
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
}

class Wizard extends React.Component<Props, State> {
  static defaultProps = {
    redirectTo: "/",
  }

  constructor(props, state) {
    super(props, state)

    this.state = {
      currentStep: 0,
      nextButtonEnabled: false,
    }
  }

  getCurrentStep(): JSX.Element | null {
    const currentStep = this.state.currentStep

    if (currentStep > this.props.stepComponents.length - 1) {
      return null
    }

    const CurrentStep = this.props.stepComponents[currentStep]
    return (
      <CurrentStep onNextButtonPressed={this.onNextButtonPressed.bind(this)} />
    )
  }

  onNextButtonPressed(increaseBy = 1) {
    if (this.state.currentStep >= this.props.stepComponents.length - 1) {
      window.location.href = this.props.redirectTo
      return
    }

    const stepIndex = this.state.currentStep + increaseBy
    this.setState({ currentStep: stepIndex })
  }

  render() {
    const step = this.getCurrentStep()
    return <div>{step}</div>
  }
}

export default Wizard
