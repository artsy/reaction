import { Separator, Spacer } from "@artsy/palette"
import { ArtistApp_artist } from "__generated__/ArtistApp_artist.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Artist/Components/NavigationTabs"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { PreloadLinkState } from "Artsy/Router/Components/PreloadLink"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { Subscribe } from "unstated"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "./Components/ArtistHeader"
import { LoadingArea } from "./Components/LoadingArea"

import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Styleguide/Components"

export interface ArtistAppProps {
  artist: ArtistApp_artist
  params: {
    artistID: string
  }
}

@track<ArtistAppProps>(props => ({
  context_page: Schema.PageName.ArtistPage,
  context_page_owner_id: props.artist._id,
  context_page_owner_slug: props.artist.id,
  context_page_owner_type: Schema.OwnerType.Artist,
}))
export class ArtistApp extends React.Component<ArtistAppProps> {
  render() {
    const { artist, children } = this.props

    return (
      <HorizontalPadding>
        <Row>
          <Col>
            <ArtistHeader artist={artist} />
          </Col>
        </Row>

        <Spacer mb={3} />

        <Row>
          <Col>
            <NavigationTabs artist={artist} />

            <Spacer mb={3} />

            {/*
              When clicking nav links, wait for fetch to complete before
              transitioning to new route
            */}

            <Subscribe to={[PreloadLinkState]}>
              {({ state: { isLoading } }: PreloadLinkState) => {
                return (
                  <LoadingArea isLoading={isLoading}>{children}</LoadingArea>
                )
              }}
            </Subscribe>
          </Col>
        </Row>

        {typeof window !== "undefined" && (
          <Row>
            <Col>
              <LazyLoadComponent threshold={1000}>
                <RecentlyViewed />
              </LazyLoadComponent>
            </Col>
          </Row>
        )}

        <Separator mt={6} mb={3} />

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </HorizontalPadding>
    )
  }
}

export const ArtistAppFragmentContainer = createFragmentContainer(ArtistApp, {
  artist: graphql`
    fragment ArtistApp_artist on Artist {
      _id
      id
      ...ArtistHeader_artist
      ...NavigationTabs_artist
    }
  `,
})
