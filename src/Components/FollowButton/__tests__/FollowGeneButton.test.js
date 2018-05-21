import { mount } from "enzyme"
import "jest-styled-components"
import renderer from "react-test-renderer"
import React from "react"
import { FollowButton } from "../Button"
import FollowGeneButton from "../FollowGeneButton"
import { ContextProvider } from "../../Artsy"


jest.mock('react-relay', () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component
}))
import { commitMutation } from "react-relay"

jest.mock("../../../Utils/track.ts", () => ({
  track: () => jest.fn(c => c)
}))

describe("FollowGeneButton", () => {
  let props
  const getWrapper = (props, currentUser = {}) => {
    return mount(
      <ContextProvider currentUser={currentUser}>
        <FollowGeneButton
          relay={{ environment: '' }}
          {...props}
        />
      </ContextProvider>
    )
  }

  window.location.assign = jest.fn()

  beforeEach(() => {
    props = {
      tracking: {
        trackEvent: jest.fn()
      },
      gene: {
        id: "modernism",
        __id: "1234",
        is_followed: false,
      }
    }
  })

  describe("snapshots", () => {
    it("Renders properly", () => {
      const component = renderer
        .create(
          <ContextProvider>
            <FollowGeneButton {...props} />
          </ContextProvider>
        )
        .toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    it("Redirects to login if no current user", () => {
      const component = getWrapper(props)
      component.find(FollowButton).simulate("click")

      expect(window.location.assign.mock.calls[0][0]).toBe('/login')
    })

    it("Follows an gene if current user", () => {
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")
      const mutation = commitMutation.mock.calls[0][1].variables.input

      expect(mutation.gene_id).toBe("modernism")
      expect(mutation.unfollow).toBe(false)
    })

    it("Unfollows an artist if current user", () => {
      props.gene.is_followed = true
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")
      const mutation = commitMutation.mock.calls[1][1].variables.input

      expect(mutation.gene_id).toBe("modernism")
      expect(mutation.unfollow).toBe(true)
    })

    it("Tracks follow click when following", () => {
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent.mock.calls[0][0].action).toBe("Followed Gene")
    })

    it("Tracks unfollow click when unfollowing", () => {
      props.gene.is_followed = true
      const component = getWrapper(props, { id: "1234" })
      component.find(FollowButton).simulate("click")

      expect(props.tracking.trackEvent.mock.calls[0][0].action).toBe("Unfollowed Gene")
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
