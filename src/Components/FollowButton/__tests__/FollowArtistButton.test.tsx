import { SystemContextProvider } from "Artsy"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { commitMutation } from "react-relay"
import { FollowButton } from "../FollowButton"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "../FollowArtistButton"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Artists } from "Components/Publishing/Fixtures/Components"
import { AnalyticsContext } from "Artsy/Analytics/AnalyticsContext"
import renderer from "react-test-renderer"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("FollowArtistButton", () => {
  const mediator = { trigger: jest.fn() }
  const getWrapper = (passedProps = props, user = { id: "4321" }) => {
    return mount(
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerType: OwnerType.article,
          contextPageOwnerId: "1234",
          contextPageOwnerSlug: "context-article",
        }}
      >
        <SystemContextProvider user={user} mediator={mediator}>
          <FollowArtistButton relay={{ environment: "" }} {...passedProps} />
        </SystemContextProvider>
      </AnalyticsContext.Provider>
    )
  }

  let props
  beforeEach(() => {
    mediator.trigger.mockClear()
    props = {
      artist: {
        is_followed: false,
        counts: { follows: 99 },
        ...Artists[0].artist,
      },
      tracking: { trackEvent: jest.fn() },
      contextModule: ContextModule.intextTooltip,
    }
  })

  describe("snapshots", () => {
    it("Renders properly", () => {
      const component = renderer
        .create(
          <SystemContextProvider>
            <FollowArtistButton {...props} />
          </SystemContextProvider>
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper(props, null)
      component.find(FollowButton).simulate("click")

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "intextTooltip",
        copy: "Sign up to follow Nick Mauss",
        intent: "followArtist",
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: "nick-mauss",
        },
        mode: "signup",
      })
    })

    it("Follows an artist if current user", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[0][1].variables.input

      expect(mutation.artistID).toBe("5955005ceaaedc0017acdd1f")
      expect(mutation.unfollow).toBe(false)
    })

    it("Unfollows an artist if current user", () => {
      props.artist.is_followed = true
      const component = getWrapper()
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[1][1].variables.input

      expect(mutation.artistID).toBe("5955005ceaaedc0017acdd1f")
      expect(mutation.unfollow).toBe(true)
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "followedArtist",
        context_module: "intextTooltip",
        context_owner_id: "1234",
        context_owner_slug: "context-article",
        context_owner_type: "article",
        owner_id: "5955005ceaaedc0017acdd1f",
        owner_slug: "nick-mauss",
        owner_type: "artist",
      })
    })

    it("Tracks unfollow click when unfollowing", () => {
      props.artist.is_followed = true
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "unfollowedArtist",
        context_module: "intextTooltip",
        context_owner_id: "1234",
        context_owner_slug: "context-article",
        context_owner_type: "article",
        owner_id: "5955005ceaaedc0017acdd1f",
        owner_slug: "nick-mauss",
        owner_type: "artist",
      })
    })
  })
})
