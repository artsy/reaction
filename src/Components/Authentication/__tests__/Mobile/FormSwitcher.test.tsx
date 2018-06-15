import React from "react"
import { mount } from "enzyme"
import { FormSwitcher } from "../../Mobile/FormSwitcher"
import { MobileLoginForm } from "../../Mobile/LoginForm"
import { MobileSignUpForm } from "../../Mobile/SignUpForm"
import { MobileResetPasswordForm } from "../../Mobile/ResetPasswordForm"
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

    it("reset password form", () => {
      const wrapper = mount(
        <FormSwitcher type={ModalType.resetPassword} handleSubmit={null} />
      )
      expect(wrapper.find(MobileResetPasswordForm).length).toEqual(1)
    })
  })
})
