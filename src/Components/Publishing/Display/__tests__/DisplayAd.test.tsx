import {
  DisplayAd,
  DisplayAdProps,
} from "Components/Publishing/Display/DisplayAd"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Bling as GPT } from "react-gpt"
import renderer from "react-test-renderer"

import { StandardArticleHostedAdCanvas as AdData } from "../../Fixtures/Components"
it("renders the new canvas in standard layout", () => {
  const component = renderer
    .create(
      <DisplayAd
        adDimension={AdData.adDimension}
        adUnit={AdData.adUnit}
        displayNewAds
      />
    )
    .toJSON()
  expect(component).toMatchSnapshot()
})

it("renders the component with the correct data and properties in standard layout articles", () => {
  const ad = mount(
    <DisplayAd
      adDimension={AdData.adDimension}
      adUnit={AdData.adUnit}
      displayNewAds
    />
  )

  const adProps: DisplayAdProps = ad.props()
  expect(adProps.adDimension).toEqual("970x250")
  expect(adProps.adUnit).toEqual("Desktop_TopLeaderboard")
  expect(adProps.displayNewAds).toBe(true)
  expect(ad).toHaveLength(1)
})

it("renders GPT with the correct properties", () => {
  const ad = mount(
    <DisplayAd
      adDimension={AdData.adDimension}
      adUnit={AdData.adUnit}
      targetingData={AdData.targetingData}
      displayNewAds
    />
  )

  const gptComponent = ad.find(GPT)
  const gptProps: any = gptComponent.props()
  expect(gptProps.adUnitPath).toEqual("/21805539690/Desktop_TopLeaderboard")
  expect(gptProps.targeting).toEqual(AdData.targetingData)
  expect(gptProps.slotSize).toEqual([970, 250])
})
