import { mount } from "enzyme"
import React from "react"
import { ForgotPasswordForm } from "../../Desktop/ForgotPasswordForm"
import { FormSwitcher } from "../../Desktop/FormSwitcher"
import { LoginForm } from "../../Desktop/LoginForm"
import { SignUpForm } from "../../Desktop/SignUpForm"
import { ModalType } from "../../Types"

jest.mock("Utils/track.ts", () => ({
  track: () => jest.fn(c => c),
}))

describe("FormSwitcher", () => {
  const getWrapper = (props: any = {}) =>
    mount(
      <FormSwitcher
        type={props.type || ModalType.login}
        handleSubmit={null}
        tracking={props.tracking}
        options={{
          contextModule: "Header",
          copy: "Foo Bar",
          destination: "/collect",
          intent: "follow artist",
          redirectTo: "/foo",
          trigger: "timed",
          triggerSeconds: 1,
        }}
      />
    )

  describe("renders states correctly", () => {
    it("login form", () => {
      const wrapper = getWrapper()
      expect(wrapper.find(LoginForm).length).toEqual(1)
    })

    it("signup form", () => {
      const wrapper = getWrapper({ type: ModalType.signup })
      expect(wrapper.find(SignUpForm).length).toEqual(1)
    })

    it("forgot password form", () => {
      const wrapper = getWrapper({ type: ModalType.forgot })
      expect(wrapper.find(ForgotPasswordForm).length).toEqual(1)
    })
  })

  describe("Analytics", () => {
    it("tracks login impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      const wrapper = getWrapper({ type: ModalType.login, tracking })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "Auth impression",
        auth_redirect: "/foo",
        intent: "follow artist",
        type: "login",
        context_module: "Header",
        modal_copy: "Foo Bar",
        trigger: "timed",
        trigger_seconds: 1,
      })
    })

    it("tracks forgot password impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      const wrapper = getWrapper({ type: ModalType.forgot, tracking })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "Auth impression",
        auth_redirect: "/foo",
        type: "forgot",
        intent: "follow artist",
        context_module: "Header",
        modal_copy: "Foo Bar",
        trigger: "timed",
        trigger_seconds: 1,
      })
    })

    it("tracks signup impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      const wrapper = getWrapper({
        type: ModalType.signup,
        tracking,
      })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "Auth impression",
        type: "signup",
        context_module: "Header",
        onboarding: false,
        auth_redirect: "/foo",
        intent: "follow artist",
        modal_copy: "Foo Bar",
        trigger: "timed",
        trigger_seconds: 1,
      })
    })
  })
})
