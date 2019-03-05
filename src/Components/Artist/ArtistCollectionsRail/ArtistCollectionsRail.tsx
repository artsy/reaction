import { Box, Sans, Spacer } from "@artsy/palette"
import { ArtistCollectionsRail_collections } from "__generated__/ArtistCollectionsRail_collections.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { ArrowButton, Carousel } from "Components/v2/Carousel"
import { once } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import styled from "styled-components"
import Events from "Utils/Events"
import { ArtistCollectionEntityFragmentContainer as ArtistCollectionEntity } from "./ArtistCollectionEntity"

interface ArtistCollectionsRailProps {
  collections: ArtistCollectionsRail_collections
}

@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class ArtistCollectionsRail extends React.Component<
  ArtistCollectionsRailProps
> {
  @track({
    action_type: Schema.ActionType.Impression,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Artist,
  })
  trackImpression() {
    // noop
  }

  @track({
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Artist,
    type: Schema.Type.Button,
    subject: Schema.Subject.ClickedNextButton,
  })
  trackCarouselNav() {
    // noop
  }

  render() {
    const { collections } = this.props
    if (collections.length > 3) {
      return (
        <RailWrapper>
          <Waypoint onEnter={once(this.trackImpression.bind(this))} />
          <Sans size="3" weight="medium">
            Browse by series
          </Sans>
          <Spacer pb={1} />

          <Carousel
            height={200}
            settings={{
              slidesToScroll: 1,
            }}
            onArrowClick={this.trackCarouselNav.bind(this)}
            data={collections as object[]} // type required by slider
            render={slide => {
              return <ArtistCollectionEntity collection={slide} />
            }}
          />
        </RailWrapper>
      )
    } else {
      return null
    }
  }
}

const RailWrapper = styled(Box)`
  ${ArrowButton} {
    min-height: 130px;
    align-self: flex-start;
  }
`

export const ArtistCollectionsRailFragmentContainer = createFragmentContainer(
  ArtistCollectionsRail,
  graphql`
    fragment ArtistCollectionsRail_collections on MarketingCollection
      @relay(plural: true) {
      ...ArtistCollectionEntity_collection
    }
  `
)
