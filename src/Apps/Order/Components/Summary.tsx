import { Sans } from "@artsy/palette"
import { Summary_order } from "__generated__/Summary_order.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"

import { AppState } from "Router/state"
import styled from "styled-components"
import { Subscribe } from "unstated"

type Mediator = {
  trigger: (action: string, config?: object) => void
}

interface SummaryProps {
  order: Summary_order
  mediator?: Mediator
}

class Summary extends Component<SummaryProps> {
  render() {
    const {
      order: { lineItems },
    } = this.props

    const initialLineItem = lineItems && lineItems.edges && lineItems.edges[0]
    const artworkId = initialLineItem ? initialLineItem.node.artwork.id : null

    return (
      <Subscribe to={[AppState]}>
        {({ state }) => {
          const { mediator } = state

          return (
            <>
              <Placeholder height="390px" name="Sidebar" />
              {this.props.children}
              <Helper mediator={mediator} artworkId={artworkId} />
            </>
          )
        }}
      </Subscribe>
    )
  }
}

const Link = styled.a`
  text-decoration: underline;
`

interface HelperProps {
  artworkId: string | null
  mediator?: Mediator
}

const Helper: React.SFC<HelperProps> = ({ mediator, artworkId }) => (
  <>
    <Spacer mt={2} mb={2} />
    <Sans size="2" color="black60">
      Have a question?{" "}
      <Link
        onClick={() => {
          mediator && mediator.trigger("openOrdersBuyerFAQModal")
        }}
      >
        Read our FAQ
      </Link>{" "}
      or{" "}
      <Link
        onClick={() =>
          mediator &&
          mediator.trigger("openOrdersContactArtsyModal", {
            artworkId,
          })
        }
      >
        ask an Artsy Specialist
      </Link>.
    </Sans>
  </>
)

export const SummaryFragmentContainer = createFragmentContainer(
  Summary,
  graphql`
    fragment Summary_order on Order {
      lineItems {
        edges {
          node {
            artwork {
              id
            }
          }
        }
      }
    }
  `
)
