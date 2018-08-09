import React from "react"
import { Step, Stepper } from "Styleguide/Components/Stepper"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"

const steps = ["Shipping", "Payment", "Review"]

const getStepIndex = pathname =>
  steps.findIndex(step => pathname.includes(step.toLowerCase()))

export interface OrderAppProps {
  me: {
    name: string
  }
  params: {
    orderID: string
  }
  location: any
}

export class OrderApp extends React.Component<OrderAppProps> {
  removeTransitionHook: () => void

  constructor(props) {
    super(props)

    this.removeTransitionHook = props.router.addTransitionHook(
      this.onTransition
    )
  }

  componentWillUnmount() {
    this.removeTransitionHook()
  }

  onTransition = location => {
    // FIXME: This logic shouldn't be invoked on a non-form based route
    // Refresh
    if (window && location.pathname === window.location.pathname) {
      // Most browsers will ignore this and supply their own messaging for refresh
      return "Are you sure you want to refresh? Your changes will not be saved."
    }

    // https://regexper.com/#%5C%2Forder%5Cd%3F%5C%2F.%2B%5C%2F%28%5Cw%2B%29
    // Attempting to navigate to another route
    if (location.pathname.match(/\/order\d?\/.+\/(\w+)/)) {
      return true
    }

    return "Are you sure you want to leave? Your changes will not be saved."
  }

  render() {
    const { children, location } = this.props
    const stepIndex = getStepIndex(location.pathname)
    return (
      <>
        <Row>
          <Col>
            <Stepper initialTabIndex={stepIndex} currentStepIndex={stepIndex}>
              {steps.map(step => <Step name={step} key={step} />)}
            </Stepper>
          </Col>
        </Row>

        <Spacer mb={3} />

        {children}
      </>
    )
  }
}
