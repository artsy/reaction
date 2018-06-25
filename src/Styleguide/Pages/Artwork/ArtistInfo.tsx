import { Serif } from "@artsy/palette"
import React from "react"
import { ArtistBio } from "Styleguide/Components/ArtistBio"
import {
  MarketInsights,
  MarketInsightsProps,
} from "Styleguide/Components/MarketInsights"
import {
  SelectedExhibitions,
  SelectedExhibitionsProps,
} from "Styleguide/Components/SelectedExhibitions"
import { Box } from "Styleguide/Elements/Box"
import { Responsive } from "Styleguide/Utils/Responsive"

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
          <MarketInsights insights={this.props.insights} />
        </Box>
        <Box mb={2}>
          <SelectedExhibitions exhibitions={this.props.exhibitions} />
        </Box>
        <ArtistBio>{this.props.bio}</ArtistBio>
      </React.Fragment>
    )
  }
}
