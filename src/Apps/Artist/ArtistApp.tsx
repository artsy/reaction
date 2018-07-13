import { ArtistApp_artist } from "__generated__/ArtistApp_artist.graphql"
import { ArtistApp_me } from "__generated__/ArtistApp_me.graphql"
import { screenTrack } from "Analytics"
import * as Schema from "Analytics/Schema"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Artist/Components/NavigationTabs"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PreloadLinkState } from "Router/state"
import { Footer } from "Styleguide/Components/Footer"
import { RecentlyViewedFragmentContainer as RecentlyViewed } from "Styleguide/Components/RecentlyViewed"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "./Components/ArtistHeader"
import { LoadingArea } from "./Components/LoadingArea"

export interface ArtistAppProps {
  artist: ArtistApp_artist
  me: ArtistApp_me
  params: {
    artistID: string
  }
}

// TODO: Do we even really want a ‘page view’ event?
@screenTrack<ArtistAppProps>(props => ({
  context_screen: Schema.PageNames.ArtistPage,
  context_screen_owner_id: props.artist._id,
  context_screen_owner_slug: props.artist.id,
  context_screen_owner_type: Schema.OwnerEntityTypes.Artist,
}))
export class ArtistApp extends React.Component<ArtistAppProps> {
  render() {
    const { artist, children, me } = this.props

    return (
      <React.Fragment>
        <Row>
          <Col>
            <ArtistHeader artist={artist as any} />
          </Col>
        </Row>

        <Spacer mb={3} />

        <Row>
          <Col>
            <span id="jumpto-RouteTabs" />

            <NavigationTabs artist={artist as any} />

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

        {me && (
          <React.Fragment>
            <Separator my={6} />
            <RecentlyViewed me={me as any} />
          </React.Fragment>
        )}

        <Separator mt={6} mb={3} />

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </React.Fragment>
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
  me: graphql`
    fragment ArtistApp_me on Me {
      ...RecentlyViewed_me
    }
  `,
})
