import PropTypes from "prop-types"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { wrapperWithContext } from "../../Fixtures/Helpers"
import { Artists } from "../../Fixtures/Components"
import { ArtistToolTip } from "../ArtistToolTip"
import { ContextProvider } from "../../../Artsy"
import { FollowArtistButton } from "../../../FollowButton/FollowArtistButton"

describe("ArtistToolTip", () => {
  const getWrapper = (props, context = {}) => {
    return mount(
      wrapperWithContext(
        {
          ...context,
          tooltipsData: {
            artists: [props.artist],
          },
        },
        {
          tooltipsData: PropTypes.object,
          onOpenAuthModal: PropTypes.func,
          currentUser: PropTypes.object,
        },
        <ContextProvider currentUser={(context as any).currentUser}>
          <ArtistToolTip
            artist={props.artist}
            showMarketData={props.showMarketData}
          />
        </ContextProvider>
      )
    )
  }

  it("Renders artist data", () => {
    const artist = Artists[0].artist
    const component = getWrapper({ artist })

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
      const artist = Artists[0].artist
      const component = getWrapper({ artist, showMarketData: true })

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
      const artist = Artists[2].artist
      const component = getWrapper({ artist, showMarketData: true })

      expect(component.text()).toMatch("Emerging Art")
    })
  })

  describe("Open Auth Modal", () => {
    it("callback gets called when followButton is clicked", () => {
      const artist = Artists[0].artist
      const context = {
        onOpenAuthModal: jest.fn(),
        currentUser: null,
      }
      const component = getWrapper({ artist }, context)
      component.find(FollowArtistButton).simulate("click")

      expect(context.onOpenAuthModal).toBeCalledWith("register")
    })
  })
})
