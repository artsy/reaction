import React from "react"
import styled from "styled-components"
import { Avatar } from "../Elements/Avatar"

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`

export class Banner extends React.Component {
  render() {
    return (
      <Flex>
        <Avatar size="110px" src="https://picsum.photos/110/110/?random" />
        <div>
          <div>In show</div>
          <div>Francesca DiMattio: Boucherouite</div>
          <div>Salon 94</div>
        </div>
      </Flex>
    )
  }
}
