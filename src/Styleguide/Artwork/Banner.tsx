import React from "react"
import styled from "styled-components"
import {
  flexDirection,
  alignItems,
  alignContent,
  justifyContent,
  space,
} from "styled-system"
import { Avatar } from "../Elements/Avatar"
import { Sans, Serif } from "../Elements/Typography"

interface FlexProps {
  flexDirection?: "row" | "column"
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
  alignContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch"
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
  m?: string
  mr?: string
  ml?: string
  mt?: string
  mb?: string
}

const Flex = styled.div.attrs<FlexProps>({})`
  display: flex;
  ${flexDirection};
  ${alignItems};
  ${alignContent};
  ${justifyContent};
  ${space};
`

export class Banner extends React.Component {
  render() {
    return (
      <Flex flexDirection="row">
        <Avatar size="110px" src="https://picsum.photos/110/110/?random" />
        <Flex flexDirection="column" justifyContent="center" ml="20px">
          <Sans weight="medium" size="2">
            In show
          </Sans>
          <Serif size="4t">Francesca DiMattio: Boucherouite</Serif>
          <Serif size="4t" color="black60">
            Salon 94
          </Serif>
        </Flex>
      </Flex>
    )
  }
}
