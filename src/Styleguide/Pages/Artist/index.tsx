import { Sans, Serif } from "@artsy/palette"
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
import { RelayCVContent } from "./Routes/CV"
import { Overview } from "./Routes/Overview"
import { RelayRelatedArtistsContent } from "./Routes/RelatedArtists"
import { RelayShowsContent } from "./Routes/Shows"

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
                          <RelayCVContent
                            artistID="pablo-picasso"
                            filters={{
                              at_a_fair: false,
                              solo_show: true,
                              sort: "start_at_desc",
                              is_reference: true,
                              visible_to_public: false,
                            }}
                            category="Solo Shows"
                          />
                          <Spacer my={1} />
                          <RelayCVContent
                            artistID="pablo-picasso"
                            filters={{
                              at_a_fair: false,
                              solo_show: false,
                              sort: "start_at_desc",
                              is_reference: true,
                              visible_to_public: false,
                            }}
                            category="Group Shows"
                          />
                          <Spacer my={1} />
                          <RelayCVContent
                            artistID="pablo-picasso"
                            filters={{ at_a_fair: true, sort: "start_at_desc" }}
                            category="Fair Booths"
                          />
                          <Spacer my={1} />
                          <Row>
                            <Col smOffset={2}>
                              <Serif size="2" color="black60">
                                Artist CVs are assembled using only exhibition
                                data available on Artsy.
                              </Serif>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab name="Articles">
                          <ContextProvider>
                            <ArticlesContent artistID="pablo-picasso" />
                          </ContextProvider>
                        </Tab>
                        <Tab name="Shows">
                          <Sans size="3" weight="medium">
                            Currently on view
                          </Sans>
                          <ContextProvider>
                            <RelayShowsContent
                              status="running"
                              artistID="pablo-picasso"
                              sort="end_at_asc"
                            />
                          </ContextProvider>
                          <Sans size="3" weight="medium">
                            Upcoming
                          </Sans>
                          <ContextProvider>
                            <RelayShowsContent
                              status="upcoming"
                              artistID="andy-warhol"
                              sort="start_at_asc"
                            />
                          </ContextProvider>
                          <Sans size="3" weight="medium">
                            Past
                          </Sans>
                          <ContextProvider>
                            <RelayShowsContent
                              status="closed"
                              artistID="pablo-picasso"
                              sort="end_at_desc"
                            />
                          </ContextProvider>
                        </Tab>
                        <Tab name="Auction results">
                          <RelayAuctionResults artistID="pablo-picasso" />
                        </Tab>
                        <Tab name="Related artists">
                          <Sans size="3" weight="medium">
                            Related
                          </Sans>
                          <RelayRelatedArtistsContent
                            artistID="pablo-picasso"
                            kind="MAIN"
                          />
                          <Sans size="3" weight="medium">
                            Suggested contemporary
                          </Sans>
                          <RelayRelatedArtistsContent
                            artistID="pablo-picasso"
                            kind="CONTEMPORARY"
                          />
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
