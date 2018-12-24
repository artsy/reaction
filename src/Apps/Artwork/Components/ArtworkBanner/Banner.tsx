import { Avatar, Flex, Link, Sans, Serif } from "@artsy/palette"
import React from "react"
import { data as sd } from "sharify"
import styled from "styled-components"
import { Media } from "Utils/Responsive"

export interface BannerProps {
  /** Image for avatar  */
  imageUrl?: string
  /** Fallback partner initials in case image is not there. */
  initials?: string
  /** In auction / at fair / in show */
  meta?: string
  /** Auction / fair / show name */
  name?: string
  /** Partner name */
  subHeadline?: string
  /** Link to auction */
  href?: string
}

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

const withLink = (href: string, children: React.ReactNode) => {
  if (href) {
    return (
      <StyledLink noUnderline href={sd.APP_URL + href}>
        {children}
      </StyledLink>
    )
  }

  return children
}

export const Banner: React.SFC<BannerProps> = props => {
  return (
    <>
      <Media at="xs">{withLink(props.href, <SmallBanner {...props} />)}</Media>
      <Media greaterThan="xs">
        {withLink(props.href, <LargeBanner {...props} />)}
      </Media>
    </>
  )
}

export const LargeBanner = props => (
  <Flex flexDirection="row" mt={4}>
    <Avatar size="md" src={props.imageUrl} initials={props.initials} />
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
  <Flex flexDirection="row" width="100%" justifyContent="space-between" mt={2}>
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
