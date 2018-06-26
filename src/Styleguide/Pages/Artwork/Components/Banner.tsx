import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { Avatar } from "Styleguide/Elements/Avatar"
import { Flex } from "Styleguide/Elements/Flex"
import { Responsive } from "Styleguide/Utils/Responsive"

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
    <Avatar size="small" src={props.src} ml={2} />
  </Flex>
)
