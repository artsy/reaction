import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { getCurrentUnixTimestamp } from "../../Constants"
import { DisplayCanvas } from "../Canvas"
import { CanvasLink } from "../Canvas/CanvasContainer"
import { CanvasSlideshow } from "../Canvas/CanvasSlideshow"
import { CanvasText } from "../Canvas/CanvasText"
import { CanvasVideo } from "../Canvas/CanvasVideo"

import {
  Campaign,
  StandardArticleHostedAdCanvas,
  UnitCanvasImage,
  UnitCanvasOverlay,
  UnitCanvasSlideshow,
  UnitCanvasTracked,
  UnitCanvasVideo,
} from "../../Fixtures/Components"

describe("snapshot", () => {
  xit("renders the canvas in standard layout with image", () => {
    const component = renderer
      .create(
        <DisplayCanvas
          unit={UnitCanvasImage}
          campaign={Campaign}
          adUnit={StandardArticleHostedAdCanvas.adUnit}
          adDimension={StandardArticleHostedAdCanvas.adDimension}
        />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("renders the canvas in standard layout with video", () => {
    const component = renderer
      .create(
        <DisplayCanvas
          unit={UnitCanvasVideo}
          campaign={Campaign}
          adUnit={StandardArticleHostedAdCanvas.adUnit}
          adDimension={StandardArticleHostedAdCanvas.adDimension}
        />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("renders the canvas in overlay layout", () => {
    const component = renderer
      .create(
        <DisplayCanvas
          unit={UnitCanvasOverlay}
          campaign={Campaign}
          adUnit={StandardArticleHostedAdCanvas.adUnit}
          adDimension={StandardArticleHostedAdCanvas.adDimension}
        />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  it("renders the canvas in slideshow layout", () => {
    const component = renderer
      .create(
        <DisplayCanvas
          unit={UnitCanvasSlideshow}
          campaign={Campaign}
          adUnit={StandardArticleHostedAdCanvas.adUnit}
          adDimension={StandardArticleHostedAdCanvas.adDimension}
        />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})

describe("unit", () => {
  const trackEvent = jest.fn()
  const getWrapper = (props: any = {}) => {
    return mount(
      <DisplayCanvas
        unit={props.unit || UnitCanvasImage}
        campaign={props.campaign || Campaign}
        tracking={{
          trackEvent,
        }}
        renderTime={12345}
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    )
  }

  xit("renders the unit data", () => {
    const canvas = mount(
      <DisplayCanvas
        unit={UnitCanvasImage}
        campaign={Campaign}
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    )
    expect(canvas.html()).toMatch(UnitCanvasImage.disclaimer)
    expect(canvas.html()).toMatch(UnitCanvasImage.headline)
    expect(canvas.html()).toMatch(UnitCanvasImage.link.text)
    expect(canvas.html()).toMatch(UnitCanvasImage.link.url)
    expect(canvas.html()).toMatch("artsy-logo-wide-black")
    expect(canvas.html()).toMatch("cloudfront")
    expect(canvas.find(CanvasText).length).toBe(1)
    expect(canvas.find(CanvasSlideshow).length).toBe(0)
    expect(canvas.find(CanvasVideo).length).toBe(0)
  })

  it("renders the canvas with the correct dimensions and unit name", () => {
    const canvas = mount(
      <DisplayCanvas
        unit={UnitCanvasImage}
        campaign={Campaign}
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    )

    expect(canvas.html()).toMatch('data-unit="Desktop_TopLeaderboard"')
    expect(canvas.html()).toMatch('data-sizes="970x250"')
  })

  xit("renders the video component if standard layout with video", () => {
    const canvas = mount(
      <DisplayCanvas
        unit={UnitCanvasVideo}
        campaign={Campaign}
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    )
    expect(canvas.find(CanvasVideo).length).toBe(1)
  })

  xit("renders the slideshow component if slideshow layout", () => {
    const canvas = mount(
      <DisplayCanvas
        unit={UnitCanvasSlideshow}
        campaign={Campaign}
        adUnit={StandardArticleHostedAdCanvas.adUnit}
        adDimension={StandardArticleHostedAdCanvas.adDimension}
      />
    )
    expect(canvas.find(CanvasSlideshow).length).toBe(1)
  })

  xit("renders a pixel impression if there is a url", () => {
    const wrapper = getWrapper({
      unit: UnitCanvasTracked,
    })
    expect(wrapper.html()).toMatch("impression?ord=12345")
  })

  describe("analytics", () => {
    it("tracks impressions", () => {
      const wrapper = getWrapper() as any
      wrapper.instance().trackImpression()

      expect(trackEvent.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          action: "Impression",
          entity_type: "display_ad",
          campaign_name: "Artsy",
          unit_layout: "canvas_standard",
        })
      )
    })

    it("tracks viewability", () => {
      const wrapper = getWrapper() as any
      wrapper.instance().trackViewability()

      expect(trackEvent.mock.calls[1][0]).toEqual(
        expect.objectContaining({
          action: "Viewability",
          entity_type: "display_ad",
          campaign_name: "Artsy",
          unit_layout: "canvas_standard",
        })
      )
    })

    xit("busts 3rd party cache on click", () => {
      const wrapper = getWrapper({
        unit: UnitCanvasTracked,
      })
      const currentTime = getCurrentUnixTimestamp()
        .toString()
        .substring(6)
      wrapper.find(CanvasLink).simulate("click")
      const open = window.open as any
      expect(open.mock.calls[0][0]).toMatch("?ord=")
      expect(open.mock.calls[0][0]).toMatch(currentTime)
    })
  })
})
