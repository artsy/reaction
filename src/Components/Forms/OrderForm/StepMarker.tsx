import React from "react"
import colors from "../../../Assets/Colors"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { formSteps } from "./index"

export const StepMarker = props => {
  return (
    <Container>
      <Steps>
        {formSteps.map((step, index) => {
          return (
            <Step activeClassName={"active"} to={step.path}>
              {step.label}
            </Step>
          )
        })}
      </Steps>
    </Container>
  )
}

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

const Step = styled(NavLink)`
  ${p => {
    const circleSize = "14px"

    return `
      display: flex;
      position: relative;
      flex-grow: 1;
      justify-content: center;
      padding: 20px;

      &.active {
        font-weight: bold;
      }

      &:before {
        background: ${colors.white};
        border-radius: 50%;
        border: 2px solid ${colors.grayRegular};
        top: calc(-${circleSize} / 2);
        left: calc(50% - calc(${circleSize} / 2));
        width: ${circleSize};
        height: ${circleSize};
        position: absolute;
        content: " ";
        z-index: 2;
      }

      &:after {
        border-top: 2px solid ${colors.grayRegular};
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
