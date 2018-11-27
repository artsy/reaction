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

export function OrderStepper<Steps extends string[]>({
  currentStep,
  steps,
}: {
  steps: Steps
  currentStep: Steps extends Array<infer K> ? K : never
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
