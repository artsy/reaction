import { RecentlyViewed_me } from "__generated__/RecentlyViewed_me.graphql"
import React from "react"
import { Footer } from "Styleguide/Components/Footer"
import { RecentlyViewedFragmentContainer as RecentlyViewed } from "Styleguide/Components/RecentlyViewed"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Styleguide/Pages/Artist/Components/NavigationTabs"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "./Components/ArtistHeader"
import { LoadingArea } from "./Components/LoadingArea"

// TODO:
// Max width 1192
// Inner content max width 1112

export interface ArtistAppProps {
  artist: any
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

          <LoadingArea>{children}</LoadingArea>
        </Col>
      </Row>

      <Box mb={4}>
        <Separator />
      </Box>

      {me && (
        <Box my={3}>
          <RecentlyViewed me={me} />
        </Box>
      )}

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
