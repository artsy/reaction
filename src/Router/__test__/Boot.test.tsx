import { mount } from "enzyme"
import React from "react"
import { Container, Subscribe } from "unstated"
import { Boot } from "../Boot"

class WelcomeState extends Container<{ welcomeMessage: string }> {}

describe("Boot", () => {
  const system: any = {
    relayEnvironment: false,
  }

  const getWrapper = () => mount(<Boot initialState={[]} system={system} />)

  it("injects global state", () => {
    const App = () => {
      const welcome = new WelcomeState()
      welcome.state = {
        welcomeMessage: "Found global state",
      }
      return (
        <Boot system={system} initialState={[welcome]}>
          <SomeOtherComponent />
        </Boot>
      )
    }

    const SomeOtherComponent = () => {
      return (
        <Subscribe to={[WelcomeState]}>
          {app => {
            return <div>{app.state.welcomeMessage}</div>
          }}
        </Subscribe>
      )
    }

    expect(mount(<App />).html()).toContain("Found global state")
  })

  it("injects ContextProvider", () => {
    expect(getWrapper().find("ContextProvider").length).toEqual(1)
  })

  it("injects ResponsiveProvider", () => {
    expect(getWrapper().find("ResponsiveProvider").length).toEqual(1)
  })

  it("injects GlobalStyles", () => {
    expect(getWrapper().find("GlobalStyles").length).toEqual(1)
  })

  it("injects Theme", () => {
    expect(getWrapper().find("Theme").length).toEqual(1)
  })

  it("injects Grid", () => {
    expect(getWrapper().find("Grid").length).toEqual(1)
  })
})
