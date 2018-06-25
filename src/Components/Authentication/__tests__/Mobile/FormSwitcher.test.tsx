import { mount } from "enzyme"
import React from "react"
import { MobileForgotPasswordForm } from "../../Mobile/ForgotPasswordForm"
import { FormSwitcher } from "../../Mobile/FormSwitcher"
import { MobileLoginForm } from "../../Mobile/LoginForm"
import { MobileSignUpForm } from "../../Mobile/SignUpForm"
import { ModalType } from "../../Types"

describe("FormSwitcher", () => {
  describe("renders states correctly", () => {
    it("login form", () => {
      const wrapper = mount(
        <FormSwitcher type={ModalType.login} handleSubmit={null} />
      )
      expect(wrapper.find(MobileLoginForm).length).toEqual(1)
    })

    it("signup form", () => {
      const wrapper = mount(
        <FormSwitcher type={ModalType.signup} handleSubmit={null} />
      )
      expect(wrapper.find(MobileSignUpForm).length).toEqual(1)
    })

    it("forgot password form", () => {
      const wrapper = mount(
        <FormSwitcher type={ModalType.forgot} handleSubmit={null} />
      )
      expect(wrapper.find(MobileForgotPasswordForm).length).toEqual(1)
    })
  })
})
