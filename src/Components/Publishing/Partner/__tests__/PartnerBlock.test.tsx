import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { PartnerBlock } from "../PartnerBlock"

it("renders the partner block", () => {
  const partnerBlock = renderer
    .create(
      <PartnerBlock
        url="https://artsy.net"
        logo="https://artsy-media-uploads.s3.amazonaws.com/kq-CcNCHEgAuPadHtOveeg%2FPlanetArt_Black.png"
      />
    )
    .toJSON()
  expect(partnerBlock).toMatchSnapshot()
})
