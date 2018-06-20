import { Theme, themeProps, injectGlobalCSS } from "@artsy/palette"
import React from "react"
import { Footer } from "Styleguide/Components/Footer"
import { Tab, Tabs } from "Styleguide/Components/Tabs"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { ResponsiveProvider } from "Styleguide/Utils/Responsive"
import { Articles } from "./Articles"
import { ArtistHeader } from "./ArtistHeader"
import { AuctionResults } from "./AuctionResults"
import { CV } from "./CV"
import { Overview } from "./Overview"
import { RelatedArtists } from "./RelatedArtists"
import { Shows } from "./Shows"

injectGlobalCSS()

export class Artist extends React.Component {
  render() {
    return (
      <Theme>
        <GlobalStyles>
          <ResponsiveProvider breakpoints={themeProps.mediaQueries}>
            <Grid fluid>
              <Row>
                <Col>
                  <ArtistHeader />
                </Col>
              </Row>

              <Spacer mb={3} />

              <Row>
                <Col>
                  <Tabs initialTabIndex={2}>
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

              <Spacer mb={3} />
              <Separator my={6} />

              <Row>
                <Col>
                  <Footer />
                </Col>
              </Row>
            </Grid>
          </ResponsiveProvider>
        </GlobalStyles>
      </Theme>
    )
  }
}
