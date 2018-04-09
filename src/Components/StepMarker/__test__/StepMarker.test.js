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

  it("throws an error if config contains more than one isActive step", () => {
    const spy = spyOn(global.console, "error")

    mount(
      <StepMarker
        steps={[
          {
            label: "Foo",
            isActive: true,
            isComplete: false,
          },
          {
            label: "Bar",
            isActive: true,
            isComplete: false,
          },
        ]}
      />
    )

    expect(spy).toHaveBeenCalled()
  })

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

  it("goes to the next step when called", () => {
    const wrapper = mount(
      <StepMarker steps={getSteps()}>
        {renderProps => {
          return <button onClick={renderProps.nextStep} />
        }}
      </StepMarker>
    )

    wrapper.find("button").simulate("click")
    expect(wrapper.state().currentStep).toEqual(1)
  })

  it("goes to the previous step when called", () => {
    const wrapper = mount(
      <StepMarker steps={getSteps()}>
        {renderProps => {
          return (
            <div>
              <button id="next" onClick={renderProps.nextStep} />
              <button id="previous" onClick={renderProps.previousStep} />
            </div>
          )
        }}
      </StepMarker>
    )

    wrapper.find("#next").simulate("click")
    wrapper.find("#next").simulate("click")
    expect(wrapper.state().currentStep).toEqual(2)

    wrapper.find("#previous").simulate("click")
    wrapper.find("#previous").simulate("click")
    expect(wrapper.state().currentStep).toEqual(0)
  })

  it("goes to a specic step when called", () => {
    const wrapper = mount(
      <StepMarker steps={getSteps()}>
        {renderProps => {
          return <button onClick={() => renderProps.gotoStep(2)} />
        }}
      </StepMarker>
    )

    wrapper.find("button").simulate("click")
    expect(wrapper.state().currentStep).toEqual(2)
  })

  it("does not advance past number of steps passed + 1 (complete)", () => {
    const wrapper = mount(
      <StepMarker steps={getSteps()}>
        {renderProps => {
          return <button onClick={renderProps.nextStep} />
        }}
      </StepMarker>
    )

    wrapper.find("button").simulate("click")
    wrapper.find("button").simulate("click")
    wrapper.find("button").simulate("click")
    wrapper.find("button").simulate("click")
    wrapper.find("button").simulate("click")
    expect(wrapper.state().currentStep).toEqual(3)
  })

  it("does not retreat past first step", () => {
    const wrapper = mount(
      <StepMarker steps={getSteps()}>
        {renderProps => {
          return (
            <div>
              <button id="gotoStep" onClick={() => renderProps.gotoStep(2)} />
              <button id="previous" onClick={renderProps.previousStep} />
            </div>
          )
        }}
      </StepMarker>
    )

    wrapper.find("#gotoStep").simulate("click")
    wrapper.find("#previous").simulate("click")
    wrapper.find("#previous").simulate("click")
    wrapper.find("#previous").simulate("click")
    wrapper.find("#previous").simulate("click")
    expect(wrapper.state().currentStep).toEqual(0)
  })

  it("returns boolean from isComplete", done => {
    const wrapper = mount(
      <StepMarker steps={getSteps()}>
        {renderProps => {
          return (
            <div>
              <button id="next" onClick={() => renderProps.nextStep()} />
              <button
                id="isComplete"
                onClick={() => {
                  if (renderProps.isComplete()) {
                    done()
                  } else {
                    fail()
                  }
                }}
              />
            </div>
          )
        }}
      </StepMarker>
    )

    wrapper.find("#next").simulate("click")
    wrapper.find("#next").simulate("click")
    wrapper.find("#next").simulate("click")
    wrapper.find("#next").simulate("click")
    wrapper.find("#next").simulate("click")
    wrapper.find("#isComplete").simulate("click")
  })
})
