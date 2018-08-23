import { Sans } from "@artsy/palette"
import React from "react"
import { ContextConsumer } from "Router"
import styled from "styled-components"
import { Spacer } from "Styleguide/Elements/Spacer"

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
            ask an Artsy Specialist
          </Link>.
        </Sans>
        <Spacer mb={2} />
      </>
    )}
  </ContextConsumer>
)
