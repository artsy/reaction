import { SystemContextProvider } from "Artsy"
import { FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { Artists } from "Components/Publishing/Fixtures/Components"
import { wrapperWithContext } from "Components/Publishing/Fixtures/Helpers"
import { mount } from "enzyme"
import "jest-styled-components"
import PropTypes from "prop-types"
import React from "react"
import { ArtistToolTip, TitleDate } from "../ArtistToolTip"

describe("ArtistToolTip", () => {
  const mediator = {
    trigger: jest.fn(),
  }
  let props

  const getWrapper = (passedProps = props, context = {}) => {
    return mount(
      wrapperWithContext(
        {
          ...context,
          tooltipsData: {
            artists: {
              "nick-mauss": passedProps.artist,
            },
          },
        },
        {
          tooltipsData: PropTypes.object,
          user: PropTypes.object,
          mediator: PropTypes.object,
        },
        <SystemContextProvider user={(context as any).user} mediator={mediator}>
          <ArtistToolTip {...passedProps} />
        </SystemContextProvider>
      )
    )
  }

  beforeEach(() => {
    mediator.trigger.mockClear()
    props = {
      tracking: { trackEvent: jest.fn() },
      artist: Artists[0].artist,
    }
  })

  it("Renders artist data", () => {
    const component = getWrapper()
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
    const component = getWrapper()
    expect(component.text()).toMatch(
      "United States, Abstract Art, 21st Century"
    )
  })

  it("Tracks clicks to artist page", () => {
    const component = getWrapper()
    component
      .find(TitleDate)
      .at(0)
      .simulate("click")

    expect(props.tracking.trackEvent).toBeCalledWith({
      action: "Click",
      context_module: "intext tooltip",
      destination_path: "/artist/nick-mauss",
      flow: "tooltip",
      type: "artist stub",
    })
  })

  describe("Open Auth Modal", () => {
    it("callback gets called when followButton is clicked", () => {
      const context = {
        user: null,
      }
      const component = getWrapper(props, context)
      component.find(FollowArtistButton).simulate("click")

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: "nick-mauss",
        },
        contextModule: "intextTooltip",
        copy: "Sign up to follow Nick Mauss",
        intent: "followArtist",
        mode: "signup",
      })
    })
  })
})
