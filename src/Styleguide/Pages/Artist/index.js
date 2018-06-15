import React from "react"
import { Tabs, Tab } from "Styleguide/Components/Tabs"
import { Box } from "Styleguide/Elements/Box"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Articles } from "./Articles"
import { ArtistHeader } from "./ArtistHeader"
import { AuctionResults } from "./AuctionResults"
import { CV } from "./CV"
import { Overview } from "./Overview"
import { RelatedArtists } from "./RelatedArtists"
import { Shows } from "./Shows"

export class Artist extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col>
            <ArtistHeader />
          </Col>
        </Row>

        <Spacer mb={5} />

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
      </Grid>
    )
  }
}
