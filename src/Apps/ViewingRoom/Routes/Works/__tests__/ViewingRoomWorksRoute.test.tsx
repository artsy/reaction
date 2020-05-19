import React from "react"
import { useTracking } from "Artsy/Analytics/useTracking"
import { MockBoot, renderRelayTree } from "DevTools"
import { graphql } from "react-relay"
import { ViewingRoomWorksRoute_Test_QueryRawResponse } from "__generated__/ViewingRoomWorksRoute_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { ViewingRoomWorksRouteFragmentContainer } from "../../Works/ViewingRoomWorksRoute"
import { ViewingRoomWorksRouteFixture } from "Apps/ViewingRoom/__tests__/Fixtures/ViewingRoomWorksRouteFixture"

jest.unmock("react-relay")
jest.mock("Artsy/Analytics/useTracking")
jest.mock("Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "subscription-demo-gg-guy-yanai",
      },
    },
  }),
}))

describe("ViewingRoomWorksRoute", () => {
  const slug = "subscription-demo-gg-guy-yanai"

  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: ViewingRoomWorksRoute_Test_QueryRawResponse = ViewingRoomWorksRouteFixture
  ) => {
    return await renderRelayTree({
      Component: ({ viewingRoom }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <ViewingRoomWorksRouteFragmentContainer viewingRoom={viewingRoom} />
          </MockBoot>
        )
      },
      query: graphql`
        query ViewingRoomWorksRoute_Test_Query($slug: ID!) @raw_response_type {
          viewingRoom(id: $slug) {
            ...ViewingRoomWorksRoute_viewingRoom
          }
        }
      `,
      variables: {
        slug,
      },
      mockData: response,
    })
  }

  it("renders the correct components", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ViewingRoomCarousel").length).toBe(2)
    expect(wrapper.find("ViewingRoomArtworkDetails").length).toBe(2)
  })

  describe("ViewingRoomCarousel", () => {
    let wrapper

    beforeEach(async () => {
      wrapper = (await getWrapper()).find("ViewingRoomCarousel").first()
    })

    it("renders correct components", () => {
      expect(wrapper.find("Carousel").length).toBe(1)
      expect(wrapper.find("Image").length).toBe(3)
      expect(wrapper.find("Arrow").length).toBe(2)
      expect(wrapper.find("ProgressBar").length).toBe(1)
    })
  })

  describe("ViewingRoomArtworkDetails", () => {
    const trackEvent = jest.fn()
    let wrapper

    beforeEach(async () => {
      wrapper = (await getWrapper()).find("ViewingRoomArtworkDetails").first()
      const mockTracking = useTracking as jest.Mock
      mockTracking.mockImplementation(() => {
        return {
          trackEvent,
        }
      })
    })

    it("displays correct text", () => {
      const html = wrapper.html()
      expect(html).toContain("Bill Miles")
      expect(html).toContain("Beep Beep")
      expect(html).toContain("2015")
      expect(html).toContain("some description")
      expect(html).toContain("$500")
    })

    it("displays a buy button", () => {
      expect(wrapper.find("Button").length).toBe(1)
      expect(wrapper.html()).toContain('href="/artwork/bill-miles-beep-beep')
    })

    it("tracks clicks", () => {
      wrapper.find("RouterLink").simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "clickedBuyViewingRoom",
        context_module: "viewingRoomArtworkRail",
        destination_path: "/artwork/bill-miles-beep-beep",
        subject: "Rail",
      })
    })
  })
})
