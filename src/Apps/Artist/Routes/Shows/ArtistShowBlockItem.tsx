import { Box, Image, Serif } from "@artsy/palette"
import React, { SFC } from "react"
import { ResponsiveSpaceValue } from "styled-system"

interface ArtistShowBlockItemProps {
  imageUrl: string
  blockWidth: ResponsiveSpaceValue
  name: string
  exhibitionInfo: string
  partner: string
  href: string
  city?: string
  // FIXME: Fix container directly by making responsive
  pr?: ResponsiveSpaceValue
  pb?: ResponsiveSpaceValue
}

export const ArtistShowBlockItem: SFC<ArtistShowBlockItemProps> = props => {
  const FIXME_DOMAIN = "https://www.artsy.net"
  const { pr, pb, href, city, imageUrl, exhibitionInfo } = props

  return (
    <Box width={props.blockWidth} height="auto" pr={pr} pb={pb}>
      <a href={FIXME_DOMAIN + href} className="noUnderline">
        <Image width="100%" src={imageUrl} />
        <Serif size="3">{props.name}</Serif>
      </a>
      <Serif size="2" color="black60">
        <a href={FIXME_DOMAIN + href} className="noUnderline">
          {props.partner}
        </a>
      </Serif>
      <Serif size="1" color="black60">
        {city && `${city}, `}
        {exhibitionInfo}
      </Serif>
    </Box>
  )
}
