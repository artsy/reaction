import { Box } from "@artsy/palette"
import { WorksForYouQuery } from "__generated__/WorksForYouQuery.graphql"
import { ArtistArtworksFilters } from "__generated__/WorksForYouQuery.graphql"
import { MarketingHeader } from "Apps/WorksForYou/MarketingHeader"
import { ContextConsumer, ContextProps } from "Artsy"
import { track } from "Artsy/Analytics"
import Spinner from "Components/Spinner"
import React, { Component } from "react"
import { graphql, QueryRenderer } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import Events from "Utils/Events"
import { WorksForYouArtistFeedPaginationContainer as WorksForYouArtistFeed } from "./WorksForYouArtistFeed"
import { WorksForYouFeedPaginationContainer as WorksForYouFeed } from "./WorksForYouFeed"

export interface Props extends ContextProps {
  artistID?: string
  forSale?: boolean
}

@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class WorksForYou extends Component<Props> {
  static defaultProps = {
    forSale: true,
    artistID: "",
  }

  render() {
    const { artistID, forSale } = this.props
    const includeSelectedArtist = !!artistID
    const filter: ArtistArtworksFilters[] = forSale ? ["IS_FOR_SALE"] : null

    return (
      <ContextConsumer>
        {({ relayEnvironment, user }) => {
          const hasLabFeature =
            user &&
            user.lab_features &&
            user.lab_features.includes("New Buy Now Flow")
          const enableBuyNowFlow = sd.ENABLE_NEW_BUY_NOW_FLOW || hasLabFeature

          return (
            <>
              {enableBuyNowFlow && <MarketingHeader />}

              <QueryRenderer<WorksForYouQuery>
                environment={relayEnvironment}
                query={graphql`
                  query WorksForYouQuery(
                    $includeSelectedArtist: Boolean!
                    $artistID: String!
                    $forSale: Boolean
                    $filter: [ArtistArtworksFilters]
                  ) {
                    viewer {
                      ...WorksForYouFeed_viewer
                        @skip(if: $includeSelectedArtist)
                        @arguments(for_sale: $forSale)
                      ...WorksForYouArtistFeed_viewer
                        @include(if: $includeSelectedArtist)
                        @arguments(artistID: $artistID, filter: $filter)
                    }
                  }
                `}
                variables={{ artistID, includeSelectedArtist, forSale, filter }}
                render={({ props }) => {
                  if (props) {
                    return (
                      <Box pt={3} pb={3}>
                        {includeSelectedArtist ? (
                          <WorksForYouArtistFeed
                            artistID={this.props.artistID}
                            viewer={props.viewer}
                            forSale={forSale}
                            user={user}
                          />
                        ) : (
                          <WorksForYouFeed user={user} viewer={props.viewer} />
                        )}
                      </Box>
                    )
                  } else {
                    return (
                      <SpinnerContainer>
                        <Spinner />
                      </SpinnerContainer>
                    )
                  }
                }}
              />
            </>
          )
        }}
      </ContextConsumer>
    )
  }
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
