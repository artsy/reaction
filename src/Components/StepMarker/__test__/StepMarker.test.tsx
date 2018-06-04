import React from "react"
import { StepMarker } from "../"
import { cloneDeep } from "lodash"
import { mount } from "enzyme"
import { Step } from "../../Wizard"

describe("StepMarker", () => {
  const defaultSteps = [
    <Step label="Shipping" />,
    <Step label="Payment" />,
    <Step label="Review" />,
  ]

  const getSteps = () => cloneDeep(defaultSteps)

  it("sets first step active by default", () => {
    mount(
      <StepMarker steps={getSteps()}>
        {({ stepState }) => {
          expect(stepState.steps[0].isActive).toEqual(true)
        }}
      </StepMarker>
    )
  })

  it("updates step isActive state based on passed config", () => {
    const steps = getSteps()
    steps[1].isActive = true

    mount(
      <StepMarker steps={steps}>
        {({ stepState }) => {
          expect(stepState.steps[1].isActive).toEqual(true)
        }}
      </StepMarker>
    )
  })

  it("returns render props representing API", () => {
    mount(
      <StepMarker steps={getSteps()}>
        {renderProps => {
          expect(Object.keys(renderProps)).toEqual([
            "nextStep",
            "previousStep",
            "gotoStep",
            "stepState",
            "isComplete",
          ])
        }}
      </StepMarker>
    )
  })
})
