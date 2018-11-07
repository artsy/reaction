import { renderUntil } from "DevTools/renderUntil"
import { mount } from "enzyme"
import * as React from "react"
import { MockRelayRenderer } from "../MockRelayRenderer"
import {
  Artwork,
  badQuery,
  query,
  renderToString,
} from "./MockRelayRendererFixtures"

jest.unmock("react-relay")

describe("MockRelayRenderer", () => {
  const originalConsoleError = console.error

  afterAll(() => {
    console.error = originalConsoleError
  })

  it("renders a Relay tree", async () => {
    const tree = await renderUntil(
      wrapper => wrapper.text().includes("Mona Lisa"),
      <MockRelayRenderer
        Component={Artwork}
        query={query}
        mockResolvers={{
          Artwork: () => ({
            title: "Mona Lisa",
            image: {
              url: "http://test/image.jpg",
            },
            artist: null,
          }),
        }}
      />
    )
    expect(tree.html()).toEqual(
      renderToString(
        <div>
          <img src="http://test/image.jpg" />
          <div>Mona Lisa</div>
        </div>
      )
    )
  })

  it("renders an error when child components throw", () => {
    console.error = () => null // MockRelayRenderer prints out error info to the console, let's silence it.
    const tree = mount(
      <MockRelayRenderer
        Component={Artwork}
        query={badQuery}
        mockResolvers={{
          Artwork: () => ({
            title: "Mona Lisa",
            image: {
              url: "http://test/image.jpg",
            },
            artist: null,
          }),
        }}
      />
    )
    tree.setState({
      caughtError: {
        error: new Error("Hey it's an error!"),
        errorInfo: {},
      },
    })
    expect(tree.update().text()).toEqual(
      "Error occurred while rendering Relay component: Error: Hey it's an error!"
    )
  })
})
