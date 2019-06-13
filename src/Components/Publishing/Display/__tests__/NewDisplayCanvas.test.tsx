import { targetingData } from "Components/Publishing/Display/DisplayTargeting"
import { NewDisplayCanvas } from "Components/Publishing/Display/NewDisplayCanvas"
import { StandardArticle } from "Components/Publishing/Fixtures/Articles"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { StandardArticleHostedAdCanvas } from "../../Fixtures/Components"

describe("snapshot", () => {
  it("renders the new canvas in standard layout", () => {
    const component = renderer
      .create(
        <NewDisplayCanvas
          adDimension={StandardArticleHostedAdCanvas.adDimension}
          adUnit={StandardArticleHostedAdCanvas.adUnit}
          displayNewAds
          targetingData={targetingData(StandardArticle.id, "article")}
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
        displayNewAds
        targetingData={targetingData(StandardArticle.id, "article")}
      />
    )

    expect(canvas.props().adDimension).toEqual("970x250")
    expect(canvas.props().adUnit).toEqual("Desktop_TopLeaderboard")
    expect(canvas.props().displayNewAds).toBe(true)
    expect(canvas.props().targetingData).toEqual({
      is_testing: true,
      page_type: "article",
      post_id: "594a7e2254c37f00177c0ea9",
    })
    expect(canvas).toHaveLength(1)
    canvas.find({ className: "htl-ad" })
    canvas.find({ "data-sizes": "970x250" })
    canvas.find({ "data-eager": true })
    canvas.find({ "data-unit": "Desktop_TopLeaderboard" })
  })
})
