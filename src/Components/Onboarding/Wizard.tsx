import React from "react"

// import { StepProps } from "./Types"
// Array<React.ComponentClass<StepProps>>

interface Props {
  stepComponents: any[]
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

  state = {
    currentStep: 0,
    nextButtonEnabled: false,
  }

  getCurrentStep(): JSX.Element | null {
    const currentStep = this.state.currentStep

    if (currentStep > this.props.stepComponents.length - 1) {
      return null
    }

    const CurrentStep = this.props.stepComponents[currentStep]
    return <CurrentStep onNextButtonPressed={this.onNextButtonPressed} />
  }

  onNextButtonPressed = (increaseBy = 1) => {
    const { currentStep } = this.state
    const { stepComponents, redirectTo } = this.props

    if (currentStep >= stepComponents.length - 1) {
      window.location.href = redirectTo
    } else {
      const stepIndex = currentStep + increaseBy
      const nextComponent = stepComponents[stepIndex]
      window.history.pushState({}, "", `/personalize/${nextComponent.slug}`)
      this.setState({ currentStep: stepIndex })
    }
  }

  render() {
    const step = this.getCurrentStep()
    return <div>{step}</div>
  }
}

export default Wizard
