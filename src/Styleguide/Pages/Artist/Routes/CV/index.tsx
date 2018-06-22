import { Serif } from "@artsy/palette"
import React from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { CVQueryRenderer } from "./CVQueryRenderer"

export class CVRoute extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CVQueryRenderer
          artistID="pablo-picasso"
          filters={{
            at_a_fair: false,
            solo_show: true,
            sort: "start_at_desc",
            is_reference: true,
            visible_to_public: false,
          }}
          category="Solo Shows"
        />

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
