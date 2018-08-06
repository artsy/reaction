import { Sans, Serif, space } from "@artsy/palette"
import React from "react"
import { media } from "styled-bootstrap-grid"
import styled from "styled-components"
import { BorderBox } from "Styleguide/Elements/Box"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"

interface StepSummaryItemProps extends FlexProps {
  title: string
  onChange: () => void
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

export const StepSummaryItem: React.SFC<StepSummaryItemProps> = ({
  title,
  onChange,
  children,
  ...others
}) => {
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
