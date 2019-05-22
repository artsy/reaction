import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import { NewDisplayCanvas } from "Components/Publishing/Display/NewDisplayCanvas"
import { NewsArticle } from "Components/Publishing/Fixtures/Articles"

import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { NewsLayout } from "../NewsLayout"
jest.mock("isomorphic-fetch")

declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
)

// tslint:disable: jsx-boolean-value
describe("News Layout with new ads enabled", () => {
  const getWrapper = () => {
    return mount(
      <NewsLayout
        areHostedAdsEnabled={true}
        article={NewsArticle}
        shouldAdRender={true}
      />
    )
  }

  it("renders the news layout properly when new ads are enabled", () => {
    const layout = renderer
      .create(
        <NewsLayout
          article={NewsArticle}
          shouldAdRender={true}
          areHostedAdsEnabled={true}
        />
      )
      .toJSON()
    expect(layout).toMatchSnapshot()
  })

  it("renders the news layout component with new ads", () => {
    const component = getWrapper()

    expect(component.find(NewDisplayCanvas).length).toBe(1)
    expect(component.find(DisplayCanvas).length).toBe(0)

    expect(component.find(NewDisplayCanvas).prop("adUnit")).toEqual(
      "Desktop_InContentLB2"
    )
    expect(component.find(NewDisplayCanvas).prop("adDimension")).toEqual(
      "970x250"
    )
  })
})
