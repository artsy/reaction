import { VerifiedSeller_artwork } from "__generated__/VerifiedSeller_artwork.graphql"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "Utils/ExtractProps"
import { VerifiedSellerFragmentContainer } from "../VerifiedSeller"

jest.unmock("react-relay")

const render = (
  artwork: Omit<VerifiedSeller_artwork, " $refType">,
  extraProps?: Partial<ExtractProps<typeof VerifiedSellerFragmentContainer>>
) =>
  renderRelayTree({
    Component: (props: any) => (
      <VerifiedSellerFragmentContainer
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
      query VerifiedSellerTestQuery {
        artwork(id: "whatevs") {
          ...VerifiedSeller_artwork
        }
      }
    `,
  })

const partnerName = "partner-name"

describe("VerifiedSeller", () => {
  it("Doesn't render when the partner is a verified seller", async () => {
    const component = await render({
      partner: {
        name: partnerName,
        isVerifiedSeller: false,
      },
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Doesn't render when the artwork is biddable", async () => {
    const component = await render({
      partner: {
        name: partnerName,
        isVerifiedSeller: true,
      },
      is_biddable: true,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the partner is a verified seller, but the work is not biddable", async () => {
    const component = await render({
      partner: {
        name: partnerName,
        isVerifiedSeller: true,
      },
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(1)
    expect(component.text()).toContain(partnerName)
  })
})
