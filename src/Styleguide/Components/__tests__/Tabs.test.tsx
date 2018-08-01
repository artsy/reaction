import { mount } from "enzyme"
import React from "react"
import { Tab, Tabs } from "../Tabs"

describe("Tabs", () => {
  it("renders tabs by via name prop", () => {
    const wrapper = mount(
      <Tabs>
        <Tab name="Overview" />
        <Tab name="CV" />
      </Tabs>
    )

    expect(wrapper.html()).toContain("Overview")
    expect(wrapper.html()).toContain("CV")
  })

  it("sets a specific tab on mount", () => {
    const wrapper = mount(
      <Tabs initialTabIndex={1}>
        <Tab name="Overview" />
        <Tab name="CV" />
      </Tabs>
    )

    expect(wrapper.find("ActiveTabButton").html()).toContain("CV")
  })

  it("toggls tab content on click", () => {
    const getWrapper = tabIndex =>
      mount(
        <div>
          <Tabs initialTabIndex={tabIndex}>
            <Tab name="Overview">Overview content</Tab>
            <Tab name="CV">CV content</Tab>
          </Tabs>
        </div>
      )

    expect(getWrapper(0).html()).not.toContain("CV content")
    expect(getWrapper(0).html()).toContain("Overview content")
    expect(getWrapper(1).html()).not.toContain("Overview content")
    expect(getWrapper(1).html()).toContain("CV content")
  })

  it("it triggers an onChange event on tab click", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <Tabs initialTabIndex={1} onChange={spy}>
        <Tab name="Overview" />
        <Tab name="CV" />
      </Tabs>
    )

    expect(spy).not.toHaveBeenCalled()
    wrapper.find("TabButton").simulate("click")
    expect(spy).toHaveBeenCalled()
  })

  it("transforms tabs with custom elements wrappers", () => {
    const TabWrapper = tab => (
      <div className="foundTabWrapper" key={Math.random()}>
        {tab}
      </div>
    )
    const wrapper = mount(
      <Tabs initialTabIndex={1} transformTabBtn={TabWrapper}>
        <Tab name="Overview" />
        <Tab name="CV" />
      </Tabs>
    )

    expect(wrapper.html()).toContain("foundTabWrapper")
  })

  it("allows user to set separator between tabs", () => {
    const TabSeparator = (
      <div className="foundTabSeparator" key={Math.random()}>
        foo|bar
      </div>
    )
    const wrapper = mount(
      <Tabs initialTabIndex={1} separator={TabSeparator}>
        <Tab name="Overview" />
        <Tab name="CV" />
      </Tabs>
    )

    expect(wrapper.html()).toContain("foundTabSeparator")
    expect(wrapper.html()).toContain("foo|bar")
  })
})
