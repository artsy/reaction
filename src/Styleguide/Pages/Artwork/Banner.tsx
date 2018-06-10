import React from "react"
import { Avatar } from "../../Elements/Avatar"
import { Sans, Serif } from "@artsy/palette"
import { Flex } from "../../Elements/Flex"
import { Responsive } from "../../Elements/Responsive"

export interface BannerProps {
  src: string
  badge: string
  headline: string
  subHeadline: string
}

export class Banner extends React.Component<BannerProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallBanner {...this.props} />
          else return <LargeBanner {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeBanner = props => (
  <Flex flexDirection="row">
    <Avatar size="100px" src={props.src} mr={4} />
    <Flex flexDirection="column" justifyContent="center">
      <Sans weight="medium" size="2">
        {props.badge}
      </Sans>
      <Serif size="4t">{props.headline}</Serif>
      <Serif size="4t" color="black60">
        {props.subHeadline}
      </Serif>
    </Flex>
  </Flex>
)

export const SmallBanner = props => (
  <Flex flexDirection="row">
    <Flex flexDirection="column" justifyContent="center">
      <Sans weight="medium" size="2">
        {props.badge}
      </Sans>
      <Serif size="4t">{props.headline}</Serif>
      <Serif size="4t" color="black60">
        {props.subHeadline}
      </Serif>
    </Flex>
    <Avatar size="70px" src={props.src} ml={4} />
  </Flex>
)
