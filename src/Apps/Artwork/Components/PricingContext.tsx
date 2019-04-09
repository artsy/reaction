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
import { data as sd } from "sharify"
import { PricingContextModal } from "./PricingContextModal"
interface PricingContextProps {
  artwork: PricingContext_artwork
}

function PricingContext({ artwork }: PricingContextProps) {
  if (!artwork.pricingContext) {
    return null
  }

  const createUrl = (minCents, maxCents, category, dimensions, artistId) => {
    const categoryHref = "/collect/" + category.toLowerCase()
    const acquirableHref =
      "?page=1&sort=-decayed_merch&acquireable=true&offerable=true&inquireable_only=true"

    // could also do calculations on height and width manually to get cm from inches
    const heightCm = dimensions.cm.split(" × ")[0]
    const widthCm = dimensions.cm.split(" × ")[1].replace(" cm", "")

    const area = parseFloat(heightCm) * parseFloat(widthCm)

    let min
    let max

    if (area < 70 * 70) {
      min = Math.round(40 / 2.54)
      max = Math.round(70 / 2.54)
    } else if (area < 40 * 40) {
      min = 0
      max = Math.round(40 / 2.54)
    } else {
      min = Math.round(70 / 2.54)
      max = "*"
    }

    const sizeHref = "&height=" + min + "-" + max + "&width=" + min + "-" + max

    const minDollars = Math.round(minCents / 100)
    const maxDollars = Math.round(maxCents / 100)
    const priceRangeHref = "&price_range=" + minDollars + "-" + maxDollars
    const artistHref = "&artist_id=" + artistId
    const url =
      sd.APP_URL +
      categoryHref +
      acquirableHref +
      priceRangeHref +
      sizeHref +
      artistHref

    return url
  }

  const openCollectPage = (
    minCents,
    maxCents,
    category,
    dimensions,
    artistId
  ) => {
    const url = createUrl(minCents, maxCents, category, dimensions, artistId)

    console.log("URL!!!", url)

    // (() => {window.open(url)})
    if (typeof window !== "undefined") {
      return () => {
        window.open(url)
      }
    }
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
        minLabel={artwork.pricingContext.bins[0].minPrice}
        maxLabel={
          artwork.pricingContext.bins[artwork.pricingContext.bins.length - 1]
            .maxPrice + "+"
        }
        bars={artwork.pricingContext.bins.map(
          (bin): BarDescriptor => {
            const title = `${bin.minPrice}–${bin.maxPrice}`
            const artworkFallsInThisBin =
              artwork.priceCents.min >= bin.minPriceCents &&
              artwork.priceCents.min < bin.maxPriceCents
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
                artwork.dimensions,
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
  graphql`
    fragment PricingContext_artwork on Artwork {
      priceCents {
        min
      }
      artists {
        id
      }
      dimensions {
        cm
      }
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
  `
)
