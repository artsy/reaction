import { Box, Col, Row, Separator, Spacer } from "@artsy/palette"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkApp_artwork } from "__generated__/ArtworkApp_artwork.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

import { ArtistInfoFragmentContainer as ArtistInfo } from "./Components/ArtistInfo"
import { ArtworkBannerFragmentContainer as ArtworkBanner } from "./Components/ArtworkBanner"
import { ArtworkDetailsFragmentContainer as ArtworkDetails } from "./Components/ArtworkDetails"
import { ArtworkImageBrowserFragmentContainer as ArtworkImageBrowser } from "./Components/ArtworkImageBrowser"
import { ArtworkMetaFragmentContainer as ArtworkMeta } from "./Components/ArtworkMeta"
import { ArtworkRelatedArtistsPaginationContainer as RelatedArtists } from "./Components/ArtworkRelatedArtists"
import { ArtworkSidebarFragmentContainer as ArtworkSidebar } from "./Components/ArtworkSidebar"
import { OtherWorksFragmentContainer as OtherWorks } from "./Components/OtherWorks"
import { PricingContextFragmentContainer as PricingContext } from "./Components/PricingContext"

import { SystemContextConsumer } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { Footer } from "Components/v2/Footer"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "Components/v2/RecentlyViewed"
import { TrackingProp } from "react-tracking"
import { data as sd } from "sharify"
import { get } from "Utils/get"
import { Media } from "Utils/Responsive"

export interface Props {
  artwork: ArtworkApp_artwork
  tracking?: TrackingProp
}

declare const window: any
@track()
export class ArtworkApp extends React.Component<Props> {
  // TODO: Move the below tracking, which consists of:
  //
  //  * a custom `track` event when the artwork is acquireable or in an auction
  //  * a custom pageview event including extra metadata
  //
  // into an appropriate wrapper HOC.
  componentDidMount() {
    this.trackPageview()
    this.trackProductView()
    this.trackABTest()
  }

  // TODO: Remove after AB test ends.
  trackABTest() {
    const { tracking } = this.props
    const { CLIENT_NAVIGATION_V2 } = sd

    const experiment = "client_navigation_v2"
    const variation = CLIENT_NAVIGATION_V2
    tracking.trackEvent({
      action_type: Schema.ActionType.ExperimentViewed,
      experiment_id: experiment,
      experiment_name: experiment,
      variation_id: variation,
      variation_name: variation,
      nonInteraction: 1,
    })
  }

  trackProductView() {
    const {
      tracking,
      artwork: { is_acquireable, is_in_auction, internalID },
    } = this.props

    if (is_acquireable || is_in_auction) {
      const trackingData = {
        action_type: Schema.ActionType.ViewedProduct,
        product_id: internalID,
      }
      if (tracking) tracking.trackEvent(trackingData)
    }
  }

  enableIntercomForBuyers(mediator) {
    const {
      artwork: { is_offerable, is_acquireable },
    } = this.props
    mediator &&
      mediator.trigger &&
      mediator.trigger("enableIntercomForBuyers", {
        is_offerable,
        is_acquireable,
      })
  }

  trackPageview() {
    const {
      artwork: { listPrice, availability, is_offerable, is_acquireable },
    } = this.props

    // Pageview
    const properties = {
      path: window.location.pathname,
      acquireable: is_acquireable,
      offerable: is_offerable,
      availability,
      price_listed: !!listPrice,
    }

    if (typeof window.analytics !== "undefined") {
      window.analytics.page(properties, { integrations: { Marketo: false } })
      // Reset timers that track time on page to account for being in a
      // client-side routing context, where these have already been initialized.
      typeof window.desktopPageTimeTrackers !== "undefined" &&
        window.desktopPageTimeTrackers.forEach(tracker => {
          // No need to reset the tracker if we're on the same page.
          if (window.location.pathname !== tracker.path)
            tracker.reset(window.location.pathname)
        })
    }
  }

  renderArtists() {
    const artists = get(this.props, p => p.artwork.artists)

    if (!artists.length) {
      return null
    }

    return (
      <>
        {artists.map((artist, index) => {
          const addSpacer = artists.length > 1 && index < artists.length - 1
          return (
            <React.Fragment key={index}>
              <Row key={artist.id}>
                <Col>
                  <ArtistInfo artist={artist} />
                </Col>
              </Row>
              {addSpacer && <Spacer mb={2} />}
            </React.Fragment>
          )
        })}
      </>
    )
  }

  render() {
    const { artwork } = this.props
    return (
      <AppContainer>
        <HorizontalPadding>
          {/* NOTE: react-head automatically moves these tags to the <head> element */}
          <ArtworkMeta artwork={artwork} />

          <Row>
            <Col sm={8}>
              <ArtworkBanner artwork={artwork} />
              <Spacer mb={2} />
            </Col>
          </Row>

          {/* Mobile */}
          <Media at="xs">
            <Row>
              <Col>
                <ArtworkImageBrowser artwork={artwork} />
                <ArtworkSidebar artwork={artwork} />
                <ArtworkDetails artwork={artwork} />
                <PricingContext artwork={artwork} />
                {this.renderArtists()}
              </Col>
            </Row>
          </Media>

          {/* Desktop */}
          <Media greaterThan="xs">
            <Row>
              <Col sm={8}>
                <Box pr={4}>
                  <ArtworkImageBrowser artwork={artwork} />
                  <ArtworkDetails artwork={artwork} />
                  <PricingContext artwork={artwork} />
                  {this.renderArtists()}
                </Box>
              </Col>
              <Col sm={4}>
                <ArtworkSidebar artwork={artwork} />
              </Col>
            </Row>
          </Media>

          <Row>
            <Col>
              <Box mt={6}>
                <OtherWorks artwork={artwork} />
              </Box>
            </Col>
          </Row>

          {artwork.artist && (
            <Row>
              <Col>
                <RelatedArtists artwork={artwork} />
              </Col>
            </Row>
          )}

          {typeof window !== "undefined" && (
            <LazyLoadComponent threshold={1000}>
              <Row>
                <Col>
                  <RecentlyViewed />
                </Col>
              </Row>
            </LazyLoadComponent>
          )}

          <Row>
            <Col>
              <Separator mt={6} mb={3} />
              <Footer />
            </Col>
          </Row>

          <div id="lightbox-container" />
          <SystemContextConsumer>
            {({ mediator }) => <>{this.enableIntercomForBuyers(mediator)}</>}
          </SystemContextConsumer>
        </HorizontalPadding>
      </AppContainer>
    )
  }
}

export const ArtworkAppFragmentContainer = createFragmentContainer(ArtworkApp, {
  artwork: graphql`
    fragment ArtworkApp_artwork on Artwork {
      slug
      internalID
      is_acquireable: isAcquireable
      is_offerable: isOfferable
      availability
      # FIXME: The props in the component need to update to reflect
      # the new structure for price.
      listPrice {
        ... on PriceRange {
          display
        }
        ... on Money {
          display
        }
      }
      is_in_auction: isInAuction
      artists {
        id
        slug
        ...ArtistInfo_artist
      }
      artist {
        ...ArtistInfo_artist
      }
      ...ArtworkRelatedArtists_artwork
      ...ArtworkMeta_artwork
      ...ArtworkBanner_artwork
      ...ArtworkSidebar_artwork
      ...ArtworkDetails_artwork
      ...ArtworkImageBrowser_artwork
      ...OtherWorks_artwork
      ...PricingContext_artwork
    }
  `,
})
