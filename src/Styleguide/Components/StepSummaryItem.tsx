import React from "react"

import {
  Flex,
  FlexProps,
  Sans,
  Serif,
  StackableBorderBox,
} from "@artsy/palette"

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
            <Serif size={["2", "3t"]} weight="semibold" color="black100">
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
