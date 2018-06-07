import React from "react"
import styled from "styled-components"
import { flexDirection } from "styled-system"
import { Avatar } from "../Elements/Avatar"
import { Sans } from "../Elements/Typography"

interface FlexProps {
  flexDirection: "row" | "column"
}

const Flex = styled.div.attrs<FlexProps>({})`
  display: flex;
  ${flexDirection};
`

export class Banner extends React.Component {
  render() {
    return (
      <Flex flexDirection="row">
        <Avatar size="110px" src="https://picsum.photos/110/110/?random" />
        <Flex flexDirection="column">
          <Sans weight="medium" size="2">
            In show
          </Sans>
          <div>Francesca DiMattio: Boucherouite</div>
          <div>Salon 94</div>
        </Flex>
      </Flex>
    )
  }
}
