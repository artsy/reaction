import React from "react"
import { Avatar } from "../Elements/Avatar"
import { Sans, Serif } from "@artsy/palette"
import { Flex } from "../Elements/Flex"

export interface BannerProps {
  src: string
  badge: string
  headline: string
  subHeadline: string
}

export class Banner extends React.Component<BannerProps> {
  render() {
    return (
      <Flex flexDirection="row">
        <Avatar size="110px" src={this.props.src} />
        <Flex flexDirection="column" justifyContent="center" ml={4}>
          <Sans weight="medium" size="2">
            {this.props.badge}
          </Sans>
          <Serif size="4t">{this.props.headline}</Serif>
          <Serif size="4t" color="black60">
            {this.props.subHeadline}
          </Serif>
        </Flex>
      </Flex>
    )
  }
}
