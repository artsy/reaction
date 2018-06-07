import React from "react"
import { Avatar } from "../Elements/Avatar"
import { Sans, Serif } from "../Elements/Typography"
import { Flex } from "../Elements/Flex"

export class Banner extends React.Component {
  render() {
    return (
      <Flex flexDirection="row">
        <Avatar size="110px" src="https://picsum.photos/110/110/?random" />
        <Flex flexDirection="column" justifyContent="center" ml={4}>
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
