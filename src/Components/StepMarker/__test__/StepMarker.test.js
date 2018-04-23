import React from "react"
import { StepMarker } from "../"
import { cloneDeep } from "lodash"
import { mount } from "enzyme"

describe("StepMarker", () => {
  const defaultSteps = [
    {
      label: "Shipping",
      isActive: false,
      isComplete: false,
    },
    {
      label: "Payment",
      isActive: false,
      isComplete: false,
    },
    {
      label: "Review",
      isActive: false,
      isComplete: false,
    },
  ]

  const getSteps = () => cloneDeep(defaultSteps)

  it("sets step labels", () => {
    const wrapper = mount(<StepMarker steps={getSteps()} />)
    const Steps = wrapper.find("Step")

    Steps.forEach((Step, index) => {
      expect(Step.text()).toContain(defaultSteps[index].label)
    })

    expect(Steps.length).toEqual(3)
  })

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
