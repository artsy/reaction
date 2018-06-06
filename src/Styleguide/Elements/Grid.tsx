import * as Grid from "styled-bootstrap-grid"
import { space } from "styled-system"
export { media } from "styled-bootstrap-grid"

// @ts-ignore
import styled, { StyledComponentClass } from "styled-components"

const DEBUG = true

export const Container = styled(Grid.Container)`
  ${space};
`
export const Row = styled(Grid.Row)`
  ${space};
`
export const Col = styled(Grid.Col)`
  ${space};

  ${() => {
    if (DEBUG) {
      return `
        border: 1px solid #ddd;
      `
    }
  }};
`
