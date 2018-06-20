import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Responsive } from "Styleguide/Utils/Responsive"

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
      <Image src={props.src} mb={1} />
      <Sans size="2" weight="medium" my={0.5}>
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
