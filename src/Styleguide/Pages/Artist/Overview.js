import { Sans } from "@artsy/palette"
import { ArtworkGridExample } from "Components/__stories__/ArtworkGrid.story"
import React from "react"
import styled from "styled-components"
import { space, width } from "styled-system"
import { ArtistBio } from "Styleguide/Components/ArtistBio"
import { MarketInsights } from "Styleguide/Components/MarketInsights"
import { Pagination } from "Styleguide/Components/Pagination"
import { SelectedExhibitions } from "Styleguide/Components/SelectedExhibitions"
import { Toggle } from "Styleguide/Components/Toggle"
import { insights } from "Styleguide/Components/__stories__/MarketInsight.story"
import { exhibitions } from "Styleguide/Components/__stories__/SelectedExhibitions.story"
import { Checkbox } from "Styleguide/Elements/Checkbox"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Radio } from "Styleguide/Elements/Radio"
import { Select } from "Styleguide/Elements/Select"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"
import { CurrentEvent } from "./CurrentEvent"

export const Overview = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={9}>
          <MarketInsights insights={insights} />
          <Spacer mb={3} />

          <SelectedExhibitions exhibitions={exhibitions} />
          <Spacer mb={5} />

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

          <Spacer mb={3} />

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
                <GeneFamilyItem href="#" className="noUnderline" mr={2}>
                  {gene}
                  {geneDivider}
                </GeneFamilyItem>
              )
            })}
          </GeneFamily>

          <Spacer mb={3} />

          <Sans size="2" color="black60">
            <a href="#">Consign</a> a work by this artist.
          </Sans>
        </Col>
        <Col sm={3}>
          <CurrentEvent
            src="https://picsum.photos/300/200/?random"
            label="Currently on view"
            title="Brancusi: Pioneer of American Minimalism"
            gallery="Paul Kasmin Gallery"
            location="Miami"
            date="May 3 – 21, 2018"
          />
        </Col>
      </Row>

      <Spacer mb={6} />

      <Row>
        <Col>
          <Responsive>
            {({ xs }) => {
              return (
                <ArtworkBrowser>
                  {!xs && (
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
                  )}

                  <ArtworkGrid
                    width={"100%"}
                    flexDirection="column"
                    alignItems="flex-end"
                  >
                    <Flex width="100%" pb={4} justifyContent="flex-end">
                      <Select />
                    </Flex>

                    <ArtworkGridItems
                      artistID="pablo-picasso"
                      columnCount={xs ? 2 : 3}
                    />

                    <Spacer mb={5} />
                    <Pagination />
                  </ArtworkGrid>
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

const ArtworkGridItems = styled(ArtworkGridExample)`
  width: 100%;
`
