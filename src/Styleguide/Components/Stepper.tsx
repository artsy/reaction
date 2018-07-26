import { color, space } from "@artsy/palette"
import { CheckIcon } from "Assets/Icons/CheckIcon"
import { ChevronIcon } from "Assets/Icons/ChevronIcon"
import React from "react"
import styled from "styled-components"
import { Tab, Tabs, TabsProps } from "Styleguide/Components/Tabs"
import { Flex } from "Styleguide/Elements/Flex"

interface StepperProps extends TabsProps {
  initialTabIndex: number

  /* the step user currently is at (e.g. previous steps completed) */
  currentStepIndex: number

  disableNavigation?: boolean
}

const transformTabBtn = (
  element: JSX.Element,
  tabIndex: number,
  props: any
): JSX.Element => {
  const { currentStepIndex, disableNavigation } = props
  const elementWithoutNav = React.cloneElement(element, {
    ...element.props,
    onClick: () => {
      null
    },
  })
  if (tabIndex > currentStepIndex) {
    // don't allow users to jump ahead

    return elementWithoutNav
  } else if (currentStepIndex && tabIndex < currentStepIndex) {
    return (
      <Flex>
        <CheckMarkWrapper>
          <CheckIcon fill={color("green100")} />
        </CheckMarkWrapper>
        {disableNavigation ? elementWithoutNav : element}
        <div /> {/* hack for getting rid of last-child in Tabs.tsx */}
      </Flex>
    )
  } else return disableNavigation ? elementWithoutNav : element
}

export const Stepper = (props: StepperProps) => {
  return (
    <Tabs
      separator={
        <ChevronWrapper>
          <ChevronIcon />
        </ChevronWrapper>
      }
      transformTabBtn={transformTabBtn}
      {...props}
    />
  )
}

export const Step = props => <Tab {...props} />

const ChevronWrapper = styled.span`
  margin: 0 ${space(2)}px;
  line-height: normal;
`

const CheckMarkWrapper = styled.span`
  margin-right: ${space(1)}px;
  line-height: normal;
`
