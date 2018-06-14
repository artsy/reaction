import React from "react"
import { Serif } from "@artsy/palette"
import {
  MarketInsights,
  MarketInsightsProps,
} from "../../Components/MarketInsights"
import {
  SelectedExhibitionsProps,
  SelectedExhibitions,
} from "../../Components/SelectedExhibitions"
import { ArtistBio } from "../../Components/ArtistBio"
import { Box } from "../../Elements/Box"
import { Responsive } from "../../Utils/Responsive"

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
