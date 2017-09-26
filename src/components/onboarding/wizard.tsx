import * as React from "react"
import Button from "../buttons/default"

interface Props {
  stepComponents: Array<React.ComponentClass<any>>
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
}

class Wizard extends React.Component<Props, State> {
  currentStepComponent: any

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

    const Step = this.props.stepComponents[currentStep]
    return <Step onStateChange={this.onStepStateChanged.bind(this)} ref={step => (this.currentStepComponent = step)} />
  }

  onStepStateChanged(state: boolean) {
    this.setState({
      nextButtonEnabled: state,
    })
  }

  onNextButtonPressed() {
    if (this.props.stepComponents.length <= this.state.currentStep) {
      return
    }

    this.currentStepComponent.submit()

    const stepIndex = this.state.currentStep + 1
    this.setState({ currentStep: stepIndex })
  }

  render() {
    const step = this.getCurrentStep()
    return (
      <div>
        {step}
        <Button disabled={!this.state.nextButtonEnabled} onClick={this.onNextButtonPressed.bind(this)}>
          Next
        </Button>
      </div>
    )
  }
}

export default Wizard
