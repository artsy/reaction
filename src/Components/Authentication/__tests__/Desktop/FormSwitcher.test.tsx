import React from "react"
import { mount } from "enzyme"
import { FormSwitcher } from "../../Desktop/FormSwitcher"
import { LoginForm } from "../../Desktop/LoginForm"
import { SignUpForm } from "../../Desktop/SignUpForm"
import { ResetPasswordForm } from "../../Desktop/ResetPasswordForm"
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
        signupIntent={props.signupIntent}
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

    it("reset password form", () => {
      const wrapper = getWrapper({ type: ModalType.resetPassword })
      expect(wrapper.find(ResetPasswordForm).length).toEqual(1)
    })
  })

  describe("Analytics", () => {
    it("tracks login impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      const wrapper = getWrapper({ type: ModalType.login, tracking })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "Auth impression",
        type: "login",
      })
    })
    it("tracks reset password impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      const wrapper = getWrapper({ type: ModalType.resetPassword, tracking })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "Auth impression",
        type: "reset_password",
      })
    })
    it("tracks signup impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      const wrapper = getWrapper({
        type: ModalType.signup,
        tracking,
        signupIntent: "foo",
      })
      expect(tracking.trackEvent).toBeCalledWith({
        action: "Auth impression",
        type: "signup",
        onboarding: true,
        signup_intent: "foo",
      })
    })
  })
})
