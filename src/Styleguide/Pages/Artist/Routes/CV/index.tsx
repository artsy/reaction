import { Serif } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import React from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { CVPaginationContainer } from "./CVPaginationContainer"
import { CVQueryRenderer } from "./CVQueryRenderer"

interface Props {
  artist: ArtistHeader_artist
  category: string
}

export class CVRoute extends React.Component<Props> {
  render() {
    const { artist, category } = this.props

    return (
      <React.Fragment>
        <CVPaginationContainer category={category} artist={artist as any} />

        <Spacer my={1} />

        <CVQueryRenderer
          artistID="pablo-picasso"
          filters={{
            at_a_fair: false,
            solo_show: false,
            sort: "start_at_desc",
            is_reference: true,
            visible_to_public: false,
          }}
          category="Group Shows"
        />

        <Spacer my={1} />

        <CVQueryRenderer
          artistID="pablo-picasso"
          filters={{ at_a_fair: true, sort: "start_at_desc" }}
          category="Fair Booths"
        />

        <Spacer my={1} />

        <Row>
          <Col smOffset={2}>
            <Serif size="2" color="black60">
              Artist CVs are assembled using only exhibition data available on
              Artsy.
            </Serif>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
