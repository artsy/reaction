import { mount } from "enzyme"
import "jest-styled-components"
import renderer from "react-test-renderer"
import React from "react"
import { FollowButton } from "../Button"
import FollowArtistButton from "../FollowArtistButton"
import { ContextProvider } from "../../Artsy"


jest.mock('react-relay', () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component
}))
import { commitMutation } from "react-relay"

jest.mock("../../../Utils/track.ts", () => ({
  track: () => jest.fn(c => c)
}))

describe("FollowArtistButton", () => {
  let props
  const getWrapper = (props, currentUser = {}) => {
    return mount(
      <ContextProvider currentUser={currentUser}>
        <FollowArtistButton
          relay={{ environment: '' }}
          {...props}
        />
      </ContextProvider>
    )
  }

  window.location.assign = jest.fn()

  beforeEach(() => {
    props = {
      artist: {
        id: "damon-zucconi",
        __id: "1234",
        is_followed: false,
      },
      onOpenAuthModal: jest.fn(),
      tracking: {
        trackEvent: jest.fn()
      },
    }
  })

  describe("snapshots", () => {
    it("Renders properly", () => {
      const component = renderer
        .create(
          <ContextProvider>
            <FollowArtistButton {...props} />
          </ContextProvider>
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper(props)
      component.find(FollowButton).simulate("click")

      expect(props.onOpenAuthModal.mock.calls[0][0]).toBe("register")
    })

    it("Follows an artist if current user", () => {
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")
      const mutation = commitMutation.mock.calls[0][1].variables.input

      expect(mutation.artist_id).toBe("damon-zucconi")
      expect(mutation.unfollow).toBe(false)
    })

    it("Unfollows an artist if current user", () => {
      props.artist.is_followed = true
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")
      const mutation = commitMutation.mock.calls[1][1].variables.input

      expect(mutation.artist_id).toBe("damon-zucconi")
      expect(mutation.unfollow).toBe(true)
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent.mock.calls[0][0].action).toBe("Followed Artist")
    })

    it("Tracks unfollow click when unfollowing", () => {
      props.artist.is_followed = true
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent.mock.calls[0][0].action).toBe("Unfollowed Artist")
    })

    it("Tracks with custom trackingData if provided", () => {
      props.trackingData = {
        context_module: "tooltip"
      }
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent.mock.calls[0][0].context_module).toBe("tooltip")
    })
  })
})
