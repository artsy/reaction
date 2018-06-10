import styled from "styled-components"
import { Body } from "./Body"
import { Links } from "./Links"

// @ts-ignore
import { ClassAttributes, HTMLAttributes } from "react"

export const GlobalStyles = styled.div`
  ${Body()};
  ${Links()};
`
