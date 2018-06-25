import { Sans, Serif } from "@artsy/palette"

import React from "react"
import styled from "styled-components"
import { space } from "styled-system"
import { MarketInsights } from "Styleguide/Components/MarketInsights"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { insights } from "Styleguide/Pages/Fixtures/MarketInsights"
import { ArtworkFilterQueryRenderer } from "./ArtworkFilterQueryRenderer"
import { CurrentEvent } from "./CurrentEvent"
import { ExhibitionHighlightsQueryRenderer } from "./ExhibitionHighlightsQueryRenderer"
import { OverviewQueryRenderer } from "./OverviewQueryRenderer"

export const Overview = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={9}>
          <MarketInsights insights={insights} />
          <Spacer mb={1} />

          <ExhibitionHighlightsQueryRenderer artistID="pablo-picasso" />
          <Spacer mb={3} />

          <OverviewQueryRenderer artistID="pablo-picasso" />

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
