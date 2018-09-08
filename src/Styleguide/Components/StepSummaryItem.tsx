import { Sans, Serif } from "@artsy/palette"
import { StackableBorderBox } from "@artsy/palette"
import { Flex, FlexProps } from "@artsy/palette"
import React from "react"

interface StepSummaryItemProps extends FlexProps {
  title?: React.ReactNode
  onChange?: () => void
}

export const StepSummaryItem: React.SFC<StepSummaryItemProps> = ({
  title,
  onChange,
  children,
  ...others
}) => {
  return (
    <StackableBorderBox flexDirection="column" {...others}>
      {(title || onChange) && (
        <Flex justifyContent="space-between" alignItems="baseline" mb={1}>
          {title && (
            <Serif size="3t" weight="semibold" color="black100">
              {title}
            </Serif>
          )}
          {onChange && (
            <Sans size="2">
              <a className="colorLink" onClick={onChange}>
                Change
              </a>
            </Sans>
          )}
        </Flex>
      )}
      {children}
    </StackableBorderBox>
  )
}
