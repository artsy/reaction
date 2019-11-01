import { Genes_artist } from "__generated__/Genes_artist.graphql"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "Utils/ExtractProps"
import { GenesFragmentContainer as Genes } from "../Genes"

jest.unmock("react-relay")

const render = (
  artist: Omit<Genes_artist, " $refType">,
  extraProps?: Partial<ExtractProps<typeof Genes>>
) =>
  renderRelayTree({
    Component: (props: any) => (
      <Genes
        artist={{
          ...artist,
        }}
        {...props}
        {...extraProps}
      />
    ),
    mockData: {
      artist,
    },
    query: graphql`
      query GenesTestQuery {
        artist(id: "whatevs") {
          ...Genes_artist
        }
      }
    `,
  })

describe("Genes", () => {
  describe("when having less than 8 genes", () => {
    it("renders all genes", async () => {
      const component = await render({
        related: {
          genes: {
            edges: [
              { node: { name: "Classic", href: "/gene/classic" } },
              { node: { name: "Modern", href: "/gene/modern" } },
              { node: { name: "Postmodern", href: "/gene/postmodern" } },
              { node: { name: "Contemporary", href: "/gene/contemporary" } },
            ],
          },
        },
      })
      expect(component.find("Tag").length).toBe(4)
      expect(component.find("MoreTag").length).toBe(0)
    })
  })
  describe("when having more than 8 genes", () => {
    it("renders first 8 genes and more button", async () => {
      const component = await render({
        related: {
          genes: {
            edges: [
              { node: { name: "Classic", href: "/gene/classic" } },
              { node: { name: "Modern", href: "/gene/modern" } },
              {
                node: { name: "Modern revival", href: "/gene/modern-revival" },
              },
              {
                node: { name: "Pre postmodern", href: "/gene/pre-postmodern" },
              },
              { node: { name: "Postmodern", href: "/gene/postmodern" } },
              {
                node: {
                  name: "Post postmodern",
                  href: "/gene/post-postmodern",
                },
              },
              { node: { name: "Hyper modern", href: "/gene/hypermodern" } },
              { node: { name: "Contemporary", href: "/gene/contemporary" } },
              {
                node: {
                  name: "Post contemporary",
                  href: "/gene/post-contemporary",
                },
              },
            ],
          },
        },
      })
      expect(component.find("Tag").length).toBe(8)
      expect(component.find("MoreTag").length).toBe(1)
    })
  })
})
