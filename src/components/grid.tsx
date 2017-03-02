import * as React from "react"
import styled from "styled-components"

const gapSize = 20

export const Row = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -${ gapSize / 2 }px;
  margin-left: -${ gapSize / 2 }px;
  margin-bottom: ${ gapSize }px;
`

export const Col = styled.div`
  flex: ${ props => props.size } 0 auto;
  padding-right: ${ gapSize / 2 }px;
  padding-left: ${ gapSize / 2 }px;
`

Col.defaultProps = {
  size: 1,
}
