/**
 * @jest-environment node
 */

import { ContextConsumer } from "Artsy"
import { buildServerApp, Resolve } from "Artsy/Router/buildServerApp"
import { render } from "enzyme"
import React from "react"
import { Title } from "react-head"

jest.mock("loadable-components/server", () => ({
  getLoadableState: () =>
    Promise.resolve({
      getScriptTag: () => "__LOADABLE_STATE__",
    }),
}))

const defaultComponent = () => <div>hi!</div>

describe("buildServerApp", () => {
  const getWrapper = async ({
    url = "/",
    Component = defaultComponent,
    options = {},
  } = {}) => {
    const { ServerApp, status, headTags } = (await buildServerApp({
      routes: [
        {
          path: "/",
          Component,
        },
      ],
      url,
      ...options,
    })) as Resolve

    return {
      wrapper: render(<ServerApp />),
      status,
      headTags,
    }
  }

  it("resolved with a <ServerApp /> component", async () => {
    const { wrapper } = await getWrapper()
    expect(wrapper.html()).toContain("<div>hi!</div>")
  })

  it("bootstraps relay and loadable-components SSR data", async () => {
    const { wrapper } = await getWrapper()
    expect(wrapper.html()).toContain("__RELAY_BOOTSTRAP__")
    expect(wrapper.html()).toContain("__LOADABLE_STATE__")
  })

  it("resolves with a 200 status if url matches request", async () => {
    const { status } = await getWrapper({ url: "/" })
    expect(status).toEqual(200)
  })

  it("resolves with a 404 status if url does not match request", async () => {
    const { status } = await getWrapper({ url: "/bad-url" })
    expect(status).toEqual(404)
  })

  it("resolves with headTags if react-head components present", async () => {
    const { headTags } = await getWrapper({
      Component: () => <Title>test</Title>,
    })
    // Enzyme won't render the right results for the title for whatever reason
    // It renders fine with renderToString though. ¯\_(ツ)_/¯
    expect(headTags[0].type).toBe("title")
    expect(headTags[0].props.children).toBe("test")
  })

  it("passes items along in context option", async done => {
    const HomeApp = () => {
      return (
        <ContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "foo",
              "initialMatchingMediaQueries",
              "mediator",
              "relayEnvironment",
              "routes",
              "user",
            ])
            setImmediate(done)
            return <div />
          }}
        </ContextConsumer>
      )
    }

    await getWrapper({
      Component: HomeApp,
      options: {
        context: {
          foo: "bar",
          mediator: {
            trigger: jest.fn(),
          },
        },
      },
    })
  })
})
