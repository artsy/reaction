import React from "react"
import { Step, Stepper } from "Styleguide/Components"

const steps = ["Shipping", "Payment", "Review"]

const getStepIndex = pathname =>
  steps.findIndex(step => pathname.includes(step.toLowerCase()))

interface BuyNowStepperProps {
  currentStep: "shipping" | "payment" | "review"
}

export const BuyNowStepper: React.SFC<BuyNowStepperProps> = ({
  currentStep,
}) => {
  const stepIndex = getStepIndex(currentStep)
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
