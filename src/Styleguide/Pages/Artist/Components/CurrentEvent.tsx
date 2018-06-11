import React from "react"
import styled from "styled-components"
import { Responsive } from "../../../Utils/Responsive"
import { Flex } from "../../../Elements/Flex"
import { Serif, Sans } from "@artsy/palette"

import {
  space,
  width,
  SpaceProps,
  WidthProps,
  height,
  HeightProps,
} from "styled-system"

interface ArtworkImageProps extends SpaceProps, WidthProps, HeightProps {
  src: string
}
const ArtworkImage = styled.img.attrs<ArtworkImageProps>({})`
  ${space};
  ${width};
  ${height};
`

export interface CurrentEventProps {
  src: string
  title: string
  gallery: string
  location: string
  date: string
}

export class CurrentEvent extends React.Component<CurrentEventProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return null
          else return <LargeCurrentEvent {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeCurrentEvent = props => {
  return (
    <Flex flexDirection="column">
      <ArtworkImage src={props.src} mb={3} />
      <Sans size="2" my={2}>
        Currently on view
      </Sans>
      <Serif size="3t">{props.title}</Serif>
      <Serif size="2" color="black60">
        {props.gallery}
      </Serif>
      <Serif size="2" color="black60">
        {props.location}, {props.date}
      </Serif>
    </Flex>
  )
}
