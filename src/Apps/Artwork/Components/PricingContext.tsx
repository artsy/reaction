import {
  BarChart,
  BarDescriptor,
  BorderBox,
  Sans,
  Spacer,
} from "@artsy/palette"
import { PricingContext_artwork } from "__generated__/PricingContext_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

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
      <Sans size="2">
        Price ranges of {artwork.pricingContext.filterDescription}
      </Sans>
      <Spacer mb={[2, 3]} />
      <BarChart
        minLabel={artwork.pricingContext.bins[0].minPriceCents}
        maxLabel={
          artwork.pricingContext.bins[artwork.pricingContext.bins.length - 1]
            .maxPriceCents
        }
        bars={artwork.pricingContext.bins.map(
          (bin): BarDescriptor => {
            const title = `${bin.minPriceCents}–${bin.maxPriceCents}`
            const artworkFallsInThisBin =
              artwork.priceCents.min / 100 >= bin.minPriceCents &&
              artwork.priceCents.min / 100 < bin.maxPriceCents
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
      pricingContext {
        filterDescription
        bins {
          maxPriceCents
          minPriceCents
          numArtworks
        }
      }
    }
  `
)
