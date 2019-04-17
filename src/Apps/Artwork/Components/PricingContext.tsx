import {
  BarChart,
  BarDescriptor,
  BorderBox,
  Flex,
  Sans,
  Spacer,
} from "@artsy/palette"
import { PricingContext_artwork } from "__generated__/PricingContext_artwork.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { createCollectUrl } from "./../Utils/createCollectUrl"
import { PricingContextModal } from "./PricingContextModal"

interface PricingContextProps {
  artwork: PricingContext_artwork
}

export class PricingContext extends React.Component<PricingContextProps> {
  openCollectPage(minCents, maxCents, category, widthCm, heightCm, artistId) {
    const url = createCollectUrl({
      minCents,
      maxCents,
      category,
      widthCm,
      heightCm,
      artistId,
    })

    if (typeof window !== "undefined") {
      return this.openWindow.bind(this, url)
    }
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.HistogramBar,
    type: Schema.Type.Chart,
    context_module: Schema.ContextModule.PriceContext,
  })
  openWindow(url) {
    window.open(url)
  }

  @track({
    action_type: Schema.ActionType.Hover,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.HistogramBar,
    type: Schema.Type.Chart,
    context_module: Schema.ContextModule.PriceContext,
  })
  barchartHover() {
    console.log("HELLO YOU ARE HOVERING NOW WOOOOO")
    /// I'm just for tracking!
  }

  // TODO: Investigate why metaphysics is returning null instead of zero for minPrice
  render() {
    const { artwork } = this.props

    if (!artwork.pricingContext) {
      return null
    }

    const priceCents = artwork.priceCents.max
      ? (artwork.priceCents.min + artwork.priceCents.max) / 2
      : artwork.priceCents.min
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
                priceCents >= bin.minPriceCents &&
                priceCents < bin.maxPriceCents
              return {
                value: bin.numArtworks,
                label: {
                  title,
                  description: bin.numArtworks + " works",
                },
                onClick: this.openCollectPage(
                  bin.minPriceCents,
                  bin.maxPriceCents,
                  artwork.category,
                  artwork.widthCm,
                  artwork.heightCm,
                  artwork.artists[0].id
                ),
                onHover: this.barchartHover.bind(this),
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

PricingContextFragmentContainer.displayName = "PricingContext"
