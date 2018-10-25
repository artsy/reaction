import { ContextProvider } from "Artsy"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { commitMutation } from "react-relay"
import { FollowButtonDeprecated } from "../ButtonDeprecated"
import { FollowGeneButtonFragmentContainer as FollowGeneButton } from "../FollowGeneButton"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
}))

describe("FollowGeneButton", () => {
  const getWrapper = (props = {}, user = {}) => {
    return mount(
      <ContextProvider user={user}>
        <FollowGeneButton relay={{ environment: "" }} {...props} />
      </ContextProvider>
    )
  }

  window.location.assign = jest.fn()

  let testProps
  beforeEach(() => {
    testProps = {
      gene: { id: "modernism", __id: "1234", is_followed: false },
      onOpenAuthModal: jest.fn(),
      tracking: { trackEvent: jest.fn() },
    }
  })

  // FIXME: Reenable when React 16.4.5 is release
  // https://github.com/facebook/react/issues/13150#issuecomment-411134477

  //
  // describe("snapshots", () => {
  //   it("Renders properly", () => {
  //     const component = renderer
  //       .create(
  //         <ContextProvider>
  //           <FollowGeneButton {...testProps} />
  //         </ContextProvider>
  //       )
  //       .toJSON()
  //     expect(component).toMatchSnapshot()
  //   })
  // })

  describe("unit", () => {
    it("Calls #onOpenAuthModal if no current user", () => {
      const component = getWrapper(testProps)
      component.find(FollowButtonDeprecated).simulate("click")
      const args = testProps.onOpenAuthModal.mock.calls[0]

      expect(args[0]).toBe("register")
      expect(args[1].contextModule).toBe("intext tooltip")
      expect(args[1].intent).toBe("follow gene")
      expect(args[1].copy).toBe("Sign up to follow categories")
    })

    it("Follows an gene if current user", () => {
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")
      const mutation = (commitMutation as any).mock.calls[0][1].variables.input

      expect(mutation.gene_id).toBe("modernism")
    })

    it("Unfollows an gene if current user", () => {
      testProps.gene.is_followed = true
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")
      const mutation = (commitMutation as any).mock.calls[1][1].variables.input

      expect(mutation.gene_id).toBe("modernism")
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")

      expect(testProps.tracking.trackEvent.mock.calls[0][0].action).toBe(
        "Followed Gene"
      )
    })

    it("Tracks unfollow click when unfollowing", () => {
      testProps.gene.is_followed = true
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")

      expect(testProps.tracking.trackEvent.mock.calls[0][0].action).toBe(
        "Unfollowed Gene"
      )
    })

    it("Tracks with custom trackingData if provided", () => {
      testProps.trackingData = { contextModule: "tooltip" }
      const component = getWrapper(testProps, { id: "1234" })
      component.find(FollowButtonDeprecated).simulate("click")

      expect(testProps.tracking.trackEvent.mock.calls[0][0].contextModule).toBe(
        "tooltip"
      )
    })
  })
})
