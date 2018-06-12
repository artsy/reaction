import React from "react"
import { mount } from "enzyme"
import { ModalManager } from "../../Desktop/ModalManager"
import { LoginForm } from "../../Desktop/LoginForm"

describe("ModalManager", () => {
  it("doesn't render if no type is passed in", () => {
    const wrapper = mount(
      <ModalManager
        submitUrls={{
          login: "/login",
          signup: "/sign_up",
          reset_password: "/reset_password",
        }}
        csrf="CSRF_TOKEN"
      />
    )

    expect(wrapper.children().length).toEqual(0)
  })

  it("renders the right form when a type is passed in", () => {
    const wrapper = mount(
      <ModalManager
        submitUrls={{
          login: "/login",
          signup: "/sign_up",
          reset_password: "/reset_password",
        }}
        csrf="CSRF_TOKEN"
      />
    )

    expect(wrapper.find(LoginForm).exists).toBeTruthy()
  })
})
