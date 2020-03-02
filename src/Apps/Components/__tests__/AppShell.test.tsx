import { SystemContextProvider } from "Artsy"
import { buildClientApp } from "Artsy/Router/client"
import { makeAppRoutes } from "Artsy/Router/makeAppRoutes"
import { mount } from "enzyme"
import React from "react"

jest.mock("Components/NavBar/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("Artsy/Router/Boot", () => ({
  Boot: ({ children }) => children,
}))

jest.mock("Artsy/Analytics/useTracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
}))

describe("AppShell", () => {
  it("renders a NavBar", async () => {
    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: makeAppRoutes([
        {
          routes: [
            {
              path: "/foo",
              Component: () => <div />,
            },
          ],
        },
      ]),
    })

    const wrapper = mount(
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )
    expect(wrapper.find("AppShell").length).toEqual(1)
  })

  it("calls the matched routes `prepare` function if found", async done => {
    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: makeAppRoutes([
        {
          routes: [
            {
              path: "/foo",
              Component: () => <div />,
              prepare: () => {
                done()
              },
            },
          ],
        },
      ]),
    })

    mount(
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )
  })
})
