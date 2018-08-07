import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { BorderBox } from "Styleguide/Elements/Box"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"

interface StepSummaryItemProps extends FlexProps {
  title: string
  onChange: () => void
}

export const StepSummaryItem: React.SFC<StepSummaryItemProps> = ({
  title,
  onChange,
  children,
  ...others
}) => {
  return (
    <BorderBox hasSiblings responsive flexDirection="column" {...others}>
      <Flex justifyContent="space-between" alignItems="baseline" mb={1}>
        <Serif size="3t" weight="semibold" color="black100">
          {title}
        </Serif>
        <Sans size="2">
          <a className="colorLink" onClick={onChange}>
            Change
          </a>
        </Sans>
      </Flex>
      {children}
    </BorderBox>
  )
}
