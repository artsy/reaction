import { Sans, Serif } from "@artsy/palette"

import React from "react"
import styled from "styled-components"
import { space } from "styled-system"
import { ArtistBio } from "Styleguide/Components/ArtistBio"
import { MarketInsights } from "Styleguide/Components/MarketInsights"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { insights } from "Styleguide/Pages/Fixtures/MarketInsights"
import { ArtworkFilterQueryRenderer } from "./ArtworkFilterQueryRenderer"
import { CurrentEvent } from "./CurrentEvent"
import { ExhibitionHighlightsQueryRenderer } from "./ExhibitionHighlightsQueryRenderer"

export const Overview = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={9}>
          <MarketInsights insights={insights} />
          <Spacer mb={1} />

          <ExhibitionHighlightsQueryRenderer artistID="pablo-picasso" />
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
          <ArtworkFilterQueryRenderer artistID="pablo-picasso" />
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
