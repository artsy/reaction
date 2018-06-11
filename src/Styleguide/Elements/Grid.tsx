import * as StyledGrid from "styled-bootstrap-grid"
import { color, space, width } from "styled-system"
export { media } from "styled-bootstrap-grid"

// @ts-ignore
import styled, { StyledComponentClass } from "styled-components"

const DEBUG = false

export const Grid = styled(StyledGrid.Container)`
  ${space};
`
export const Row = styled(StyledGrid.Row)`
  ${color};
  ${space};
`
export const Col = styled(StyledGrid.Col)`
  ${color};
  ${space};
  ${width};

  ${() => {
    if (DEBUG) {
      return `
        border: 1px solid #ddd;
      `
    }
  }};
`
