import React from "react"
import { ProgressIndicator } from "./ProgressIndicator"
import { StepComponent, StepSlugs } from "./Types"

interface Props {
  stepComponents: StepComponent[]
  redirectTo?: string
  forceStep?: StepSlugs
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
  percentComplete: number
}

class Wizard extends React.Component<Props, State> {
  static defaultProps = {
    redirectTo: "/",
    forceStep: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentStep: this.getForceStep(),
      nextButtonEnabled: false,
      percentComplete: 0,
    }
  }

  getForceStep = () => {
    const { forceStep } = this.props
    const stepSlugs = this.props.stepComponents.map(step => step.slug)
    if (forceStep && stepSlugs.includes(forceStep)) {
      return stepSlugs.indexOf(forceStep)
    } else {
      return 0
    }
  }

  componentDidMount() {
    const { stepComponents } = this.props
    const { currentStep } = this.state
    window.history.pushState(
      {},
      "",
      `/personalize/${stepComponents[currentStep].slug}`
    )
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
      this.setState({
        currentStep: stepIndex,
        percentComplete: stepIndex / stepComponents.length,
      })
    }
  }

  render() {
    const step = this.getCurrentStep()
    return (
      <div>
        <ProgressIndicator percentComplete={this.state.percentComplete} />
        {step}
      </div>
    )
  }
}

export default Wizard
