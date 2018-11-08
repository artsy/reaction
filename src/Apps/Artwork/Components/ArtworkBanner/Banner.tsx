import { Avatar, Flex, Sans, Serif } from "@artsy/palette"
import React from "react"
import { Media } from "Utils/Responsive"

export interface BannerProps {
  imageUrl?: string
  initials?: string
  meta?: string
  name?: string
  subHeadline?: string
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
    <Avatar size="sm" src={props.imageUrl} initials={props.initials} />
    <Flex flexDirection="column" justifyContent="center" ml={2}>
      <Sans weight="medium" size="2">
        {props.meta}
      </Sans>
      <Serif size="4t">{props.name}</Serif>
      <Serif size="4t" color="black60">
        {props.subHeadline}
      </Serif>
    </Flex>
  </Flex>
)

export const SmallBanner = props => (
  <Flex flexDirection="row" width="100%" justifyContent="space-between">
    <Flex flexDirection="column" justifyContent="center" mr={2}>
      <Sans weight="medium" size="2">
        {props.meta}
      </Sans>
      <Serif size="4t">{props.name}</Serif>
      <Serif size="4t" color="black60">
        {props.subHeadline}
      </Serif>
    </Flex>
    <Avatar size="sm" src={props.imageUrl} initials={props.initials} />
  </Flex>
)
