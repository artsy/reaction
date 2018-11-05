import { Avatar, Flex, Sans, Serif } from "@artsy/palette"
import React from "react"
import { Media } from "Utils/Responsive"

export interface BannerProps {
  src: string
  badge: string
  headline: string
  subHeadline: string
}

export class Banner extends React.Component<BannerProps> {
  render() {
    return (
      <>
        <Media at="xs">
          <SmallBanner {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <LargeBanner {...this.props} />
        </Media>
      </>
    )
  }
}

export const LargeBanner = props => (
  <Flex flexDirection="row">
    <Avatar src={props.src} mr={2} />
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
  <Flex flexDirection="row" width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="center">
      <Sans weight="medium" size="2">
        {props.badge}
      </Sans>
      <Serif size="4t">{props.headline}</Serif>
      <Serif size="4t" color="black60">
        {props.subHeadline}
      </Serif>
    </Flex>
    <Avatar size="sm" src={props.src} ml={2} />
  </Flex>
)
