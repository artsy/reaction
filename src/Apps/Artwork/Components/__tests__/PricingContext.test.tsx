import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"
import { PricingContextFragmentContainer } from "../PricingContext"

jest.unmock("react-relay")

const mockPricingContext = {
  filterDescription: `small mocks by David Sheldrick`,
  bins: [
    {
      maxPrice: "$88",
      maxPriceCents: 8855,
      minPrice: "$9",
      minPriceCents: 900,
      numArtworks: 67,
    },
    {
      maxPrice: "$168",
      maxPriceCents: 16810,
      minPrice: "$88",
      minPriceCents: 8855,
      numArtworks: 57,
    },
    {
      maxPrice: "$247",
      maxPriceCents: 24765,
      minPrice: "$168",
      minPriceCents: 16810,
      numArtworks: 45,
    },
    {
      maxPrice: "$327",
      maxPriceCents: 32720,
      minPrice: "$247",
      minPriceCents: 24765,
      numArtworks: 17,
    },
  ],
}

describe("PricingContext", () => {
  let enablePricingContext = true
  beforeEach(() => {
    enablePricingContext = true
  })
  function getWrapper(pricingContext: any = mockPricingContext) {
    return renderRelayTree({
      Component: (props: any) => (
        <div>
          <PricingContextFragmentContainer {...props} />
        </div>
      ),
      mockData: {
        artwork: {
          pricingContext,
          priceCents: {
            min: 23455,
          },
        },
      },
      query: graphql`
        query PricingContextTestQuery($enablePricingContext: Boolean!) {
          artwork(id: "unused") {
            ...PricingContext_artwork
          }
        }
      `,
      variables: {
        enablePricingContext,
      },
    })
  }
  it("renders if there is data present", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.text()).toContain(
      "Price ranges of small mocks by David Sheldrick"
    )
  })
  it("renders as null if no data present", async () => {
    const wrapper = await getWrapper(null)
    expect(wrapper.text()).not.toContain(
      "Price ranges of small mocks by David Sheldrick"
    )
  })
  it("renders as null if enablePricingContext is false", async () => {
    enablePricingContext = false
    const wrapper = await getWrapper()
    expect(wrapper.text()).not.toContain(
      "Price ranges of small mocks by David Sheldrick"
    )
  })
})
