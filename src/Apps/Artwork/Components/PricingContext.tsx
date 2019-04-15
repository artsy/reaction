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
import { createCollectUrl } from "./../Utils/createCollectUrl"

function PricingContext({ artwork }: PricingContextProps) {
  if (!artwork.pricingContext) {
    return null
  }

  const openCollectPage = (
    minCents,
    maxCents,
    category,
    widthCm,
    heightCm,
    artistId
  ) => {
    const url = createCollectUrl({
      minCents,
      maxCents,
      category,
      widthCm,
      heightCm,
      artistId,
    })

    if (typeof window !== "undefined") {
      return () => {
        window.open(url)
      }
    }
  }

  const priceCents = artwork.priceCents.max
    ? (artwork.priceCents.min + artwork.priceCents.max) / 2
    : artwork.priceCents.min

  // TODO: Investigate why metaphysics is returning null instead of zero for minPrice
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
              priceCents >= bin.minPriceCents && priceCents < bin.maxPriceCents
            return {
              value: bin.numArtworks,
              label: {
                title,
                description: bin.numArtworks + " works",
              },
              onClick: openCollectPage(
                bin.minPriceCents,
                bin.maxPriceCents,
                artwork.category,
                artwork.widthCm,
                artwork.heightCm,
                artwork.artists[0].id
              ),
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
  {
    artwork: graphql`
      fragment PricingContext_artwork on Artwork {
        priceCents {
          min
          max
        }
        artists {
          id
        }
        widthCm
        heightCm
        category
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
    `,
  }
)
