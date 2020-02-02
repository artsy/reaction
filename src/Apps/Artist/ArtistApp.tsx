import { Box, Col, Row, Separator, Spacer } from "@artsy/palette"
import { ArtistApp_artist } from "__generated__/ArtistApp_artist.graphql"
import { ArtistMetaFragmentContainer as ArtistMeta } from "Apps/Artist/Components/ArtistMeta"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Artist/Components/NavigationTabs"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { trackPageViewWrapper, useTracking } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Footer } from "Components/v2/Footer"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "Components/v2/RecentlyViewed"
import React, { useEffect } from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "./Components/ArtistHeader"

export interface ArtistAppProps {
  artist: ArtistApp_artist
  params: {
    artistID: string
  }
}

export const ArtistApp: React.FC<ArtistAppProps> = props => {
  const { artist, children } = props

  const { trackEvent } = useTracking()

  // TODO: Remove after AB test ends.
  useEffect(() => {
    const { CLIENT_NAVIGATION_V2 } = sd

    const experiment = "client_navigation_v2"
    const variation = CLIENT_NAVIGATION_V2
    trackEvent({
      action_type: Schema.ActionType.ExperimentViewed,
      experiment_id: experiment,
      experiment_name: experiment,
      variation_id: variation,
      variation_name: variation,
      nonInteraction: 1,
    })
  }, [])

  return (
    <AppContainer>
      <ArtistMeta artist={artist} />
      <Row>
        <Col>
          <ArtistHeader artist={artist} />
        </Col>
      </Row>
      <HorizontalPadding>
        <Spacer mb={3} />

        <Row>
          <Col>
            <NavigationTabs artist={artist} />
            <Spacer mb={3} />

            <Box minHeight="30vh">{children}</Box>
          </Col>
        </Row>

        {typeof window !== "undefined" && (
          <LazyLoadComponent threshold={1000}>
            <Row>
              <Col>
                <RecentlyViewed />
              </Col>
            </Row>
          </LazyLoadComponent>
        )}

        <Separator mt={6} mb={3} />

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </HorizontalPadding>
    </AppContainer>
  )
}

const TrackingWrappedArtistApp: React.FC<ArtistAppProps> = props => {
  const Component = track<ArtistAppProps>(_p => ({
    context_page: Schema.PageName.ArtistPage,
    context_page_owner_id: props.artist.internalID,
    context_page_owner_slug: props.artist.slug,
    context_page_owner_type: Schema.OwnerType.Artist,
  }))(ArtistApp)

  return <Component {...props} />
}

export const ArtistAppFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(TrackingWrappedArtistApp),
  {
    artist: graphql`
      fragment ArtistApp_artist on Artist {
        internalID
        slug
        ...ArtistMeta_artist
        ...ArtistHeader_artist
        ...NavigationTabs_artist
      }
    `,
  }
)
