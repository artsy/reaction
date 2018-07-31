import { Sans } from "@artsy/palette"
import React, { Component } from "react"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"

import { AppState } from "Router/state"
import styled from "styled-components"
import { Subscribe } from "unstated"

type Mediator = {
  trigger: (action: string, config?: object) => void
}

export interface SummaryProps {
  mediator?: Mediator
}

export class Summary extends Component<SummaryProps> {
  render() {
    return (
      <Subscribe to={[AppState]}>
        {({ state }) => {
          const { mediator } = state

          return <>
              <Placeholder height="390px" name="Sidebar" />
              {this.props.children}
              <Helper mediator={mediator} />
            </>
        }}
      </Subscribe>
    )
  }
}

const Link = styled.a`
  text-decoration: underline;
`

const Helper: React.SFC<SummaryProps> = ({ mediator }) => (
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
            artworkId: "lisa-breslow-cactus",
          })
        }
      >
        ask an Artsy Specialist
      </Link>.
    </Sans>
  </>
)
