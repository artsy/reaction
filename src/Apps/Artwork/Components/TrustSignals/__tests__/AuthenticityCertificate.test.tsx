import { AuthenticityCertificate_artwork } from "__generated__/AuthenticityCertificate_artwork.graphql"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "Utils/ExtractProps"
import { AuthenticityCertificateFragmentContainer } from "../AuthenticityCertificate"

jest.unmock("react-relay")

const render = (
  artwork: Omit<AuthenticityCertificate_artwork, " $refType">,
  extraProps?: Partial<
    ExtractProps<typeof AuthenticityCertificateFragmentContainer>
  >
) =>
  renderRelayTree({
    Component: (props: any) => (
      <AuthenticityCertificateFragmentContainer
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
      query AuthenticityCertificateTestQuery {
        artwork(id: "whatevs") {
          ...AuthenticityCertificate_artwork
        }
      }
    `,
  })

describe("AuthenticityCertificate", () => {
  it("Doesn't render when there's no certificate of authenticity", async () => {
    const component = await render({
      hasCertificateOfAuthenticity: false,
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Doesn't render when the artwork is biddable", async () => {
    const component = await render({
      hasCertificateOfAuthenticity: true,
      is_biddable: true,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when there's a certificate of authenticity, but the work is not biddable", async () => {
    const component = await render({
      hasCertificateOfAuthenticity: true,
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })
})
