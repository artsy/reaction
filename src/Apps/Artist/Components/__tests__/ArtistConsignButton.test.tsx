import { Breakpoint } from "@artsy/palette"
import { ArtistConsignButtonQueryRawResponse } from "__generated__/ArtistConsignButtonQuery.graphql"
import { useTracking } from "Artsy/Analytics/useTracking"
import { MockBoot, renderRelayTree } from "DevTools"
import { cloneDeep } from "lodash"
import React from "react"
import { graphql } from "react-relay"
import { ArtistConsignButtonFragmentContainer } from "../ArtistConsignButton"

jest.unmock("react-relay")
jest.mock("Artsy/Analytics/useTracking")

describe("ArtistConsignButton", () => {
  const trackEvent = jest.fn()

  const getWrapper = async ({
    breakpoint = "xs",
    response,
  }: {
    breakpoint: Breakpoint
    response: ArtistConsignButtonQueryRawResponse
  }) => {
    return await renderRelayTree({
      Component: ({ artist }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <ArtistConsignButtonFragmentContainer artist={artist} />
          </MockBoot>
        )
      },
      query: graphql`
        query ArtistConsignButton_Test_Query($artistID: String!)
          @raw_response_type {
          artist(id: $artistID) {
            ...ArtistConsignButton_artist
          }
        }
      `,
      variables: {
        artistID: "alex-katz",
      },
      mockData: response,
    })
  }

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Top 20 Button", () => {
    const response = {
      artist: {
        internalID: "fooBarBaz",
        slug: "alex-katz",
        name: "Alex Katz",
        href: "/artist/alex-katz",
        image: {
          cropped: {
            url:
              "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=75&height=66&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbrHdWfNxoereaVk2VOneuw%2Flarge.jpg",
          },
        },
        id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
      },
    }

    const analyticsEvent = {
      context_page: "Artist",
      context_page_owner_id: response.artist.internalID,
      context_page_owner_slug: response.artist.slug,
      context_page_owner_type: "Artist",
      context_module: "ArtistConsignment",
      subject: "Get Started",
    }

    describe("desktop", () => {
      it("renders properly", async () => {
        const wrapper = await getWrapper({ breakpoint: "md", response })
        expect(wrapper.find("Image").length).toEqual(1)
        expect(wrapper.text()).toContain("Sell your Alex Katz")
        expect(wrapper.find("RouterLink").html()).toContain(
          `href="/artist/alex-katz/consign"`
        )
      })

      it("guards against missing imageURL", async () => {
        const responseWithoutImage = cloneDeep(response)
        responseWithoutImage.artist.image = null
        const wrapper = await getWrapper({
          breakpoint: "md",
          response: responseWithoutImage,
        })
        expect(wrapper.find("Image").length).toEqual(0)
      })

      it("tracks clicks", async () => {
        const wrapper = await getWrapper({
          breakpoint: "md",
          response,
        })
        wrapper.find("RouterLink").simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          ...analyticsEvent,
          destination_path: "/artist/alex-katz/consign",
        })
      })
    })

    describe("mobile", () => {
      it("renders properly", async () => {
        const wrapper = await getWrapper({ breakpoint: "xs", response })
        expect(wrapper.find("Image").length).toEqual(1)
        expect(wrapper.text()).toContain("Sell your Alex Katz")
        expect(wrapper.find("RouterLink").html()).toContain(
          `href="/artist/alex-katz/consign"`
        )
      })

      it("guards against missing imageURL", async () => {
        const responseWithoutImage = cloneDeep(response)
        responseWithoutImage.artist.image = null
        const wrapper = await getWrapper({
          breakpoint: "md",
          response: responseWithoutImage,
        })
        expect(wrapper.find("Image").length).toEqual(0)
      })

      it("tracks clicks", async () => {
        const wrapper = await getWrapper({
          breakpoint: "xs",
          response,
        })
        wrapper.find("RouterLink").simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          ...analyticsEvent,
          destination_path: "/artist/alex-katz/consign",
        })
      })
    })
  })

  describe("Default Button", () => {
    const response = {
      artist: {
        internalID: "fooBarBaz",
        slug: "alex-katz",
        name: "Andy Warhol",
        href: "/artist/andy-warhol",
        image: {
          cropped: {
            url:
              "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=75&height=66&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbrHdWfNxoereaVk2VOneuw%2Flarge.jpg",
          },
        },
        id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
      },
    }

    const analyticsEvent = {
      context_page: "Artist",
      context_page_owner_id: response.artist.internalID,
      context_page_owner_slug: response.artist.slug,
      context_page_owner_type: "Artist",
      context_module: "ArtistConsignment",
      subject: "Get Started",
    }

    describe("desktop", () => {
      it("renders properly", async () => {
        const wrapper = await getWrapper({ breakpoint: "md", response })
        expect(wrapper.find("Image").length).toEqual(0)
        expect(wrapper.text()).toContain("Sell art from your collection")
        expect(wrapper.find("RouterLink").html()).toContain(`href="/consign"`)
      })

      it("tracks clicks", async () => {
        const wrapper = await getWrapper({
          breakpoint: "md",
          response,
        })
        wrapper.find("RouterLink").simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          ...analyticsEvent,
          destination_path: "/consign",
        })
      })
    })

    describe("mobile", () => {
      it("renders properly", async () => {
        const wrapper = await getWrapper({ breakpoint: "xs", response })
        expect(wrapper.find("Image").length).toEqual(0)
        expect(wrapper.text()).toContain("Sell art from your collection")
        expect(wrapper.find("RouterLink").html()).toContain(`href="/consign"`)
      })

      it("tracks clicks", async () => {
        const wrapper = await getWrapper({
          breakpoint: "xs",
          response,
        })
        wrapper.find("RouterLink").simulate("click")
        expect(trackEvent).toHaveBeenCalledWith({
          ...analyticsEvent,
          destination_path: "/consign",
        })
      })
    })
  })
})
