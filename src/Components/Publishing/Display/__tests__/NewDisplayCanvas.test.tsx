import { NewDisplayCanvas } from "Components/Publishing/Display/NewDisplayCanvas"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"

import { StandardArticleHostedAdCanvas } from "../../Fixtures/Components"

jest.mock("sharify", () => ({
  data: {
    HASHTAG_LAB_ADS_ENABLED: true,
    HASHTAG_LAB_ADS_ALLOWLIST: "alloweduser@email.com,alloweduser2@email.com",
    CURRENT_USER: {
      type: "Admin",
      email: "alloweduser@email.com",
    },
  },
}))

describe("snapshot", () => {
  it("renders the new canvas in standard layout", () => {
    const component = renderer
      .create(
        <NewDisplayCanvas
          adDimension={StandardArticleHostedAdCanvas.adDimension}
          adUnit={StandardArticleHostedAdCanvas.adUnit}
        />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})

describe("data", () => {
  it("renders the component with the correct data and properties in standard layout articles", () => {
    const canvas = mount(
      <NewDisplayCanvas
        adDimension={StandardArticleHostedAdCanvas.adDimension}
        adUnit={StandardArticleHostedAdCanvas.adUnit}
      />
    )

    expect(canvas.props().adDimension).toEqual("970x250")
    expect(canvas.props().adUnit).toEqual("Desktop_TopLeaderboard")
    expect(canvas).toHaveLength(1)
    canvas.find({ className: "htl-ad" })
    canvas.find({ "data-sizes": "970x250" })
    canvas.find({ "data-eager": true })
    canvas.find({ "data-unit": "Desktop_TopLeaderboard" })
  })
})
