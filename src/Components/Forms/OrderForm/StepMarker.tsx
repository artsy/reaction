import React from "react"
import colors from "../../../Assets/Colors"
import styled from "styled-components"
import Icon from "../../Icon"
import { NavLink } from "react-router-dom"
import { Subscribe } from "unstated"
import { State } from "./State"
import { withRouter } from "react-router"
import { formSteps } from "./index"

export const StepMarker = withRouter(props => {
  return (
    <Subscribe to={[State]}>
      {(form: State) => {
        return (
          <Container>
            <Steps>
              {formSteps.map((step, key) => {
                const isDone = Boolean(
                  form.state.done.find(s => s === step.path)
                )

                const Step = getStep({
                  isActive: props.location.pathname === step.path,
                  isDone,
                })

                return (
                  <Step
                    to={step.path}
                    onClick={() => form.markDone(step.path)}
                    activeClassName="active"
                    key={key}
                  >
                    {isDone && <StyledIcon name="check" />}

                    {step.label}
                  </Step>
                )
              })}
            </Steps>
          </Container>
        )
      }}
    </Subscribe>
  )
})

const Container = styled.div`
  padding: 20px;
`

const Steps = styled.div`
  display: flex;
  max-width: 750px;
  margin: 0 auto;

  /* FIXME: Not sure why I need to override this */
  -webkit-padding-start: 0;
`

const getStep = props => {
  const { isActive, isDone } = props
  const circleSize = "14px"

  let bgColor = colors.white
  let circleBorderColor = colors.grayRegular
  let connectingBorderColor = colors.grayRegular

  if (isActive) {
    bgColor = colors.white
    circleBorderColor = colors.black
  }

  if (isDone) {
    bgColor = colors.black
    circleBorderColor = colors.black
    connectingBorderColor = colors.black
  }

  return styled(NavLink)`
    display: flex;
    position: relative;
    flex-grow: 1;
    justify-content: center;
    padding: 20px;

    &.active {
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
}

const StyledIcon = styled(Icon)`
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
