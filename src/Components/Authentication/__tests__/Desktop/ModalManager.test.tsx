import React, { SFC } from "react"
import { mount } from "enzyme"
import { ModalManager } from "../../Desktop/ModalManager"
import { LoginForm } from "../../Desktop/LoginForm"

const Container: SFC<any> = props => {
  let manager
  if (manager) {
    manager.openModal({ mode: props.mode || "" })
  }
  return (
    <ModalManager
      ref={ref => (manager = ref)}
      submitUrls={{
        login: "/login",
        signup: "/sign_up",
        reset_password: "/reset_password",
      }}
      csrf="CSRF_TOKEN"
      handleSubmit={() => {}}
      type={props.mode || ""}
    />
  )
}

describe("ModalManager", () => {
  const getWrapper = (props = {} as any) => {
    return mount(<Container mode={props.mode || ""} />)
  }
  it("doesn't render if no type is passed in", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toBeNull()
  })

  it("renders the right form when a type is passed in", () => {
    const wrapper = getWrapper({ mode: "login" })
    // console.log(manager)
    // manager.openModal({ mode: "login" })
    console.log(wrapper.html())
    expect(wrapper.find(LoginForm).length).toBeGreaterThan(1)
  })

  describe("Analytics", () => {
    it("tracks login impressions", () => {})
    it("tracks reset password impressions", () => {})
    it("tracks signup impressions", () => {})
  })
})
