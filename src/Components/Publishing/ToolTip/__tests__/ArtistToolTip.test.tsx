import PropTypes from "prop-types"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { wrapperWithContext } from "../../Fixtures/Helpers"
import { Artists } from "../../Fixtures/Components"
import { ArtistToolTip, TitleDate } from "../ArtistToolTip"
import { ContextProvider } from "../../../Artsy"

describe("ArtistToolTip", () => {
  const getWrapper = props => {
    return mount(
      wrapperWithContext(
        {
          tooltipsData: {
            artists: [props.artist],
          },
        },
        {
          tooltipsData: PropTypes.object,
        },
        <ContextProvider>
          <ArtistToolTip {...props} />
        </ContextProvider>
      )
    )
  }

  let props
  beforeEach(() => {
    props = {
      tracking: {
        trackEvent: jest.fn(),
      },
      artist: Artists[0].artist,
      showMarketData: false,
    }
  })

  it("Renders artist data", () => {
    const component = getWrapper(props)

    expect(component.text()).toMatch(props.artist.name)
    expect(component.text()).toMatch(
      props.artist.formatted_nationality_and_birthday
    )
    expect(component.text()).toMatch(
      "Nick Mauss makes drawings, prints, and paintings that often"
    )
    expect(component.html()).toMatch(
      "https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FeYGNRMFqIirK-962fSOAsw%2Flarge.jpg"
    )
    expect(component.find("img").length).toBe(2)
  })

  it("Tracks clicks to artist page", () => {
    const component = getWrapper(props)
    component
      .find(TitleDate)
      .at(0)
      .simulate("click")
    const trackingData = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackingData.action).toBe("Click")
    expect(trackingData.type).toBe("intext_tooltip")
    expect(trackingData.context_module).toBe("tooltip")
    expect(trackingData.destination_path).toBe("/artist/nick-mauss")
  })

  describe("Market Data", () => {
    it("Renders artist data", () => {
      props.showMarketData = true
      const component = getWrapper(props)

      expect(component.text()).toMatch(props.artist.name)
      expect(component.text()).toMatch(
        props.artist.formatted_nationality_and_birthday
      )
      expect(component.text()).toMatch(props.artist.collections[0])
      expect(component.text()).toMatch(
        props.artist.auctionResults.edges[0].node.price_realized.display
      )
      expect(component.text()).toMatch("Represented by a blue chip gallery")
      expect(component.find("img").length).toBe(2)

      expect(component.text()).not.toMatch(
        "Nick Mauss makes drawings, prints, and paintings that often"
      )
    })

    it("Renders categories if no artist data", () => {
      props.artist = Artists[2].artist
      props.showMarketData = true
      const component = getWrapper(props)

      expect(component.text()).toMatch("Emerging Art")
    })
  })
})
