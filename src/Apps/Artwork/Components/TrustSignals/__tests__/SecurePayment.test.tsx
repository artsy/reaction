import { SecurePayment_artwork } from "__generated__/SecurePayment_artwork.graphql"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "Utils/ExtractProps"
import { SecurePaymentFragmentContainer } from "../SecurePayment"

jest.unmock("react-relay")

const render = (
  artwork: Omit<SecurePayment_artwork, " $refType">,
  extraProps?: Partial<ExtractProps<typeof SecurePaymentFragmentContainer>>
) =>
  renderRelayTree({
    Component: (props: any) => (
      <SecurePaymentFragmentContainer
        artwork={{
          ...artwork,
        }}
        {...props}
        {...extraProps}
      />
    ),
    mockData: {
      artwork,
    },
    query: graphql`
      query SecurePaymentTestQuery {
        artwork(id: "whatevs") {
          ...SecurePayment_artwork
        }
      }
    `,
  })

describe("SecurePayment", () => {
  it("Doesn't render when work is neither acquireable nor offerable", async () => {
    const component = await render({
      is_acquireable: false,
      is_offerable: false,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the artwork is acquireable", async () => {
    const component = await render({
      is_acquireable: true,
      is_offerable: false,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })

  it("Renders when the artwork is offerable", async () => {
    const component = await render({
      is_acquireable: false,
      is_offerable: true,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })
})
