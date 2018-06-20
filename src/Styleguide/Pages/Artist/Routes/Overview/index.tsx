import { Sans, Serif } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { space } from "styled-system"
import { ArtistBio } from "Styleguide/Components/ArtistBio"
import { ArtworkGridExample as ArtworkGrid } from "Styleguide/Components/ArtworkGridExample"
import { MarketInsights } from "Styleguide/Components/MarketInsights"
import { Pagination } from "Styleguide/Components/Pagination"
import { SelectedExhibitions } from "Styleguide/Components/SelectedExhibitions"
import { Toggle } from "Styleguide/Components/Toggle"
import { Box } from "Styleguide/Elements/Box"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Radio } from "Styleguide/Elements/Radio"
import { Select } from "Styleguide/Elements/Select"
import { Spacer } from "Styleguide/Elements/Spacer"
import { insights } from "Styleguide/Pages/Fixtures/MarketInsights"
import { exhibitions } from "Styleguide/Pages/Fixtures/SelectedExhibitions"
import { Responsive } from "Styleguide/Utils/Responsive"
import { CurrentEvent } from "./CurrentEvent"

export const Overview = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={9}>
          <MarketInsights insights={insights} />
          <Spacer mb={1} />

          <SelectedExhibitions exhibitions={exhibitions} />
          <Spacer mb={3} />

          <ArtistBio>
            Donald Judd, widely regarded as one of the most significant American
            artists of the post-war period, is perhaps best-known for the
            large-scale outdoor installations and long, spacious interiors he
            designed in Marfa, Texas. His oeuvre has come to define what has
            been referred to as Minimalist art—a label the artist strongly
            objected to. His sculptures and installations, constructed out of
            industrial materials such as Plexiglas, concrete, and steel and
            arranged in precise geometric shapes, were intended to emphasize the
            purity of the objects themselves rather than any symbolic meaning
            they might have—“the simple expression of complex thought,” said
            Judd. His particular interest in architecture led him to design both
            the sculptures and the spaces in which they would be contained,
            influencing a generation of artists and designers from Anish Kapoor
            to David Batchelor.
          </ArtistBio>

          <Spacer mb={1} />

          <GeneFamily>
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
              const geneDivider = index < list.length - 1 ? "," : ""

              return (
                <Serif size="3t" display="inline-block" key={index} mr={0.5}>
                  <GeneLink href="#" className="noUnderline">
                    {gene}
                    {geneDivider}
                  </GeneLink>
                </Serif>
              )
            })}
          </GeneFamily>

          <Spacer mb={1} />

          <Sans size="2" color="black60">
            <a href="#">Consign</a> a work by this artist.
          </Sans>
        </Col>
        <Col sm={3}>
          <Box pl={2}>
            <CurrentEvent
              src="https://picsum.photos/300/200/?random"
              label="Currently on view"
              title="Brancusi: Pioneer of American Minimalism"
              gallery="Paul Kasmin Gallery"
              location="Miami"
              date="May 3 – 21, 2018"
            />
          </Box>
        </Col>
      </Row>

      <Spacer mb={4} />

      <Row>
        <Col>
          <Responsive>
            {({ xs, sm, md }) => {
              return (
                <ArtworkBrowser>
                  {!xs && (
                    <Sidebar width="30%" mr={2}>
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
                  )}

                  <ArtworkGridArea
                    width={"100%"}
                    flexDirection="column"
                    alignItems="flex-end"
                  >
                    <Flex pb={2} justifyContent="flex-end">
                      <Select options={[{ value: "percy", text: "Cat" }]} />
                    </Flex>

                    <ArtworkGrid
                      artistID="pablo-picasso"
                      columnCount={xs || sm || md ? 2 : 3}
                    />

                    <Spacer mb={3} />
                    <Pagination
                      around={[{ page: 1, cursor: "blah", isCurrent: true }]}
                    />
                  </ArtworkGridArea>
                </ArtworkBrowser>
              )
            }}
          </Responsive>
        </Col>
      </Row>
    </React.Fragment>
  )
}

const GeneFamily = styled.div``
const GeneLink = styled.a`
  display: inline-block;
  ${space};
`
const ArtworkBrowser = styled(Flex)``
const ArtworkGridArea = styled(Flex)``
const Sidebar = Box
