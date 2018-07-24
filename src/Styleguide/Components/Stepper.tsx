import { color, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { Tab, Tabs, TabsProps } from "Styleguide/Components/Tabs"

interface StepperProps extends TabsProps {
  currentIndex?: number
}
export const Stepper = (props: StepperProps) => {
  return <Tabs separator={<Chevron />} {...props} />
}

export const Step = props => <Tab {...props} />

const ChevronWrapper = styled.svg`
  margin: ${space(0.5)}px ${space(1)}px;
`

const Chevron = () => (
  <ChevronWrapper
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
  </ChevronWrapper>
)
