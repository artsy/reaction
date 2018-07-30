import { Sans, Serif, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { BorderBox } from "Styleguide/Elements/Box"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"
import { media } from "Styleguide/Elements/Grid"

interface StepSummaryItemProps extends FlexProps {
  title: string
  onChange: () => void
  children: React.ReactNode | null
}

const Wrapper = styled(BorderBox)`
  padding: ${space(2)}px;
  ${media.sm`
    padding: ${space(3)}px;
  `};
  :not(:last-child) {
    border-bottom: 0;
  }
`

export function StepSummaryItem({
  title,
  onChange,
  children,
  ...others
}: StepSummaryItemProps) {
  return (
    <Wrapper flexDirection="column" {...others}>
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
    </Wrapper>
  )
}
