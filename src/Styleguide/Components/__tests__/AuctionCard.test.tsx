import { MockBoot } from "Artsy"
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
      <MockBoot breakpoint="xs">
        <AuctionCard {...props} />
      </MockBoot>
    )
    expect(small.find(SmallAuctionCard).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <AuctionCard {...props} />
      </MockBoot>
    )
    expect(large.find(LargeAuctionCard).length).toEqual(1)
  })
})
