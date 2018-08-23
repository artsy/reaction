import { Boot } from "Artsy/Router"
import { mount } from "enzyme"
import React from "react"
import { AuctionCard, LargeAuctionCard, SmallAuctionCard } from "../AuctionCard"

describe("AuctionCard", () => {
  const props = {
    src: "https://picsum.photos/200/180/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
  }

  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <Boot initialMatchingMediaQueries={["xs"]}>
        <AuctionCard {...props} />
      </Boot>
    )
    expect(small.find(SmallAuctionCard).length).toEqual(1)

    const large = mount(
      <Boot initialMatchingMediaQueries={["lg"]}>
        <AuctionCard {...props} />
      </Boot>
    )
    expect(large.find(LargeAuctionCard).length).toEqual(1)
  })
})
