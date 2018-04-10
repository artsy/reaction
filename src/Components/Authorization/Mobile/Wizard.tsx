import React, { Children } from "react"

import { StepProps } from "./Step"
import Button from "../../Buttons/Inverted"

// import { StepProps } from "./Types"

interface Props {
  // stepComponents: Array<React.Component<StepProps>>
  redirectTo?: string
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
}

class Wizard extends React.Component<Props, State> {
  stepComponents = []
  button

  constructor(props, state) {
    super(props, state)

    const children = (this.props.children as any)(this.onValidation.bind(this))
    this.stepComponents = React.Children.toArray(children.props.children)

    this.state = {
      currentStep: 0,
      nextButtonEnabled: false,
    }
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
      StepProps
    >

    return (
      <div>{CurrentStep}</div>
      // <CurrentStep
      //   onValidate={this.disableButton}
      //   onNextButtonPressed={this.onNextButtonPressed.bind(this)}
      // />
    )
  }

  onNextButtonPressed() {
    if (this.state.currentStep >= this.stepComponents.length - 1) {
      return
    }

    const stepIndex = this.state.currentStep + 1
    this.setState({ currentStep: stepIndex })
  }

  onValidation(hasError) {
    // this.setState({
    //   nextButtonEnabled: !hasError,
    // })
  }

  render() {
    const step = this.stepComponents[this.state.currentStep]

    console.log(
      Children.toArray(step.props.children).map(input => input.props.name)
    )
    return (
      <div>
        {step}

        <Button
          type="submit"
          disabled={false}
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
