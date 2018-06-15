import React from "react"
import { mount } from "enzyme"
import {
  CloseButton,
  DesktopModal,
} from "../../../Desktop/Components/DesktopModal"

jest.mock("Utils/track.ts", () => ({
  track: () => jest.fn(c => c),
}))

describe("DesktopModal", () => {
  const getWrapper = (props: any = {}) =>
    mount(
      <DesktopModal tracking={props.tracking} onClose={jest.fn()}>
        <div>Modal Contents</div>
      </DesktopModal>
    )

  it("login form", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toMatch("Modal Contents")
  })

  describe("Analytics", () => {
    it("tracks close", () => {
      const tracking = { trackEvent: jest.fn() }
      const wrapper = getWrapper({ tracking })
      wrapper.find(CloseButton).simulate("click")
      expect(tracking.trackEvent).toBeCalledWith({
        action: "Click",
        flow: "auth",
        label: "dismiss auth modal",
        type: "dismiss",
      })
    })
  })
})
