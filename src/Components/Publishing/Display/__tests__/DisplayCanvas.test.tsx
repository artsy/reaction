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
  UnitCanvasImage,
  UnitCanvasOverlay,
  UnitCanvasSlideshow,
  UnitCanvasTracked,
  UnitCanvasVideo,
} from "../../Fixtures/Components"

describe("snapshot", () => {
  it("renders the canvas in standard layout with image", () => {
    const displayPanel = renderer
      .create(<DisplayCanvas unit={UnitCanvasImage} campaign={Campaign} />)
      .toJSON()
    expect(displayPanel).toMatchSnapshot()
  })

  it("renders the canvas in standard layout with video", () => {
    const displayPanel = renderer
      .create(<DisplayCanvas unit={UnitCanvasVideo} campaign={Campaign} />)
      .toJSON()
    expect(displayPanel).toMatchSnapshot()
  })

  it("renders the canvas in overlay layout", () => {
    const displayPanel = renderer
      .create(<DisplayCanvas unit={UnitCanvasOverlay} campaign={Campaign} />)
      .toJSON()
    expect(displayPanel).toMatchSnapshot()
  })

  it("renders the canvas in slideshow layout", () => {
    const displayPanel = renderer
      .create(<DisplayCanvas unit={UnitCanvasSlideshow} campaign={Campaign} />)
      .toJSON()
    expect(displayPanel).toMatchSnapshot()
  })
})

describe("unit", () => {
  const trackEvent = jest.fn()
  const getWrapper = (props = {}) => {
    return mount(
      <DisplayCanvas
        unit={props.unit || UnitCanvasImage}
        campaign={props.campaign || Campaign}
        tracking={{
          trackEvent,
        }}
        renderTime={12345}
      />
    )
  }

  it("renders the unit data", () => {
    const canvas = mount(
      <DisplayCanvas unit={UnitCanvasImage} campaign={Campaign} />
    )
    expect(canvas.html()).toMatch(UnitCanvasImage.disclaimer)
    expect(canvas.html()).toMatch(UnitCanvasImage.headline)
    expect(canvas.html()).toMatch(UnitCanvasImage.link.text)
    expect(canvas.html()).toMatch(UnitCanvasImage.link.url)
    expect(canvas.html()).toMatch(UnitCanvasImage.logo)
    expect(canvas.find(CanvasText).length).toBe(1)
    expect(canvas.find(CanvasSlideshow).length).toBe(0)
    expect(canvas.find(CanvasVideo).length).toBe(0)
  })

  it("renders the video component if standard layout with video", () => {
    const canvas = mount(
      <DisplayCanvas unit={UnitCanvasVideo} campaign={Campaign} />
    )
    expect(canvas.find(CanvasVideo).length).toBe(1)
  })

  it("renders the slideshow component if slideshow layout", () => {
    const canvas = mount(
      <DisplayCanvas unit={UnitCanvasSlideshow} campaign={Campaign} />
    )
    expect(canvas.find(CanvasSlideshow).length).toBe(1)
  })

  it("renders a pixel impression if there is a url", () => {
    const wrapper = getWrapper({
      unit: UnitCanvasTracked,
    })
    expect(wrapper.html()).toMatch("impression?ord=12345")
  })

  describe("analytics", () => {
    it("tracks impressions", () => {
      const wrapper = getWrapper()
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
      const wrapper = getWrapper()
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

    it("busts 3rd party cache on click", () => {
      const wrapper = getWrapper({
        unit: UnitCanvasTracked,
      })
      const currentTime = getCurrentUnixTimestamp()
        .toString()
        .substring(6)
      wrapper.find(CanvasLink).simulate("click")
      expect(window.open.mock.calls[0][0]).toMatch("?ord=")
      expect(window.open.mock.calls[0][0]).toMatch(currentTime)
    })
  })
})
