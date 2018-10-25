import React from "react"
import { Step, Stepper } from "Styleguide/Components"

const offerFlow = ["Offer", "Shipping", "Payment", "Review"]
const buyNowFlow = ["Shipping", "Payment", "Review"]

type OrderStepperProps =
  | {
      currentStep: "Offer" | "Shipping" | "Payment" | "Review"
      offerFlow: true
    }
  | {
      currentStep: "Shipping" | "Payment" | "Review"
      offerFlow: false
    }

export const OrderStepper: React.SFC<OrderStepperProps> = ({
  currentStep,
  ...more
}) => {
  const steps = more.offerFlow ? offerFlow : buyNowFlow
  const stepIndex = steps.indexOf(currentStep)
  return (
    <Stepper
      initialTabIndex={stepIndex}
      currentStepIndex={stepIndex}
      disableNavigation
    >
      {steps.map(step => <Step name={step} key={step} />)}
    </Stepper>
  )
}
