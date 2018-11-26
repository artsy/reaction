import React from "react"
import { Step, Stepper } from "Styleguide/Components"

function typedArray<T extends string>(...elems: T[]): T[] {
  return elems
}

export const offerFlowSteps = typedArray(
  "Offer",
  "Shipping",
  "Payment",
  "Review"
)
export const buyNowFlowSteps = typedArray("Shipping", "Payment", "Review")
export const counterofferFlowSteps = typedArray("Respond", "Review")

export function OrderStepper<StepName extends string>({
  currentStep,
  steps,
}: {
  steps: StepName[]
  currentStep: StepName
}) {
  const stepIndex = steps.indexOf(currentStep)
  return (
    <Stepper
      initialTabIndex={stepIndex}
      currentStepIndex={stepIndex}
      disableNavigation
      autoScroll
    >
      {steps.map(step => <Step name={step} key={step} />)}
    </Stepper>
  )
}
