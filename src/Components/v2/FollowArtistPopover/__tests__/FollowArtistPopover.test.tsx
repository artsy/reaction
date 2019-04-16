import { Breakpoint } from "@artsy/palette"
import { SingleNonFollowedArtist } from "Apps/__tests__/Fixtures/Artists"
import { FollowArtistPopoverFragmentContainer as FollowArtistPopover } from "Components/v2/FollowArtistPopover"
import { MockBoot } from "DevTools"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import React from "react"

describe("Follow Artist Popover", () => {
  let wrapper: ReactWrapper

  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <RelayStubProvider>
        <MockBoot breakpoint={breakpoint}>
          <FollowArtistPopover
            suggested={
              {
                related: {
                  suggested: {
                    edges: [{ node: SingleNonFollowedArtist[0] }],
                  },
                },
              } as any
            }
          />
        </MockBoot>
      </RelayStubProvider>
    )
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.html()).toContain("Francesca DiMattio")
    })
  })
})
