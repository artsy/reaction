import { Sans, Spacer } from "@artsy/palette"
import { ContextConsumer } from "Artsy/Router"
import React from "react"
import styled from "styled-components"

const Link = styled.a`
  text-decoration: underline;
`

interface HelperProps {
  artworkId: string | null
}

export const Helper: React.SFC<HelperProps> = ({ artworkId }) => (
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
                artworkId,
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
