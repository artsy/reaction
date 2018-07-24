import * as StyledGrid from "styled-bootstrap-grid"
import { color, flex, space, textAlign, width } from "styled-system"
export { media } from "styled-bootstrap-grid"

// @ts-ignore
import styled, { StyledComponentClass } from "styled-components"

const DEBUG = false

export const Grid = styled(StyledGrid.Container)`
  overflow: hidden;
  max-width: ${props => props.theme.grid.breakpoints.xl}px;
  ${space};
`
export const Row = styled(StyledGrid.Row)`
  ${color};
  ${space};
`
export const Col = styled(StyledGrid.Col)`
  ${color};
  ${flex};
  ${space};
  ${textAlign};
  ${width};

  ${() => {
    if (DEBUG) {
      return `
        border: 1px solid #ddd;
      `
    }
  }};
`
