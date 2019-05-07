import { Serif } from "@artsy/palette"
import { MockBoot } from "DevTools/MockBoot"
import { mount } from "enzyme"
import moment from "moment-timezone"
import React from "react"
import {
  AuctionCard,
  LargeAuctionCard,
  relativeTime,
  SmallAuctionCard,
  upcomingLabel,
} from "../AuctionCard"

describe("AuctionCard", () => {
  const props = {
    src: "https://picsum.photos/200/180/?random",
    headline: "Sotheby’s",
    subHeadline: "Contemporary Day Sale",
    badge: "In progress",
    href: "#",
    isGalleryAuction: false,
    isBenefit: false,
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

  it("Renders blank space instead of subHeadline for gallery auctions", () => {
    props.isGalleryAuction = true
    const small = mount(
      <MockBoot breakpoint="xs">
        <AuctionCard {...props} />
      </MockBoot>
    )
    expect(small.find(Serif).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <AuctionCard {...props} />
      </MockBoot>
    )
    expect(
      large
        .find(Serif)
        .at(1)
        .text()
    ).toEqual("\u00A0")
  })

  it("Renders blank space instead of subHeadline for benefit auctions", () => {
    props.isBenefit = true
    const small = mount(
      <MockBoot breakpoint="xs">
        <AuctionCard {...props} />
      </MockBoot>
    )
    expect(small.find(Serif).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <AuctionCard {...props} />
      </MockBoot>
    )
    expect(
      large
        .find(Serif)
        .at(1)
        .text()
    ).toEqual("\u00A0")
  })

  const tz = "America/New_York"
  const currentTime = "2019-04-16"
  const now = () => moment.tz(currentTime, tz)

  describe("relativeTime", () => {
    it("formats properly when >= 1 day", () => {
      expect(relativeTime(now().add(25, "hours"), now())).toMatchInlineSnapshot(
        `"1d"`
      )
    })

    it("formats properly when >= 1 hours", () => {
      expect(
        relativeTime(now().add(61, "minutes"), now())
      ).toMatchInlineSnapshot(`"1h"`)
    })

    it("formats properly when >= 1 minutes", () => {
      expect(
        relativeTime(now().add(61, "seconds"), now())
      ).toMatchInlineSnapshot(`"1m"`)
    })

    it("formats properly otherwise", () => {
      expect(
        relativeTime(now().add(1, "seconds"), now())
      ).toMatchInlineSnapshot(`"1s"`)
    })
  })

  describe("upcomingLabel", () => {
    it("handles preview sales", () => {
      expect(
        upcomingLabel(
          {
            is_preview: true,
            start_at: now().add(25, "hours"),
          },
          now()
        )
      ).toMatchInlineSnapshot(`"Opens in 1d"`)
    })

    it("handles closed auctions", () => {
      expect(
        upcomingLabel({
          is_closed: true,
        })
      ).toMatchInlineSnapshot(`"Auction closed"`)
    })

    describe("LAI sales", () => {
      it("handles in-progress sales", () => {
        expect(
          upcomingLabel(
            {
              is_live_open: true,
              live_start_at: now().subtract(1, "minutes"),
            },
            now()
          )
        ).toMatchInlineSnapshot(`"In progress"`)
      })

      it("handles upcoming sales", () => {
        expect(
          upcomingLabel(
            {
              live_start_at: now().add(1, "days"),
            },
            now()
          )
        ).toMatchInlineSnapshot(`"Register by Apr 17"`)
      })

      it("handles upcoming sales with closed registration", () => {
        expect(
          upcomingLabel(
            {
              is_registration_closed: true,
              live_start_at: now().add(1, "days"),
            },
            now()
          )
        ).toMatchInlineSnapshot(`"Live in 1d"`)
      })

      it("handles upcoming sales the user is registered for", () => {
        expect(
          upcomingLabel(
            {
              registration_status: {},
              live_start_at: now().add(1, "days"),
            },
            now()
          )
        ).toMatchInlineSnapshot(`"Live in 1d"`)
      })
    })
  })
})
