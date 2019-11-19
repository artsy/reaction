import { CloseIcon, Link, Modal } from "@artsy/palette"
import {
  AuthenticityCertificateTestQueryRawResponse,
  AuthenticityCertificateTestQueryResponse,
} from "__generated__/AuthenticityCertificateTestQuery.graphql"
import { renderRelayTree } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "Utils/ExtractProps"
import { flushPromiseQueue } from "Utils/flushPromiseQueue"
import {
  AuthenticityCertificate,
  AuthenticityCertificateFragmentContainer,
} from "../AuthenticityCertificate"

jest.unmock("react-relay")

const render = (
  artwork: AuthenticityCertificateTestQueryRawResponse["artwork"],
  extraProps?: Partial<
    ExtractProps<typeof AuthenticityCertificateFragmentContainer>
  >
) =>
  renderRelayTree({
    Component: (props: AuthenticityCertificateTestQueryResponse) => (
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
    } as AuthenticityCertificateTestQueryRawResponse,
    query: graphql`
      query AuthenticityCertificateTestQuery @raw_response_type {
        artwork(id: "whatevs") {
          ...AuthenticityCertificate_artwork
        }
      }
    `,
  })

describe("AuthenticityCertificate", () => {
  it("Doesn't render when there's no certificate of authenticity", async () => {
    const component = await render({
      id: "opaque-cert-id",
      hasCertificateOfAuthenticity: false,
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Doesn't render when the artwork is biddable", async () => {
    const component = await render({
      id: "opaque-cert-id",
      hasCertificateOfAuthenticity: true,
      is_biddable: true,
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when there's a certificate of authenticity, but the work is not biddable", async () => {
    const component = await render({
      id: "opaque-cert-id",
      hasCertificateOfAuthenticity: true,
      is_biddable: false,
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })

  it("Click on certificate of authenticity link opens modal", async () => {
    // const component = await render({
    //   id: "opaque-cert-id",
    //   hasCertificateOfAuthenticity: true,
    //   is_biddable: false,
    // })

    const component = mount(
      <AuthenticityCertificate
        artwork={{
          hasCertificateOfAuthenticity: true,
          is_biddable: false,
          " $refType": null,
        }}
      />
    )

    expect(component.find(Link).length).toBe(1)

    setTimeout(() => {
      component
        .find(Link)
        .at(0)
        .simulate("click")
      expect(component.text()).toContain(
        "A certificate of authenticity (COA) is a signed document from an authoritative source that verifies the artwork’s authenticity."
      )
    })
  })

  it("Click on modal close button closes modal", async () => {
    const component = mount(
      <AuthenticityCertificate
        artwork={{
          hasCertificateOfAuthenticity: true,
          is_biddable: false,
          " $refType": null,
        }}
      />
    )

    component
      .find(Link)
      .at(0)
      .simulate("click")

    setTimeout(() => {
      expect(component.text()).toContain(
        "A certificate of authenticity (COA) is a signed document from an authoritative source that verifies the artwork’s authenticity."
      )
      component
        .find(CloseIcon)
        .at(0)
        .simulate("click")
      setTimeout(() => {
        expect(component.text()).not.toContain(
          "A certificate of authenticity (COA) is a signed document from an authoritative source that verifies the artwork’s authenticity."
        )
      })
    })
  })
})
