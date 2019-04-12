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

  describe("relativeTime", () => {
    it("formats properly when >= 1 day", () => {
      expect(
        relativeTime(moment().add(25, "hours"), moment())
      ).toMatchInlineSnapshot(`"1d"`)
    })

    it("formats properly when >= 1 hours", () => {
      expect(
        relativeTime(moment().add(61, "minutes"), moment())
      ).toMatchInlineSnapshot(`"1h"`)
    })

    it("formats properly when >= 1 minutes", () => {
      expect(
        relativeTime(moment().add(61, "seconds"), moment())
      ).toMatchInlineSnapshot(`"1m"`)
    })

    it("formats properly otherwise", () => {
      expect(
        relativeTime(moment().add(1, "seconds"), moment())
      ).toMatchInlineSnapshot(`"1s"`)
    })
  })

  describe("upcomingLabel", () => {
    it("handles preview sales", () => {
      expect(
        upcomingLabel(
          {
            is_preview: true,
            start_at: moment().add(25, "hours"),
          },
          moment()
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
          upcomingLabel({
            is_live_open: true,
            live_start_at: moment().subtract(1, "minutes"),
          })
        ).toMatchInlineSnapshot(`"In progress"`)
      })

      it("handles upcoming sales", () => {
        const now = "2019-04-16"
        expect(
          upcomingLabel(
            {
              live_start_at: moment(now).add(1, "days"),
            },
            moment(now)
          )
        ).toMatchInlineSnapshot(`"Register by Apr 17"`)
      })

      it("handles upcoming sales with closed registration", () => {
        const now = "2019-04-16"
        expect(
          upcomingLabel(
            {
              is_registration_closed: true,
              live_start_at: moment(now).add(1, "days"),
            },
            moment(now)
          )
        ).toMatchInlineSnapshot(`"Live in 1d"`)
      })

      it("handles upcoming sales the user is registered for", () => {
        expect(
          upcomingLabel({
            registration_status: {},
            live_start_at: moment().add(1, "days"),
          })
        ).toMatchInlineSnapshot(`"Live in 1d"`)
      })
    })
  })
})
