import { Avatar, Flex, Sans, Serif } from "@artsy/palette"
import React from "react"
import { Responsive } from "Utils/Responsive"

export interface BannerProps {
  imageUrl?: string
  initials?: string
  meta?: string
  name?: string
  subHeadline?: string
}

export const Banner: React.SFC<BannerProps> = props => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallBanner {...props} />
        else return <LargeBanner {...props} />
      }}
    </Responsive>
  )
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
        {props.badge}
      </Sans>
      <Serif size="4t">{props.headline}</Serif>
      <Serif size="4t" color="black60">
        {props.subHeadline}
      </Serif>
    </Flex>
    <Avatar size="sm" src={props.imageUrl} initials={props.initials} />
  </Flex>
)
