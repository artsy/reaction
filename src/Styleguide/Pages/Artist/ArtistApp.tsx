import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import React from "react"
import { Footer } from "Styleguide/Components/Footer"
import { RouteTab, RouteTabs } from "Styleguide/Components/RouteTabs"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { ArtistHeaderQueryRenderer as ArtistHeader } from "./Components/ArtistHeaderQueryRenderer"

// TODO:
// Max width 1192
// Inner content max width 1112

interface Props {
  artist: ArtistHeader_artist
}

export class ArtistApp extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <ArtistHeader artistID="pablo-picasso" />
          </Col>
        </Row>

        <Spacer mb={3} />

        <Row>
          <Col>
            <RouteTabs>
              <RouteTab to="/" exact>
                Overview
              </RouteTab>
              <RouteTab to="/cv">CV</RouteTab>
              <RouteTab to="/articles">Articles</RouteTab>
              <RouteTab to="/shows">Shows</RouteTab>
              <RouteTab to="/auction-results">Auction results</RouteTab>
              <RouteTab to="/related-artists">Related artists</RouteTab>
            </RouteTabs>

            <Spacer mb={3} />

            {this.props.children}
          </Col>
        </Row>

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
}
