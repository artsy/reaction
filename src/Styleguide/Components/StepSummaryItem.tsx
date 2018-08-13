import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { StackableResponsiveBorderBox } from "Styleguide/Elements/StackableResponsiveBorderBox"

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
    <StackableResponsiveBorderBox flexDirection="column" {...others}>
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
    </StackableResponsiveBorderBox>
  )
}
