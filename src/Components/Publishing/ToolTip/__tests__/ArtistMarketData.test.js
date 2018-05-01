import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Artists } from "../../Fixtures/Components"
import { ArtistMarketData } from "../Components/ArtistMarketData"

describe("Artist Market Data", () => {
  it("#hasGalleryData is true if artist has gallery in allowed category", () => {
    const hasData = mount(<ArtistMarketData {...Artists[0]} />)
    const noData = mount(<ArtistMarketData {...Artists[2]} />)

    expect(hasData.instance().hasGalleryData()).toBe(true)
    expect(noData.instance().hasGalleryData()).toBeFalsy()
  })

  it("#hasCollections is true if artist has collections length", () => {
    const hasData = mount(<ArtistMarketData {...Artists[0]} />)
    const noData = mount(<ArtistMarketData {...Artists[2]} />)

    expect(hasData.instance().hasCollections()).toBe(true)
    expect(noData.instance().hasCollections()).toBeFalsy()
  })

  it("#hasAuctionRecord is true if artist has auctionResults", () => {
    const hasData = mount(<ArtistMarketData {...Artists[0]} />)
    const noData = mount(<ArtistMarketData {...Artists[2]} />)

    expect(hasData.instance().hasAuctionRecord()).toBe(true)
    expect(noData.instance().hasAuctionRecord()).toBeFalsy()
  })

  it("Renders auction record if present", () => {
    const component = mount(<ArtistMarketData {...Artists[0]} />)
    expect(component.text()).toMatch('$63,312,500 auction record')
  })

  describe("#renderGalleryCategory", () => {
    it("prints single results", () => {
      const component = mount(<ArtistMarketData {...Artists[0]} />)
      expect(component.text()).toMatch('Represented by a blue chip gallery')
    })

    it("prints plural results", () => {
      const component = mount(<ArtistMarketData {...Artists[1]} />)
      expect(component.text()).toMatch(
        'Represented by top established galleries'
      )
    })
  })

  describe("#renderCollections", () => {
    it("prints single results", () => {
      const component = mount(<ArtistMarketData {...Artists[0]} />)
      expect(component.text()).toMatch(
        'In the collection of Museum of Modern Art (MoMA)'
      )
    })

    it("prints plural results", () => {
      const component = mount(<ArtistMarketData {...Artists[3]} />)
      expect(component.text()).toMatch(
        'In the collections of Tate, Museum of Modern Art (MoMA)'
      )
    })
  })
})

