import React from "react"
import { Step, Stepper } from "Styleguide/Components"

const makeOfferFlow = ["Offer", "Shipping", "Payment", "Review"]
const buyNowFlow = ["Shipping", "Payment", "Review"]

type OrderStepperProps =
  | {
      currentStep: "Offer" | "Shipping" | "Payment" | "Review"
      makeOfferFlow: true
    }
  | {
      currentStep: "Shipping" | "Payment" | "Review"
      makeOfferFlow: false
    }

export const OrderStepper: React.SFC<OrderStepperProps> = ({
  currentStep,
  ...more
}) => {
  const steps = "makeOfferFlow" in more ? makeOfferFlow : buyNowFlow
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
