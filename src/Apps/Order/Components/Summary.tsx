import { Sans } from "@artsy/palette"
import React, { Component } from "react"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Placeholder } from "Styleguide/Utils/Placeholder"

import styled from "styled-components"

type Mediator = {
  trigger: (action: string, config?: object) => void
}

export interface SummaryProps {
  mediator?: Mediator
}

export class Summary extends Component<SummaryProps> {
  render() {
    return (
      <>
        <Placeholder height="390px" name="Sidebar" />
        <Helper mediator={this.props.mediator} />
      </>
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
        onClick={() => mediator && mediator.trigger("openOrdersBuyerFAQModal")}
      >
        Read our FAQ
      </Link>{" "}
      or{" "}
      <Link
        onClick={() =>
          mediator && mediator.trigger("openOrdersContactArtsyModal")
        }
      >
        ask an Artsy Specialist
      </Link>.
    </Sans>
  </>
)
