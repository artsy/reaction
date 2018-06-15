import React from "react"
import { Serif } from "@artsy/palette"
import {
  MarketInsights,
  MarketInsightsProps,
} from "Styleguide/Components/MarketInsights"
import {
  SelectedExhibitionsProps,
  SelectedExhibitions,
} from "Styleguide/Components/SelectedExhibitions"
import { ArtistBio } from "Styleguide/Components/ArtistBio"
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
              <Serif size={xs ? "5" : "8"} mb={4}>
                {this.props.name}
              </Serif>
            )
          }}
        </Responsive>
        <Box mb={3}>
          <MarketInsights insights={this.props.insights} />
        </Box>
        <Box mb={4}>
          <SelectedExhibitions exhibitions={this.props.exhibitions} />
        </Box>
        <ArtistBio>{this.props.bio}</ArtistBio>
      </React.Fragment>
    )
  }
}
