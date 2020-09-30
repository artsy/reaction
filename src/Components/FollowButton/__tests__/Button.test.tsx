import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { FollowButton } from "../FollowButton"

describe("FollowButton", () => {
  const getWrapper = _props => {
    return mount(<FollowButton {..._props} />)
  }

  let props = {
    handleFollow: jest.fn(),
    isFollowed: false,
  }

  describe("snapshots", () => {
    it("Renders FollowButton properly", () => {
      const component = renderer.create(<FollowButton {...props} />).toJSON()
      expect(component).toMatchSnapshot()
    })
  })

  describe("unit", () => {
    beforeEach(() => {
      props = {
        handleFollow: jest.fn(),
        isFollowed: false,
      }
    })

    describe("CTA text", () => {
      it("Reads 'follow' if isFollowed is false", () => {
        const component = getWrapper(props)
        expect(component.text()).toMatch("Follow")
      })

      it("Reads 'Following' if props.isFollowed", () => {
        props.isFollowed = true
        const component = getWrapper(props)
        expect(component.text()).toMatch("Following")
      })

      it("Reads 'Unfollow' if props.isFollowed and state.showUnfollow", () => {
        props.isFollowed = true
        const component = getWrapper(props)
        component.simulate("mouseEnter")
        expect(component.text()).toMatch("Unfollow")
      })
    })

    it("Calls props.handleFollow onClick", () => {
      const component = getWrapper(props)
      component.simulate("click")
      expect(props.handleFollow).toBeCalled()
    })
  })
})
