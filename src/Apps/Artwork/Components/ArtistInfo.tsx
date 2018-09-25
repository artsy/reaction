import { Spacer, StackableBorderBox } from "@artsy/palette"
import { artistResponse } from "Apps/__test__/Fixtures/MarketInsights"
import React from "react"

import {
  ArtistBio,
  MarketInsights,
  MarketInsightsProps,
  SelectedExhibitions,
  SelectedExhibitionsProps,
} from "Styleguide/Components"
import { EntityHeader } from "Styleguide/Components/EntityHeader"

interface ArtistInfoProps
  extends MarketInsightsProps,
    SelectedExhibitionsProps {
  name: string
  bio: string
  credit?: string
}

export class ArtistInfo extends React.Component<ArtistInfoProps> {
  render() {
    // FIXME: Fetch from relay
    const props = {
      href: "/artist/francesca-dimattio",
      imageUrl: "https://picsum.photos/110/110/?random",
      name: "Francesca DiMattio",
      meta: "American, b. 1979",
    }

    return (
      <>
        <StackableBorderBox p={2} flexDirection="column">
          <EntityHeader {...props} />
          <Spacer mb={1} />
          <ArtistBio
            maxChars={200}
            bio={
              {
                biography_blurb: {
                  text: this.props.bio,
                  credit: this.props.credit,
                },
              } as any
            }
          />
        </StackableBorderBox>
        <StackableBorderBox p={2}>
          <MarketInsights artist={artistResponse as any} border={false} />
        </StackableBorderBox>
        <StackableBorderBox p={2}>
          <SelectedExhibitions
            exhibitions={this.props.exhibitions}
            border={false}
            collapsible={false}
          />
        </StackableBorderBox>
      </>
    )
  }
}
