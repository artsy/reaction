import styled from "styled-components"

import {
  Col as FlexCol,
  Grid as FlexGrid,
  Row as FlexRow,
} from "react-styled-flexboxgrid"

import { media } from "./Helpers"

/**
 * @deprecated Use `Styleguide/Elements/Grid` instead
 */
export const Grid = FlexGrid

/**
 * @deprecated Use `Styleguide/Elements/Grid` instead
 */
export const Col: FlexCol = styled(FlexCol)`
  ${media.sm`
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `};
`

/**
 * @deprecated Use `Styleguide/Elements/Grid` instead
 */
export const Row: FlexRow = styled(FlexRow)`
  ${media.sm`
    margin-left: 1rem;
    margin-right: 1rem;
  `};
`
