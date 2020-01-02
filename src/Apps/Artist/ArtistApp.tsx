import { Box, Col, Row, Separator, Spacer } from "@artsy/palette"
import { ArtistApp_artist } from "__generated__/ArtistApp_artist.graphql"
import { ArtistMetaFragmentContainer as ArtistMeta } from "Apps/Artist/Components/ArtistMeta"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Artist/Components/NavigationTabs"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { trackPageViewWrapper } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Components/v2"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "./Components/ArtistHeader"

export interface ArtistAppProps {
  artist: ArtistApp_artist
  params: {
    artistID: string
  }
}

export const ArtistApp: React.FC<ArtistAppProps> = props => {
  const { artist, children } = props

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
