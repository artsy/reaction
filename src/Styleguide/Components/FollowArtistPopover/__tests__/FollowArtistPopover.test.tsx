import { Breakpoint } from "@artsy/palette"
import { SingleNonFollowedArtist } from "Apps/__test__/Fixtures/Artists"
import { MockBoot } from "DevTools"
import { RelayStubProvider } from "DevTools/RelayStubProvider"
import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { FollowArtistPopoverFragmentContainer as FollowArtistPopover } from "Styleguide/Components/FollowArtistPopover"

jest.unmock("react-relay")

describe("Follow Artist Popover", () => {
  let wrapper: ReactWrapper

  const getWrapper = (breakpoint: Breakpoint = "xl") => {
    return mount(
      <RelayStubProvider>
        <MockBoot breakpoint={breakpoint}>
          <FollowArtistPopover
            suggested={{
              related: {
                suggested: {
                  edges: [{ node: SingleNonFollowedArtist[0] }],
                },
              },
            }}
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
