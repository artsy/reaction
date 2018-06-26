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
  params: {
    artistID: string
  }
}

export class ArtistApp extends React.Component<Props> {
  render() {
    const {
      params: { artistID },
    } = this.props

    return (
      <React.Fragment>
        <Row>
          <Col>
            <ArtistHeader artistID={artistID} />
          </Col>
        </Row>

        <Spacer mb={3} />

        <Row>
          <Col>
            <RouteTabs>
              <RouteTab to={`/${artistID}`} exact>
                Overview
              </RouteTab>
              <RouteTab to={`/${artistID}/cv`}>CV</RouteTab>
              <RouteTab to={`/${artistID}/articles`}>Articles</RouteTab>
              <RouteTab to={`/${artistID}/shows`}>Shows</RouteTab>
              <RouteTab to={`/${artistID}/auction-results`}>
                Auction results
              </RouteTab>
              <RouteTab to={`/${artistID}/related-artists`}>
                Related artists
              </RouteTab>
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
