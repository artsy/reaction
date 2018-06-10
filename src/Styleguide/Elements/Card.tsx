import styled from "styled-components"
import { Flex } from "./Flex"
import { themeGet } from "styled-system"

export const Card = styled(Flex)`
  border: 1px solid ${themeGet("colors.black10")};
  border-radius: 2px;

  &:hover {
    border-color: ${themeGet("colors.black60")};
  }
`
