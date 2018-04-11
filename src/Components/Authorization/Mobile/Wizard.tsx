import React from "react"

import { StepProps } from "./Step"
import Button from "../../Buttons/Inverted"

export type HandleValidation = (hasError: boolean) => void

type StepsContainer = React.ReactElement<any>

type RenderCallback = (handleValidation: HandleValidation) => StepsContainer

interface Props {
  redirectTo?: string
  children: RenderCallback
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
}

function extractStepsFromContainer(stepsContainer: StepsContainer) {
  return React.Children.toArray(stepsContainer.props.children)
}

class Wizard extends React.Component<Props, State> {
  stepComponents = []

  constructor(props, state) {
    super(props, state)

    const renderCallback: RenderCallback = this.props.children
    const handleValidation: HandleValidation = this.onValidation.bind(this)

    const stepsContainer: StepsContainer = renderCallback(handleValidation)
    this.stepComponents = extractStepsFromContainer(stepsContainer)

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

    console.log("current step:", step.props.children)

    // console.log(
    //   Children.toArray(step.props.children).map(input => [
    //     input.props.name,
    //     input.props.error,
    //   ])
    // )
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
