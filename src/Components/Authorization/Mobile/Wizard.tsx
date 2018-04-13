import React, { Children } from "react"
import Button from "../../Buttons/Inverted"

interface Props {
  redirectTo?: string
  errors: any
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
}

class Wizard extends React.Component<Props, State> {
  shouldAllowNextStop = false

  constructor(props, state) {
    super(props, state)

    this.state = {
      currentStep: 0,
      nextButtonEnabled: false,
    }
  }

  get stepComponents() {
    return Children.toArray(this.props.children)
  }

  disableButton(hasError: boolean) {
    this.setState({ nextButtonEnabled: !hasError })
  }

  getCurrentStep(): JSX.Element | null {
    const currentStep = this.state.currentStep

    if (currentStep > this.stepComponents.length - 1) {
      return null
    }

    const CurrentStep = this.stepComponents[currentStep] as React.ReactElement<
      any
    >

    return CurrentStep
  }

  onNextButtonPressed() {
    if (this.state.currentStep >= this.stepComponents.length - 1) {
      return
    }

    const stepIndex = this.state.currentStep + 1
    this.setState({ currentStep: stepIndex })
  }

  validate(): boolean {
    const step = this.stepComponents[this.state.currentStep] as any

    const hasErrors = Children.toArray(step.props.children)
      .map((input: any) => {
        return !!this.props.errors[input.props.name]
      })
      .reduce((acc, currentValue) => acc && currentValue)

    return hasErrors
  }

  render() {
    const step = this.stepComponents[this.state.currentStep]
    this.shouldAllowNextStop = this.validate()
    return (
      <div>
        {step}

        <Button
          type="submit"
          disabled={this.shouldAllowNextStop}
          block
          onClick={this.onNextButtonPressed.bind(this)}
        >
          Next
        </Button>
      </div>
    )
  }
}

export default Wizard
