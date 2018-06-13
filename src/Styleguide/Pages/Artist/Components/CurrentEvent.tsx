import React from "react"
import { Responsive } from "../../../Utils/Responsive"
import { Flex } from "../../../Elements/Flex"
import { Image } from "../../../Elements/Image"
import { Serif, Sans } from "@artsy/palette"

export interface CurrentEventProps {
  src: string
  label: string
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
      <Image src={props.src} mb={3} />
      <Sans size="2" weight="medium" my={2}>
        {props.label}
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
