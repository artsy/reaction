import styled, { css } from "styled-components"
import { Flex, FlexProps } from "./Flex"
import {
  themeGet,
  display,
  DisplayProps,
  space,
  SpaceProps,
} from "styled-system"

const hover = css`
  &:hover {
    border-color: ${themeGet("colors.black60")};
  }
`

export interface BorderBoxProps extends FlexProps {
  hover?: boolean
}

export const BorderBox = styled(Flex).attrs<BorderBoxProps>({})`
  border: 1px solid ${themeGet("colors.black10")};
  border-radius: 2px;
  padding: 20px;
  ${props => props.hover && hover};
`
BorderBox.defaultProps = {
  p: 4,
}

export interface BoxProps extends DisplayProps, SpaceProps {}
export const Box = styled.div.attrs<BoxProps>({})`
  ${space};
  ${display};
`
