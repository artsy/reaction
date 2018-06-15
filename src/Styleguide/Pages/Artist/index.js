import React from "react"
import styled from "styled-components"
import { space, width } from "styled-system"
import { Articles } from "./Articles"
import { AuctionResults } from "./AuctionResults"
import { CV } from "./CV"
import { Shows } from "./Shows"
import { RelatedArtists } from "./RelatedArtists"
import { Box } from "Styleguide/Elements/Box"

import { Sans, Serif } from "@artsy/palette"
import { Grid, Col, Row, media } from "Styleguide/Elements/Grid"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Tab, Tabs } from "Styleguide/Components/Tabs"
import { SelectedExhibitions } from "Styleguide/Components/SelectedExhibitions"
import { ReadMore } from "Styleguide/Components/ReadMore"
import { Toggle } from "Styleguide/Components/Toggle"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Radio } from "Styleguide/Elements/Radio"
import { ArtworkGridExample } from "Components/__stories__/ArtworkGrid.story"
import { SmallSelect } from "Styleguide/Elements/Select"
import { CurrentEvent } from "./CurrentEvent"
import { MarketInsights } from "Styleguide/Components/MarketInsights"
import { insights } from "Styleguide/Components/__stories__/MarketInsight.story"
import { exhibitions } from "Styleguide/Components/__stories__/SelectedExhibitions.story"

import { ArtistDetails } from "./ArtistDetails"

export class Artist extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col />
        </Row>
        <Row>
          <Col sm={12}>
            <ArtistDetails />
          </Col>
        </Row>
        <Row>
          <Col mt={5}>
            <Tabs>
              <Tab name="Overview">
                <div>
                  <div>
                    <Flex mt={5}>
                      <Flex flexDirection="column" pr={4} width="70%">
                        <Box mb={3}>
                          <MarketInsights insights={insights} />
                        </Box>
                        <SelectedExhibitions
                          expanded
                          exhibitions={exhibitions}
                        />
                        <ArtistBio size="3" my={3}>
                          {/* FIXME: Add truncated character count feature */}
                          <ReadMore maxLi4eCount={5}>
                            Donald Judd, widely regarded as one of the most
                            significant American artists of the post-war period,
                            is perhaps best-known for the large-scale outdoor
                            installations and long, spacious interiors he
                            designed in Marfa, Texas. His oeuvre has come to
                            define what has been referred to as Minimalist art—a
                            label the artist strongly objected to. His
                            sculptures and installations, constructed out of
                            industrial materials such as Plexiglas, concrete,
                            and steel and arranged in precise geometric shapes,
                            were intended to emphasize the purity of the objects
                            themselves rather than any symbolic meaning they
                            might have—“the simple expression of complex
                            thought,” said Judd. His particular interest in
                            architecture led him to design both the sculptures
                            and the spaces in which they would be contained,
                            influencing a generation of artists and designers
                            from Anish Kapoor to David Batchelor.
                          </ReadMore>
                        </ArtistBio>
                        <GeneFamily my={3}>
                          <Sans size="2" weight="medium">
                            Gene family name
                          </Sans>
                          {[
                            "Silhouettes",
                            "Intersectionality",
                            "Trauma and Struggle",
                            "Identity Politics",
                            "Racial and Ethnic Identity",
                            "Allegory",
                            "Paper Cut-outs",
                            "Sex",
                          ].map((gene, index, list) => {
                            const geneDivider =
                              index < list.length - 1 ? "," : ""

                            return (
                              <GeneFamilyItem
                                href="#"
                                className="noUnderline"
                                mr={2}
                              >
                                {gene}
                                {geneDivider}
                              </GeneFamilyItem>
                            )
                          })}
                        </GeneFamily>

                        <Sans size="2" color="black60">
                          <a href="#">Consign</a> a work by this artist.
                        </Sans>
                      </Flex>
                      <Flex width="30%">
                        <CurrentEvent
                          src="https://picsum.photos/300/200/?random"
                          label="Currently on view"
                          title="Brancusi: Pioneer of American Minimalism"
                          gallery="Paul Kasmin Gallery"
                          location="Miami"
                          date="May 3 – 21, 2018"
                        />
                      </Flex>
                    </Flex>
                  </div>
                  <div>
                    <ArtworkBrowser mt={6}>
                      <Sidebar width="30%" mr={4}>
                        <Toggle label="Purchase type" expanded disabled>
                          <Flex justifyContent="space-between">
                            <Checkbox>For sale</Checkbox>
                          </Flex>
                        </Toggle>
                        <Toggle label="Medium" expanded>
                          <Radio>Painting</Radio>
                          <Radio>Sculpture</Radio>
                        </Toggle>
                        <Toggle label="Gallery" />
                        <Toggle label="Institution" />
                        <Toggle label="Time period" />
                      </Sidebar>

                      <ArtworkGrid
                        width="70%"
                        flexDirection="column"
                        alignItems="flex-end"
                      >
                        <SmallSelect pb={4} pr={3} />
                        <ArtworkGridExample artistID="pablo-picasso" />
                      </ArtworkGrid>
                    </ArtworkBrowser>
                  </div>
                </div>
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

const FollowButton = styled(Button)`
  float: right;

  ${media.xs`
    float: left;
  `};
`

const ArtistBio = styled(Flex)``

const GeneFamily = styled.div`
  ${space};
`
const GeneFamilyItem = styled.a`
  display: inline-block;
  ${space};
`

const ArtworkBrowser = styled(Flex)``
const Sidebar = styled.div`
  ${space};
  ${width};
`
const ArtworkGrid = styled(Flex)``

const Details = styled.div``
const DetailItem = styled.div``
const Category = styled.div``
const CategoryLarge = styled.div``
const RecentlyViewed = styled.div``
const Footer = styled.div``
