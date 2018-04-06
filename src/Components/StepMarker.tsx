import React, { Component } from "react"
import Icon from "./Icon"
import Text from "./Text"
import colors from "../Assets/Colors"
import styled from "styled-components"
import { isUndefined } from "lodash"

interface Step {
  label?: string
  isActive?: boolean
  isComplete?: boolean
}

interface Props {
  steps?: Step[] // FIXME: Remove optional
}

interface State {
  currentStep: number
  steps: Step[]
}

export function buildStepMarker(config) {
  function validate(props: Props) {
    const invalid = props.steps.filter(step => step.isActive).length > 1

    if (invalid) {
      console.error(
        "(Components/StepMarker) Error: Step configuration has more than",
        "one active item."
      )
    }
  }

  function getStepState(propsOrState: State) {
    let { currentStep, steps } = propsOrState

    // If currentStep isn't being passed in, attempt to infer it from configuration
    if (isUndefined(currentStep)) {
      // Compute the active step based upon the last known active or complete step
      currentStep = steps.reduce((acc, step, index) => {
        return step.isActive || step.isComplete ? index : acc
      }, 0)
    }

    steps = steps.reduce((acc, step, index) => {
      let stepToUpdate = {
        ...step,
        isActive: false,
        isComplete: false,
      }

      if (index < currentStep) {
        stepToUpdate.isComplete = true
      }
      if (index === currentStep) {
        stepToUpdate.isActive = true
      }

      return acc.concat([stepToUpdate])
    }, [])

    return {
      currentStep,
      steps,
    }
  }

  function updateStep(state, currentStep) {
    this.getStepState({
      ...state,
      currentStep,
    })
  }

  function nextStep() {
    if (this.state.currentStep < this.props.steps.length) {
      this.updateStep(this.state.currentStep + 1)
    }
  }

  function previousStep() {
    if (this.state.currentStep > 0) {
      this.updateStep(this.state.currentStep - 1)
    }
  }

  function gotoStep(index) {
    this.updateStep(index)
  }

  const API = {
    nextStep: x => x,
    previousStep: x => x,
    gotoStep: x => x,
  }

  class StepMarker extends Component<Props, State> {
    constructor(props) {
      super(props)
      validate(props)
      this.state = getStepState(props)
    }

    render() {
      const { steps } = this.state

      return (
        <Container>
          <Steps>
            {steps.map(step => {
              return (
                <Step {...step}>
                  {step.isComplete && <StyledIcon name="check" />}
                  <StyledText align="center">{step.label}</StyledText>
                </Step>
              )
            })}
          </Steps>
        </Container>
      )
    }
  }

  return {
    ...API,
    StepMarker,
  }
}

const Container = styled.div`
  padding: 20px;
`

const Steps = styled.div`
  display: flex;
`

const Step = styled.div`
  ${(props: Step) => {
    const { isActive, isComplete } = props

    const circleSize = "14px"
    let bgColor = colors.white
    let circleBorderColor = colors.grayRegular
    let connectingBorderColor = colors.grayRegular

    if (isActive) {
      bgColor = colors.white
      circleBorderColor = colors.black
    }

    if (isComplete) {
      bgColor = colors.black
      circleBorderColor = colors.black
      connectingBorderColor = colors.black
    }

    return `
      position: relative;
      padding: 20px;
      text-align: center;
      width: 100px;

      &:before {
        background: ${bgColor};
        border-radius: 50%;
        border: 2px solid ${circleBorderColor};
        top: calc(-${circleSize} / 2);
        left: calc(50% - calc(${circleSize} / 2));
        width: ${circleSize};
        height: ${circleSize};
        position: absolute;
        content: " ";
        z-index: 2;
      }

      &:after {
        border-top: 2px solid ${connectingBorderColor};
        width: 100%;
        left: 50%;
        top: 1px;
        position: absolute;
        content: " ";
      }

      &:last-child:after {
        border-top: none;
      }
    `
  }};
`

const StyledText = Text.extend`
  margin-top: 0;
  margin-bottom: 0;
`

const StyledIcon = Icon.extend`
  position: absolute;
  font-size: 12px;
  width: 100%;
  text-align: center;
  font-size: 9px;
  color: white;
  z-index: 3;
  top: -2px;
  left: -3px;
`
