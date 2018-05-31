import React from "react"
import { mount } from "enzyme"
import { FormSwitcher } from "../../Desktop/FormSwitcher"
import { LoginForm } from "../../Desktop/LoginForm"
import { SignUpForm } from "../../Desktop/SignUpForm"
import { ResetPasswordForm } from "../../Desktop/ResetPasswordForm"
import { ModalType } from "../../Types"

describe("FormSwitcher", () => {
  describe("renders states correctly", () => {
    it("login form", () => {
      const wrapper = mount(
        <FormSwitcher type={ModalType.login} handleSubmit={null} />
      )
      expect(wrapper.find(LoginForm).length).toEqual(1)
    })

    it("signup form", () => {
      const wrapper = mount(
        <FormSwitcher type={ModalType.signup} handleSubmit={null} />
      )
      expect(wrapper.find(SignUpForm).length).toEqual(1)
    })

    it("reset password form", () => {
      const wrapper = mount(
        <FormSwitcher type={ModalType.resetPassword} handleSubmit={null} />
      )
      expect(wrapper.find(ResetPasswordForm).length).toEqual(1)
    })
  })
})
