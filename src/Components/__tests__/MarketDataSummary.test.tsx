import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import MarketDataSummary from "../Artist/MarketDataSummary/MarketDataSummary"

describe("MarketDataSummary", () => {
  it("renders correctly", () => {
    const artistProps = {
      _id: "4d8b92b34eb68a1b2c0003f4",
      collections: ["Tate", "Museum of Modern Art (MoMA)"],
      highlights: {
        partners: {
          edges: [
            {
              node: {
                categories: [
                  { id: "contemporary" },
                  { id: "established" },
                  { id: "modern" },
                  { id: "painting" },
                  { id: "blue-chip" },
                ],
                __id: "UGFydG5lcjpnYWdvc2lhbg==",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTIwM2Y1NWU4N2E1M2ViOWZkMDAwMDcw",
            },
            {
              node: {
                categories: [{ id: "blue-chip" }],
                __id: "UGFydG5lcjpnYWxlcmllLXRoYWRkYWV1cy1yb3BhYw==",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTU0YWI2MDg3NzZmNzI1MzQyMDYwMDAw",
            },
            {
              node: {
                categories: [
                  { id: "contemporary" },
                  { id: "modern" },
                  { id: "top-established" },
                ],
                __id: "UGFydG5lcjpjYXJkaS1nYWxsZXJ5",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTI3NzgyNDhlYmFkNjRmMGVlMDAwMTkz",
            },
            {
              node: {
                categories: [{ id: "blue-chip" }],
                __id: "UGFydG5lcjpza2Fyc3RlZHQtZ2FsbGVyeQ==",
              },
              __id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNWE4Zjk4YjNiODFlNDQ4MDAwMDc1",
            },
            {
              node: {
                categories: [
                  { id: "contemporary" },
                  { id: "established" },
                  { id: "top-established" },
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
              price_realized: { display: "$63m" },
              __id: "QXVjdGlvblJlc3VsdDoxMDkzOQ==",
            },
          },
        ],
      },
      __id: "QXJ0aXN0OmFuZHktd2FyaG9s",
    }

    const marketDataSummary = renderer
      .create(<MarketDataSummary artist={artistProps} />)
      .toJSON()
    expect(marketDataSummary).toMatchSnapshot()
  })
})
