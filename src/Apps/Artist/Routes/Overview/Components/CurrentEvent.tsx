import { Sans, Serif } from "@artsy/palette"
import { CurrentEvent_artist } from "__generated__/CurrentEvent_artist.graphql"
import { Track, track as _track } from "Analytics"
import * as Schema from "Analytics/Schema"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Responsive } from "Utils/Responsive"

export interface CurrentEventProps {
  artist: CurrentEvent_artist
}

export class CurrentEvent extends Component<CurrentEventProps> {
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

const track: Track<CurrentEventProps> = _track

@track()
export class LargeCurrentEvent extends Component<CurrentEventProps> {
  @track(props => ({
    action_type: Schema.ActionTypes.Click,
    action_name:
      props.artist.currentEvent.event.__typename === "Sale"
        ? Schema.ActionNames.InSale
        : Schema.ActionNames.InShow,
    type: "Link",
    destination_path: props.artist.currentEvent.href,
  }))
  handleClick() {
    // no-op
  }

  render() {
    const props = this.props
    if (!props.artist.currentEvent) {
      return null
    }
    const {
      currentEvent: { image, status, name, details, partner, href },
    } = props.artist

    return (
      <a
        href={href}
        className="noUnderline"
        onClick={this.handleClick.bind(this)}
      >
        <Flex flexDirection="column">
          <Box width="100%" height="auto">
            <Image src={image.resized.url} width="100%" mb={1} />
          </Box>
          <Sans size="2" weight="medium" my={0.5}>
            {status}
          </Sans>
          <Serif size="3t">{name}</Serif>
          {partner && (
            <Serif size="2" color="black60">
              {partner}
            </Serif>
          )}
          <Serif size="2" color="black60">
            {details}
          </Serif>
        </Flex>
      </a>
    )
  }
}

export const CurrentEventFragmentContainer = createFragmentContainer(
  CurrentEvent,
  graphql`
    fragment CurrentEvent_artist on Artist {
      currentEvent {
        event {
          __typename
        }
        image {
          resized(width: 300) {
            url
          }
        }
        name
        status
        details
        partner
        href
      }
    }
  `
)
