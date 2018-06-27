import { Sans, Serif } from "@artsy/palette"
import { CurrentEvent_artist } from "__generated__/CurrentEvent_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Responsive } from "Styleguide/Utils/Responsive"

export interface CurrentEventProps {
  artist: CurrentEvent_artist
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

export const LargeCurrentEvent = (props: CurrentEventProps) => {
  const { currentEvent } = props.artist

  return (
    <Flex flexDirection="column">
      <Image src={currentEvent.image.resized.url} mb={1} />
      <Sans size="2" weight="medium" my={0.5}>
        {currentEvent.headline}
      </Sans>
      <Serif size="3t">{currentEvent.name}</Serif>
      <Serif size="2" color="black60">
        {currentEvent.subHeadline}
      </Serif>
    </Flex>
  )
}

export const CurrentEventFragmentContainer = createFragmentContainer(
  CurrentEvent,
  graphql`
    fragment CurrentEvent_artist on Artist {
      currentEvent {
        image {
          resized(width: 300) {
            url
          }
        }
        name
        subHeadline
        headline
      }
    }
  `
)
