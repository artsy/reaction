import { Sans } from "@artsy/palette"
import React from "react"
import { Spacer } from "Styleguide/Elements/Spacer"

import { WithMediator } from "Router/WithMediator"
import styled from "styled-components"

const Link = styled.a`
  text-decoration: underline;
`

interface HelperProps {
  artworkId: string | null
}

export const Helper: React.SFC<HelperProps> = ({ artworkId }) => (
  <WithMediator>
    {mediator => (
      <>
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
        <Spacer mb={2} />
      </>
    )}
  </WithMediator>
)
