import React from "react"
import { Avatar } from "../Elements/Avatar"
import { Sans, Serif } from "@artsy/palette"
import { Flex } from "../Elements/Flex"

interface BannerProps {
  src: string
  badge: string
  headline: string
  subHeadline: string
}

export class Banner extends React.Component<BannerProps> {
  render() {
    return (
      <Flex flexDirection="row">
        <Avatar size="110px" src="https://picsum.photos/110/110/?random" />
        <Flex flexDirection="column" justifyContent="center" ml={4}>
          <Sans weight="medium" size="2">
            {this.props.badge}
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
