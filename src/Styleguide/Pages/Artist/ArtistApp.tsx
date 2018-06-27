import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import { RecentlyViewed_me } from "__generated__/RecentlyViewed_me.graphql"
import React from "react"
import { Footer } from "Styleguide/Components/Footer"
import { RecentlyViewedFragmentContainer as RecentlyViewed } from "Styleguide/Components/RecentlyViewed"
import { RouteTab, RouteTabs } from "Styleguide/Components/RouteTabs"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "./Components/ArtistHeader"
import { LoadingArea } from "./Components/LoadingArea"

// TODO:
// Max width 1192
// Inner content max width 1112

export interface ArtistAppProps {
  artist: ArtistHeader_artist
  me: RecentlyViewed_me
  params: {
    artistID: string
  }
}

export const ArtistApp: React.SFC<ArtistAppProps> = props => {
  const {
    params: { artistID },
    artist,
    children,
    me,
  } = props

  const route = (path = "") => `/${artistID}${path}`

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

          <RouteTabs>
            <RouteTab to={route()} exact>
              Overview
            </RouteTab>
            <RouteTab to={route("/cv")}>CV</RouteTab>
            <RouteTab to={route("/articles")}>Articles</RouteTab>
            <RouteTab to={route("/shows")}>Shows</RouteTab>
            <RouteTab to={route("/auction-results")}>Auction results</RouteTab>
            <RouteTab to={route("/related-artists")}>Related artists</RouteTab>
          </RouteTabs>

          <Spacer mb={3} />

          <LoadingArea>{children}</LoadingArea>
        </Col>
      </Row>

      <Box mb={4}>
        <Separator />
      </Box>

      <Box my={3}>
        <RecentlyViewed me={me} />
      </Box>

      <Box my={3}>
        <Separator />
      </Box>

      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </React.Fragment>
  )
}
