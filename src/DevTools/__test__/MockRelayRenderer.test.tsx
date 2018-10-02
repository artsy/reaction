import { mount } from "enzyme"
import * as React from "react"
import { MockRelayRenderer } from "../MockRelayRenderer"
import { Artwork, query, renderToString } from "./MockRelayRendererFixtures"

jest.unmock("react-relay")

describe("MockRelayRenderer", () => {
  it("renders a Relay tree", done => {
    const tree = mount(
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
    setTimeout(() => {
      expect(tree.html()).toEqual(
        renderToString(
          <div>
            <img src="http://test/image.jpg" />
            <div>Mona Lisa</div>
          </div>
        )
      )
      done()
    }, 10)
  })
})
