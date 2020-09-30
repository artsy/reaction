import { ContextModule, OwnerType } from "@artsy/cohesion"
import { SystemContextProvider } from "Artsy"
import { AnalyticsContext } from "Artsy/Analytics/AnalyticsContext"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { commitMutation } from "react-relay"
import { FollowButton } from "../FollowButton"
import { FollowGeneButtonFragmentContainer as FollowGeneButton } from "../FollowGeneButton"
import { Genes } from "Components/Publishing/Fixtures/Components"
import renderer from "react-test-renderer"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("FollowGeneButton", () => {
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
          <FollowGeneButton relay={{ environment: "" }} {...passedProps} />
        </SystemContextProvider>
      </AnalyticsContext.Provider>
    )
  }

  let props
  beforeEach(() => {
    mediator.trigger.mockClear()
    props = {
      gene: {
        is_followed: false,
        ...Genes[0].gene,
      },
      contextModule: ContextModule.intextTooltip,
      tracking: { trackEvent: jest.fn() },
    }
  })

  describe("snapshots", () => {
    it("Renders properly", () => {
      const component = renderer
        .create(
          <SystemContextProvider>
            <FollowGeneButton {...props} />
          </SystemContextProvider>
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper(props, {} as any)
      component.find(FollowButton).simulate("click")

      expect(mediator.trigger).toBeCalledWith("open:auth", {
        contextModule: "intextTooltip",
        copy: "Sign up to follow Capitalist Realism",
        intent: "followGene",
        afterSignUpAction: {
          action: "follow",
          kind: "gene",
          objectId: "capitalist-realism",
        },
        mode: "signup",
      })
    })

    it("Follows an gene if current user", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[0][1].variables.input

      expect(mutation.geneID).toBe("5955005ceaaedc0017acdd1f")
    })

    it("Unfollows an gene if current user", () => {
      props.gene.is_followed = true
      const component = getWrapper()
      component.find(FollowButton).simulate("click")
      const mutation = (commitMutation as any).mock.calls[1][1].variables.input

      expect(mutation.geneID).toBe("5955005ceaaedc0017acdd1f")
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "followedGene",
        context_module: "intextTooltip",
        context_owner_id: "1234",
        context_owner_slug: "context-article",
        context_owner_type: "article",
        owner_id: "5955005ceaaedc0017acdd1f",
        owner_slug: "capitalist-realism",
        owner_type: "gene",
      })
    })

    it("Tracks unfollow click when unfollowing", () => {
      props.gene.is_followed = true
      const component = getWrapper()
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent).toBeCalledWith({
        action: "unfollowedGene",
        context_module: "intextTooltip",
        context_owner_id: "1234",
        context_owner_slug: "context-article",
        context_owner_type: "article",
        owner_id: "5955005ceaaedc0017acdd1f",
        owner_slug: "capitalist-realism",
        owner_type: "gene",
      })
    })
  })
})
