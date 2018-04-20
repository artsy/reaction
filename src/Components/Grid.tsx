import styled from "styled-components"

import {
  Col as FlexCol,
  Grid as FlexGrid,
  Row as FlexRow,
} from "react-styled-flexboxgrid"

import { media } from "./Helpers"

export const Grid = FlexGrid

export const Col: FlexCol = styled(FlexCol)`
  ${media.sm`
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  `};
`

export const Row: FlexRow = styled(FlexRow)`
  ${media.sm`
    margin-left: 1rem;
    margin-right: 1rem;
  `};
`
