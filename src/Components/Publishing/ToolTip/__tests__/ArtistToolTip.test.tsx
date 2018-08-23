import { ContextProvider } from "Artsy/Router/Artsy2"
import { mount } from "enzyme"
import "jest-styled-components"
import PropTypes from "prop-types"
import React from "react"
import track from "react-tracking"
import { FollowArtistButton } from "../../../FollowButton/FollowArtistButton"
import { Artists } from "../../Fixtures/Components"
import { wrapperWithContext } from "../../Fixtures/Helpers"
import { ArtistToolTip, TitleDate } from "../ArtistToolTip"

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

  it("Renders genes if no bio present", () => {
    delete props.artist.blurb
    const component = getWrapper(props)

    expect(component.text()).toMatch(
      "United States, Abstract Art, 21st Century"
    )
  })

  it("Tracks clicks to artist page", () => {
    const component = getWrapper(props)
    component
      .find(TitleDate)
      .at(0)
      .simulate("click")
    const trackingData = props.tracking.trackEvent.mock.calls[0][0]

    expect(trackingData.action).toBe("Click")
    expect(trackingData.flow).toBe("tooltip")
    expect(trackingData.type).toBe("artist stub")
    expect(trackingData.contextModule).toBe("intext tooltip")
    expect(trackingData.destination_path).toBe("/artist/nick-mauss")
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
      const args = context.onOpenAuthModal.mock.calls[0]

      expect(args[0]).toBe("register")
      expect(args[1].contextModule).toBe("intext tooltip")
      expect(args[1].intent).toBe("follow artist")
    })
  })
})
