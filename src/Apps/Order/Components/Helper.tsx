import { Sans, Spacer } from "@artsy/palette"
import { ContextConsumer } from "Artsy/Router"
import React, { Component } from "react"
import styled from "styled-components"

const Link = styled.a`
  text-decoration: underline;
`

interface HelperProps {
  artworkId: string | null
}

export class Helper extends Component<HelperProps> {
  render() {
    return (
      <ContextConsumer>
        {({ mediator }) => (
          <>
            <Sans size="2" color="black60">
              Have a question?{" "}
              <Link onClick={() => mediator.trigger("openOrdersBuyerFAQModal")}>
                Read our FAQ
              </Link>{" "}
              or{" "}
              <Link
                onClick={() =>
                  mediator.trigger("openOrdersContactArtsyModal", {
                    artworkId: this.props.artworkId,
                  })
                }
              >
                ask a specialist
              </Link>.
            </Sans>
            <Spacer mb={2} />
          </>
        )}
      </ContextConsumer>
    )
  }
}
