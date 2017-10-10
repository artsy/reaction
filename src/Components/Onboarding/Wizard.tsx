import * as React from "react"

import { StepProps } from "./types"

interface Props {
  stepComponents: Array<React.ComponentClass<StepProps>>
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
}

class Wizard extends React.Component<Props, State> {
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
    return <CurrentStep onNextButtonPressed={this.onNextButtonPressed.bind(this)} />
  }

  onNextButtonPressed() {
    if (this.props.stepComponents.length <= this.state.currentStep) {
      return
    }

    const stepIndex = this.state.currentStep + 1
    this.setState({ currentStep: stepIndex })
  }

  render() {
    const step = this.getCurrentStep()
    return (
      <div>
        {step}
      </div>
    )
  }
}

export default Wizard
