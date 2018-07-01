import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { Image } from "Styleguide/Elements/Image"

interface Props {
  imageUrl: string
  blockWidth: string
  name: string
  exhibitionInfo: string
  partner: string
  href: string
  city?: string
  // FIXME: Fix container directly by making responsive
  pr?: number
  pb?: number
}

export const ArtistShowBlockItem = (props: Props) => {
  const FIXME_DOMAIN = "https://www.artsy.net"
  return (
    <Box
      width={props.blockWidth}
      height="auto"
      pr={
        props.pr // FIXME
      }
      pb={props.pb}
    >
      <a href={FIXME_DOMAIN + props.href} className="noUnderline">
        <Image width="100%" src={props.imageUrl} />
        <Serif size="3t">{props.name}</Serif>
      </a>
      <Serif size="2" color="black60">
        <a href={FIXME_DOMAIN + props.href} className="noUnderline">
          {props.partner}
        </a>
      </Serif>
      <Serif size="1" color="black60">
        {props.city && `${props.city}, `}
        {props.exhibitionInfo}
      </Serif>
    </Box>
  )
}
