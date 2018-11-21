import { Avatar, Flex, Sans, Serif } from "@artsy/palette"
import React from "react"
import { Media } from "Utils/Responsive"

export interface BannerProps {
  /** Image for avatar  */
  imageUrl?: string
  /** Fallback partner initials in case image is not there. */
  initials?: string
  /** in auction / at fair / in show */
  meta?: string
  /** auction / fair / show name */
  name?: string
  /** partner name */
  subHeadline?: string
}

export const Banner: React.SFC<BannerProps> = props => {
  return (
    <>
      <Media at="xs">
        <SmallBanner {...props} />
      </Media>
      <Media greaterThan="xs">
        <LargeBanner {...props} />
      </Media>
    </>
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
