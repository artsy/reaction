import React from "react"
import Events from "../../Utils/Events"
import { track } from "../../Utils/track"
import { ProgressIndicator } from "./ProgressIndicator"
import { StepComponent, StepSlugs } from "./Types"

interface Props {
  stepComponents: StepComponent[]
  redirectTo?: string
  forceStep?: StepSlugs
  tracking?: any
}

interface State {
  currentStep: number
  nextButtonEnabled: boolean
  percentComplete: number
}

@track(
  { page: "Onboarding" },
  {
    dispatch: data => Events.postEvent(data),
  }
)
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

  onFinish = () => {
    const { redirectTo } = this.props
    this.setState({ percentComplete: 1 })
    setTimeout(() => {
      window.location.href = redirectTo
    }, 500)

    this.props.tracking.trackEvent({
      action: "Completed Onboarding",
    })
  }

  onNextButtonPressed = (increaseBy = 1) => {
    const { currentStep } = this.state
    const { stepComponents } = this.props

    if (currentStep >= stepComponents.length - 1) {
      this.onFinish()
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
