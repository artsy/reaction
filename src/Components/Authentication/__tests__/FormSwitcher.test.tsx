import { mount } from "enzyme"
import React from "react"
// import { SmallTextLink } from "../commonElements"
import { ForgotPasswordForm } from "../Desktop/ForgotPasswordForm"
import { LoginForm } from "../Desktop/LoginForm"
import { SignUpForm } from "../Desktop/SignUpForm"
import { FormSwitcher } from "../FormSwitcher"
import { MobileForgotPasswordForm } from "../Mobile/ForgotPasswordForm"
import { MobileLoginForm } from "../Mobile/LoginForm"
import { MobileSignUpForm } from "../Mobile/SignUpForm"
import { ModalType } from "../Types"

describe("FormSwitcher", () => {
  const getWrapper = (props: any = {}) =>
    mount(
      <FormSwitcher
        type={props.type || ModalType.login}
        handleSubmit={jest.fn()}
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
        isMobile={props.isMobile || false}
        isStatic={props.isStatic || false}
        handleTypeChange={jest.fn()}
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

  describe("renders mobile states correctly", () => {
    it("login form", () => {
      const wrapper = getWrapper({ type: ModalType.login, isMobile: true })
      expect(wrapper.find(MobileLoginForm).length).toEqual(1)
    })

    it("signup form", () => {
      const wrapper = getWrapper({ type: ModalType.signup, isMobile: true })
      expect(wrapper.find(MobileSignUpForm).length).toEqual(1)
    })

    it("forgot password form", () => {
      const wrapper = getWrapper({ type: ModalType.forgot, isMobile: true })
      expect(wrapper.find(MobileForgotPasswordForm).length).toEqual(1)
    })
  })

  describe("#handleTypeChange", () => {
    beforeEach(() => {
      window.location.assign = jest.fn()
    })
    // it("redirects to a url if static or mobile", () => {
    //   const wrapper = getWrapper({
    //     type: ModalType.login,
    //     isMobile: true,
    //   })

    //   wrapper
    //     .find(SmallTextLink)
    //     .at(1)
    //     .simulate("click")

    //   expect((window.location.assign as any).mock.calls[0][0]).toEqual(
    //     "/signup?contextModule=Header&copy=Foo%20Bar&destination=%2Fcollect&intent=follow%20artist&redirectTo=%2Ffoo&trigger=timed&triggerSeconds=1"
    //   )
    // })

    xit("sets type and notifies parent component when type is changed", () => {
      const wrapper = getWrapper({
        type: ModalType.login,
      })

      wrapper
        .find("SmallTextLink")
        .at(1)
        .simulate("click")

      expect((wrapper.state() as any).type).toMatch("signup")
      expect(wrapper.props().handleTypeChange).toBeCalled()
    })
  })

  describe("Analytics", () => {
    it("tracks login impressions", () => {
      const tracking = { trackEvent: jest.fn() }
      getWrapper({ type: ModalType.login, tracking })
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
      getWrapper({ type: ModalType.forgot, tracking })
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
      getWrapper({
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
