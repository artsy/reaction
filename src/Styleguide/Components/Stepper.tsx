import { color, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Tab, Tabs, TabsProps } from "Styleguide/Components/Tabs"
import { Flex } from "Styleguide/Elements/Flex"

interface StepperProps extends TabsProps {
  initialTabIndex: number

  /* the step user currently is at */
  currentStepIndex: number
}

const transformTabBtn = (
  element: JSX.Element,
  tabIndex: number,
  props: any
): JSX.Element => {
  const { currentStepIndex } = props
  if (currentStepIndex && tabIndex < currentStepIndex) {
    return (
      <Flex>
        <CheckMarkWrapper>
          <CheckMark />
        </CheckMarkWrapper>
        {element}
        <div /> {/* hack for getting rid of last-child in Tabs.tsx */}
      </Flex>
    )
  } else return element
}

export const Stepper = (props: StepperProps) => {
  return (
    <Tabs
      separator={
        <ChevronWrapper>
          <Chevron />
        </ChevronWrapper>
      }
      transformTabBtn={transformTabBtn}
      {...props}
    />
  )
}

export const Step = props => <Tab {...props} />

const ChevronWrapper = styled.span`
  margin: 0 ${space(1)}px;
  line-height: normal;
`

const CheckMarkWrapper = styled.span`
  margin-right: ${space(1)}px;
  line-height: normal;
`

const CheckMark = () => (
  <svg width="10px" height="8px" viewBox="0 0 10 8" version="1.1">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-416.000000, -960.000000)" fill="#000000">
        <g transform="translate(416.000000, 918.000000)">
          <polygon
            fill={color("green100")}
            points="7.97385698 42 9.14742868 42.8908963 3.39210448 50.0024371 0 46.7045578 1.06103742 45.6729936 3.26349389 47.8142707"
          />
        </g>
      </g>
    </g>
  </svg>
)

const Chevron = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    width="8px"
    height="8px"
    transform="scale(-1, 1)"
  >
    <path
      fill={color("black10")}
      fill-rule="evenodd"
      d="M9.091 10.758l-.788.771-5.832-5.708L8.303.113l.788.771-5.044 4.937 5.044 4.937"
    />
  </svg>
)
