import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { Artists } from "../../Fixtures/Components"
import { ArtistToolTip } from "../Artist"

describe("ArtistToolTip", () => {
  it("Renders artist data", () => {
    const artist = Artists[0]
    const component = mount(<ArtistToolTip {...artist} />)

    expect(component.text()).toMatch(artist.name)
    expect(component.text()).toMatch(artist.formatted_nationality_and_birthday)
    expect(component.text()).toMatch(
      "Nick Mauss makes drawings, prints, and paintings that often"
    )
    expect(component.html()).toMatch(
      "https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FeYGNRMFqIirK-962fSOAsw%2Flarge.jpg"
    )
    expect(component.find("img").length).toBe(2)
  })

  describe("Market Data", () => {
    it("Renders artist data", () => {
      const artist = Artists[0]
      const component = mount(<ArtistToolTip {...artist} showMarketData />)

      expect(component.text()).toMatch(artist.name)
      expect(component.text()).toMatch(
        artist.formatted_nationality_and_birthday
      )
      expect(component.text()).toMatch(artist.collections[0])
      expect(component.text()).toMatch(
        artist.auctionResults.edges[0].node.price_realized.display
      )
      expect(component.text()).toMatch("Represented by a blue chip gallery")
      expect(component.find("img").length).toBe(2)

      expect(component.text()).not.toMatch(
        "Nick Mauss makes drawings, prints, and paintings that often"
      )
    })

    it("Renders categories if no artist data", () => {
      const artist = Artists[2]
      const component = mount(<ArtistToolTip {...artist} showMarketData />)
      // TODO: Use categories instead of bio
      expect(component.text()).toMatch(
        "Diamond Stingily is an American artist whose work"
      )
    })
  })
})
