import { Serif } from "@artsy/palette"
import { artistResponse } from "Apps/__test__/Fixtures/MarketInsights"
import React from "react"
import { Box } from "Styleguide/Elements"
import { Responsive } from "Utils/Responsive"

import {
  ArtistBio,
  MarketInsights,
  MarketInsightsProps,
  SelectedExhibitions,
  SelectedExhibitionsProps,
} from "Styleguide/Components"

interface ArtistInfoProps
  extends MarketInsightsProps,
    SelectedExhibitionsProps {
  name: string
  bio: string
}

export class ArtistInfo extends React.Component<ArtistInfoProps> {
  render() {
    return (
      <React.Fragment>
        <Responsive>
          {({ xs }) => {
            return (
              <Serif size={xs ? "5" : "8"} mb={2}>
                {this.props.name}
              </Serif>
            )
          }}
        </Responsive>
        <Box mb={1}>
          <MarketInsights artist={artistResponse as any} />
        </Box>
        <Box mb={2}>
          <SelectedExhibitions exhibitions={this.props.exhibitions} />
        </Box>
        <ArtistBio
          bio={
            {
              biography_blurb: { text: this.props.bio, credit: "Gagosian" },
            } as any
          }
        />
      </React.Fragment>
    )
  }
}
