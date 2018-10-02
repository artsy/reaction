import * as React from "react"
import { renderRelayTree } from "../MockRelayRenderer"
import { Artwork, query, renderToString } from "./MockRelayRendererFixtures"

jest.unmock("react-relay")

describe("renderRelayTree", () => {
  it("resolves a promise once the full tree (including nested query renderers) has been rendered", async () => {
    const tree = await renderRelayTree({
      Component: Artwork,
      query,
      mockResolvers: {
        Artwork: () => ({
          title: "Mona Lisa",
          image: {
            url: "http://test/image.jpg",
          },
          artist: {
            id: "leonardo-da-vinci",
          },
        }),
        Artist: () => ({
          name: "Leonardo da Vinci",
        }),
      },
    })
    expect(tree.html()).toEqual(
      renderToString(
        <div>
          <img src="http://test/image.jpg" />
          <div>Mona Lisa</div>
          <div>Leonardo da Vinci</div>
        </div>
      )
    )
  })

  it("resolves a promise once the optional `until` callback matches", async () => {
    class Component extends React.Component {
      state = {
        data: "",
      }

      componentDidMount() {
        setTimeout(() => {
          this.setState({ data: "ohai" })
        }, 1000)
      }

      render() {
        return (
          <div>
            <div className="much-later">{this.state.data}</div>
            <div>{this.props.children}</div>
          </div>
        )
      }
    }

    const tree = await renderRelayTree({
      until: wrapper => wrapper.find(".much-later").text().length > 0,
      Component: Artwork,
      query,
      mockResolvers: {
        Artwork: () => ({
          title: "Mona Lisa",
          image: {
            url: "http://test/image.jpg",
          },
        }),
      },
      wrapper: renderer => <Component>{renderer}</Component>,
    })
    expect(tree.find(".much-later").text()).toEqual("ohai")
  })
})
