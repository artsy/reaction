import Icon from "../Icon"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import Text from "../Text"
import colors from "../../Assets/Colors"
import styled from "styled-components"
import { unica } from "Assets/Fonts"
import { ReactNode } from "react"

export interface RenderProps {
  nextStep: () => void
  previousStep: () => void
  gotoStep: (index: number) => void
  stepState: StepMarkerState
  isComplete: () => boolean
}

export interface StepMarkerProps {
  children?: (renderProps: RenderProps) => ReactNode | void
  steps: MarkLabel[]
  style?: any
  onChange?: any
  currentStepIndex: number
}

export interface StepMarkerState {
  currentStepIndex: number
  steps: MarkState[]
}

type MarkState = MarkLabel & {
  isActive: boolean
  isComplete: boolean
  stepLength: number
}

interface MarkLabel {
  label?: string
  onClick?: any
}

export class StepMarker extends Component<StepMarkerProps, StepMarkerState> {
  private containerRef
  constructor(props: StepMarkerProps) {
    super(props)
    this.state = this.computeStepState(props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentStepIndex !== this.props.currentStepIndex) {
      this.setState(this.computeStepState(nextProps))
    }
  }

  computeStepState(props) {
    let { currentStepIndex, steps } = props
    const stepState = steps.map((step, i) => {
      const isActive = i === currentStepIndex
      const isComplete = i < currentStepIndex
      return { ...step, isActive, isComplete }
    })
    return {
      steps: stepState,
      currentStepIndex,
    }
  }

  get width() {
    return this.containerRef
      ? ReactDOM.findDOMNode(this.containerRef).clientWidth
      : null
  }
  get stepLength() {
    return this.width ? this.width / (this.props.steps.length - 1) : 0
  }

  render() {
    const { style } = this.props
    const { steps } = this.state

    return (
      <Container style={style} innerRef={r => (this.containerRef = r)}>
        <Markers>
          {steps.map((step, key) => {
            return (
              this.containerRef && (
                <Mark {...step} key={key} stepLength={this.stepLength}>
                  {step.isComplete && <StyledIcon name="check" color="white" />}
                  <StyledText onClick={step.onClick} align="center">
                    {step.label}
                  </StyledText>
                </Mark>
              )
            )
          })}
        </Markers>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 20px 0;
`

const Markers = styled.div`
  display: flex;
  width: 100%;
`

const Mark = styled.div`
  ${(props: MarkState) => {
    const { isActive, isComplete, stepLength } = props
    const circleSize = "10px" // + 2px border
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
      margin:: 0 12px
      padding: 12px 0;
      text-align: center;
      width: 100%;
      &:first-child { margin-left: 0; }
      &:last-child { margin-right: 0; }
      border-left: 1px solid red;
      border-right: 1px solid blue;
      &:first-child {
        flex: 0;
      }

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
        width: calc(${stepLength}px - ${circleSize});
        left: 50%;
        top: 1px;
        position: absolute;
        content: " ";
      }

      &:last-child{
        flex: 0;
        border: 1px solid green;
        padding-right: 0
        &:before {
          left: initial;
          right: calc(50% - calc(${circleSize}));
        }

        &:after {
          border-top: none;
        }
      }

    `
  }};
`

const StyledText = Text.extend`
  ${unica("s12", "regular")};
  margin-top: 0;
  margin-bottom: 0;
`

const StyledIcon = Icon.extend`
  width: 100%;
  text-align: center;
  font-size: 6px;
  color: white;
  position: absolute;
  top: -1px;
  left: -3px;
  z-index: 3;
`
