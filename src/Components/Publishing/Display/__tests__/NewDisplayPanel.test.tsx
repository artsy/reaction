import { NewDisplayPanel } from "Components/Publishing/Display/NewDisplayPanel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"

import { StandardArticleHostedAdPanel } from "../../Fixtures/Components"
// tslint:disable: jsx-boolean-value

describe("snapshot", () => {
  it("renders the new canvas in standard layout", () => {
    const component = renderer
      .create(
        <NewDisplayPanel
          adDimension={StandardArticleHostedAdPanel.adDimension}
          adUnit={StandardArticleHostedAdPanel.adUnit}
          displayNewAds={true}
        />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})

describe("data", () => {
  it("renders the component with the correct data and properties in standard layout articles", () => {
    const panel = mount(
      <NewDisplayPanel
        adDimension={StandardArticleHostedAdPanel.adDimension}
        adUnit={StandardArticleHostedAdPanel.adUnit}
        displayNewAds={true}
      />
    )

    expect(panel.props().adDimension).toEqual("300x250")
    expect(panel.props().adUnit).toEqual("Desktop_RightRail1")
    expect(panel.props().displayNewAds).toBe(true)
    panel.find({ className: "htl-ad" })
    panel.find({ "data-sizes": "300x250" })
    panel.find({ "data-eager": true })
    panel.find({ "data-unit": "Desktop_RightRail1" })
  })
})
