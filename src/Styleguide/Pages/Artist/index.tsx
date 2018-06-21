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
import { ArticlesContent } from "./Routes/Articles"
import { RelayAuctionResults } from "./Routes/AuctionResults"
import { CV } from "./Routes/CV"
import { Overview } from "./Routes/Overview"
import { RelatedArtists } from "./Routes/RelatedArtists"
import { Shows } from "./Routes/Shows"

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
                      <Tabs initialTabIndex={5}>
                        <Tab name="Overview">
                          <Overview />
                        </Tab>
                        <Tab name="CV">
                          <CV />
                        </Tab>
                        <Tab name="Articles">
                          <ContextProvider>
                            <ArticlesContent artistID="pablo-picasso" />
                          </ContextProvider>
                        </Tab>
                        <Tab name="Shows">
                          <Shows />
                        </Tab>
                        <Tab name="Auction results">
                          <RelayAuctionResults artistID="pablo-picasso" />
                        </Tab>
                        <Tab name="Related artists">
                          <RelatedArtists />
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
