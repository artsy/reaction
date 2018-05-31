import "jest-styled-components"
import renderer from "react-test-renderer"
import { cloneDeep, extend } from "lodash"
import { mount } from "enzyme"
import React from "react"
import { MarketDataSummaryArtists } from "../../../Publishing/Fixtures/Components"
import { MarketDataSummary } from "../MarketDataSummary"

describe("MarketDataSummary", () => {
  describe("snapshots", () => {
    it("renders correctly", () => {
      const marketDataSummary = renderer
        .create(<MarketDataSummary artist={MarketDataSummaryArtists[0]} />)
        .toJSON()
      expect(marketDataSummary).toMatchSnapshot()
    })

    it("renders correctly with genes", () => {
      const marketDataSummary = renderer
        .create(<MarketDataSummary artist={MarketDataSummaryArtists[1]} showGenes />)
        .toJSON()
      expect(marketDataSummary).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("renders market data if present", () => {
      const component = mount(
        <MarketDataSummary artist={MarketDataSummaryArtists[0]} />
      )
      expect(component.text()).toMatch("$63m auction record")
      expect(component.text()).toMatch("Represented by a top established gallery")
      expect(component.text()).toMatch("Collected by a major museum")
    })

    it("renders genes if props.showGenes and no market data", () => {
      const component = mount(
        <MarketDataSummary
          artist={MarketDataSummaryArtists[1]}
          onEmptyText="United States, Abstract Art"
        />
      )
      expect(component.text()).toMatch("United States, Abstract Art")
    })

    it("renders nothing if no market data or onEmptyText", () => {
      const component = mount(
        <MarketDataSummary artist={MarketDataSummaryArtists[1]} />
      )
      expect(component.html()).toBe(null)
    })

    describe("#renderGalleryCategory", () => {
      it("prints single results", () => {
        const component = mount(<MarketDataSummary artist={MarketDataSummaryArtists[0]} />)
        const { props: { children } } = component.instance().renderGalleryCategory("blue-chip", 1)

        expect(children).toMatch("Represented by a blue chip gallery")
      })

      it("prints plural results", () => {
        const component = mount(<MarketDataSummary artist={MarketDataSummaryArtists[0]} />)
        const { props: { children } } = component.instance().renderGalleryCategory("top-emerging", 2)

        expect(children).toMatch("Represented by top emerging galleries")
      })
    })
  })
})