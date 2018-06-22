import { injectGlobalCSS, Theme, themeProps } from "@artsy/palette"
import { ContextProvider } from "Components/Artsy"
import React from "react"
import { Footer } from "Styleguide/Components/Footer"
import { Tab, Tabs } from "Styleguide/Components/Tabs"
import { Box } from "Styleguide/Elements/Box"
import { GlobalStyles } from "Styleguide/Elements/GlobalStyles"
import { Col, Grid, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { ResponsiveProvider } from "Styleguide/Utils/Responsive"
import { Provider as StateProvider } from "unstated"
import { ArtistHeader } from "./ArtistHeader"
import { ArticlesRoute } from "./Routes/Articles"
import { AuctionResultsRoute } from "./Routes/AuctionResults"
import { CVRoute } from "./Routes/CV"
import { Overview } from "./Routes/Overview"
import { RelatedArtistsRoute } from "./Routes/RelatedArtists"
import { ShowsRoute } from "./Routes/Shows"

injectGlobalCSS()

export class Artist extends React.Component {
  render() {
    return (
      <ContextProvider>
        <StateProvider>
          <ResponsiveProvider breakpoints={themeProps.mediaQueries}>
            <GlobalStyles>
              <Theme>
                <Grid fluid>
                  <Row>
                    <Col>
                      <ArtistHeader />
                    </Col>
                  </Row>

                  <Spacer mb={3} />

                  <Row>
                    <Col>
                      <Tabs initialTabIndex={0}>
                        <Tab name="Overview">
                          <Overview />
                        </Tab>
                        <Tab name="CV">
                          <CVRoute />
                        </Tab>
                        <Tab name="Articles">
                          <ArticlesRoute />
                        </Tab>
                        <Tab name="Shows">
                          <ShowsRoute />
                        </Tab>
                        <Tab name="Auction results">
                          <AuctionResultsRoute />
                        </Tab>
                        <Tab name="Related artists">
                          <RelatedArtistsRoute />
                        </Tab>
                      </Tabs>
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
                </Grid>
              </Theme>
            </GlobalStyles>
          </ResponsiveProvider>
        </StateProvider>
      </ContextProvider>
    )
  }
}
