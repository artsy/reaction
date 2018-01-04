import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import MarketInsights from "../Artist/MarketInsights"

describe("MarketInsights", () => {
  it("renders correctly", () => {
    const artistProps = {
      _id: "4d8b92b34eb68a1b2c0003f4",
      collections: ["Tate", "Museum of Modern Art (MoMA)"],
      highlights: {
        partners: {
          edges: [
            {
              node: {
                name: "Gagosian",
                categories: [
                  { id: "contemporary", name: "Contemporary" },
                  { id: "established", name: "Established" },
                  { id: "modern", name: "Modern" },
                  { id: "painting", name: "Painting" },
                  { id: "blue-chip", name: "Blue Chip" },
                ],
                __id: "UGFydG5lcjpnYWdvc2lhbg==",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTIwM2Y1NWU4N2E1M2ViOWZkMDAwMDcw",
            },
            {
              node: {
                name: "Galerie Thaddaeus Ropac",
                categories: [{ id: "blue-chip", name: "Blue Chip" }],
                __id: "UGFydG5lcjpnYWxlcmllLXRoYWRkYWV1cy1yb3BhYw==",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTU0YWI2MDg3NzZmNzI1MzQyMDYwMDAw",
            },
            {
              node: {
                name: "CARDI GALLERY",
                categories: [
                  { id: "contemporary", name: "Contemporary" },
                  { id: "modern", name: "Modern" },
                  { id: "top-established", name: "Top Established" },
                ],
                __id: "UGFydG5lcjpjYXJkaS1nYWxsZXJ5",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTI3NzgyNDhlYmFkNjRmMGVlMDAwMTkz",
            },
            {
              node: {
                name: "Skarstedt Gallery",
                categories: [{ id: "blue-chip", name: "Blue Chip" }],
                __id: "UGFydG5lcjpza2Fyc3RlZHQtZ2FsbGVyeQ==",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNWE4Zjk4YjNiODFlNDQ4MDAwMDc1",
            },
            {
              node: {
                name: "Anton Kern Gallery",
                categories: [
                  { id: "contemporary", name: "Contemporary" },
                  { id: "established", name: "Established" },
                  { id: "top-established", name: "Top Established" },
                ],
                __id: "UGFydG5lcjphbnRvbi1rZXJuLWdhbGxlcnk=",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNThlZGQyNzViMjRjMzI3MDAwMWNj",
            },
          ],
        },
      },
      auctionResults: {
        edges: [
          {
            node: {
              organization: "Christie's",
              price_realized: { display: "$63m" },
              date: "1987",
              __id: "QXVjdGlvblJlc3VsdDoxMDkzOQ==",
            },
          },
        ],
      },
      __id: "QXJ0aXN0OmFuZHktd2FyaG9s",
    }

    const marketInsights = renderer.create(<MarketInsights artist={artistProps} />).toJSON()
    expect(marketInsights).toMatchSnapshot()
  })
})
