import { RecentlyViewed_me } from "__generated__/RecentlyViewed_me.graphql"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Artist/Components/NavigationTabs"
import React from "react"
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
  artist: any // FIXME: ArtistHeader_artist | NavigationTabs_artist
  me: RecentlyViewed_me
  params: {
    artistID: string
  }
}

export const ArtistApp: React.SFC<ArtistAppProps> = props => {
  const { artist, children, me } = props

  return (
    <React.Fragment>
      <Row>
        <Col>
          <ArtistHeader artist={artist} />
        </Col>
      </Row>

      <Spacer mb={3} />

      <Row>
        <Col>
          <span id="jumpto-RouteTabs" />

          <NavigationTabs artist={artist} />

          <Spacer mb={3} />

          {/*
           When clicking nav links, wait for fetch to complete before
           transitioning to new route
         */}

          <Subscribe to={[PreloadLinkState]}>
            {({ state: { isLoading } }: PreloadLinkState) => {
              return <LoadingArea isLoading={isLoading}>{children}</LoadingArea>
            }}
          </Subscribe>
        </Col>
      </Row>

      {me && (
        <React.Fragment>
          <Separator my={6} />
          <RecentlyViewed me={me} />
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
