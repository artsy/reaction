import { Serif } from "@artsy/palette"
import { Reject_order } from "__generated__/Reject_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"

interface RejectProps {
  relay?: RelayProp
  order: Reject_order
}
interface RejectState {
  isCommittingMutation: boolean
}

export class Reject extends Component<RejectProps, RejectState> {
  state = {
    isCommittingMutation: false,
  }

  render() {
    console.log("Hello!")
    return <Serif size="2">"Hello world"</Serif>
  }
}

export const RejectFragmentContainer = createFragmentContainer(
  Reject,
  graphql`
    fragment Reject_order on Order {
      id
      stateExpiresAt
    }
  `
)
