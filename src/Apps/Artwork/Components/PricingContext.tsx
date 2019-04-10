import {
  BarChart,
  BarDescriptor,
  BorderBox,
  Flex,
  Sans,
  Spacer,
} from "@artsy/palette"
import { PricingContext_artwork } from "__generated__/PricingContext_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PricingContextModal } from "./PricingContextModal"
interface PricingContextProps {
  artwork: PricingContext_artwork
}

function PricingContext({ artwork }: PricingContextProps) {
  if (!artwork.pricingContext) {
    return null
  }

  return (
    <BorderBox mb={2} flexDirection="column">
      <Sans size="2" weight="medium">
        Price
      </Sans>
      <Flex>
        <Sans size="2">
          Price ranges of {artwork.pricingContext.filterDescription}
        </Sans>
        <PricingContextModal />
      </Flex>
      <Spacer mb={[2, 3]} />
      <BarChart
        minLabel={
          artwork.pricingContext.bins[0].minPrice != null
            ? artwork.pricingContext.bins[0].minPrice
            : "$0"
        }
        maxLabel={
          artwork.pricingContext.bins[artwork.pricingContext.bins.length - 1]
            .maxPrice + "+"
        }
        bars={artwork.pricingContext.bins.map(
          (bin): BarDescriptor => {
            const binMinPrice = bin.minPrice != null ? bin.minPrice : "$0"
            const title = `${binMinPrice}–${bin.maxPrice}`
            const artworkFallsInThisBin =
              artwork.priceCents.min >= bin.minPriceCents &&
              artwork.priceCents.min < bin.maxPriceCents
            return {
              value: bin.numArtworks,
              label: {
                title,
                description: bin.numArtworks + " works",
              },
              highlightLabel: artworkFallsInThisBin
                ? {
                    title,
                    description: "This work",
                  }
                : undefined,
            }
          }
        )}
      />
    </BorderBox>
  )
}

export const PricingContextFragmentContainer = createFragmentContainer(
  PricingContext,
  graphql`
    fragment PricingContext_artwork on Artwork {
      priceCents {
        min
      }
      pricingContext @include(if: $enablePricingContext) {
        filterDescription
        bins {
          maxPrice
          maxPriceCents
          minPrice
          minPriceCents
          numArtworks
        }
      }
    }
  `
)
