import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { PartnerInline } from "../PartnerInline"

it("renders the partner inline", () => {
  const partnerInline = renderer
    .create(
      <PartnerInline
        url="https://artsy.net"
        logo="https://artsy-media-uploads.s3.amazonaws.com/kq-CcNCHEgAuPadHtOveeg%2FPlanetArt_Black.png"
      />
    )
    .toJSON()
  expect(partnerInline).toMatchSnapshot()
})
