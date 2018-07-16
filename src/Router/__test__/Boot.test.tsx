import { mount } from "enzyme"
import React from "react"
import { Subscribe } from "unstated"
import { Boot } from "../Boot"
import { AppState } from "../state"

describe("Boot", () => {
  const system: any = {
    relayEnvironment: false,
  }

  const getWrapper = () => mount(<Boot initialState={[]} system={system} />)

  it("injects global state", () => {
    const App = () => {
      return (
        <Boot
          system={system}
          initialState={[
            new AppState({
              welcomeMessage: "Found global state",
            } as any),
          ]}
        >
          <SomeOtherComponent />
        </Boot>
      )
    }

    const SomeOtherComponent = () => {
      return (
        <Subscribe to={[AppState]}>
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
