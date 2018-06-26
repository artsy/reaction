import { Serif } from "@artsy/palette"
import React from "react"
import { Box } from "Styleguide/Elements/Box"
import { ResponsiveImage } from "Styleguide/Elements/Image"

interface Props {
  imageUrl: string
  blockWidth: string
  name: string
  exhibitionInfo: string
  partner: string
  // FIXME: Fix container directly by making responsive
  pr?: number
  pb?: number
}

export const ShowBlockItem = (props: Props) => {
  return (
    <Box
      maxWidth="460px"
      width={props.blockWidth}
      height="auto"
      // FIXME
      pr={props.pr}
      pb={props.pb}
    >
      <a href="#" className="noUnderline">
        <ResponsiveImage src={props.imageUrl} my={-30} />
        <Serif size="3t">{props.name}</Serif>
      </a>
      <Serif size="2" color="black60">
        <a href="#" className="noUnderline">
          {props.partner}
        </a>
      </Serif>
      <Serif size="1" color="black60">
        {props.exhibitionInfo}
      </Serif>
    </Box>
  )
}
