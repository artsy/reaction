import React from "react"
import { Tabs, Tab } from "Styleguide/Components/Tabs"
import { Box } from "Styleguide/Elements/Box"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Articles } from "./Articles"
import { ArtistHeader } from "./ArtistHeader"
import { AuctionResults } from "./AuctionResults"
import { CV } from "./CV"
import { Overview } from "./Overview"
import { RelatedArtists } from "./RelatedArtists"
import { Shows } from "./Shows"
import { Footer } from "Styleguide/Components/Footer"

export class Artist extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col>
            <ArtistHeader />
          </Col>
        </Row>

        <Spacer mb={3} />

        <Row>
          <Col>
            <Tabs>
              <Tab name="Overview">
                <Overview />
              </Tab>
              <Tab name="CV">
                <CV />
              </Tab>
              <Tab name="Articles">
                <Articles />
              </Tab>
              <Tab name="Shows">
                <Shows />
              </Tab>
              <Tab name="Auction results">
                <AuctionResults />
              </Tab>
              <Tab name="Related artists">
                <RelatedArtists />
              </Tab>
            </Tabs>
          </Col>
        </Row>

        <Separator my={6} />

        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Grid>
    )
  }
}
