import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { ContextConsumer } from "Artsy/SystemContext"
import { FilterIcon } from "Assets/Icons/FilterIcon"
import FollowArtistButton from "Components/FollowButton/FollowArtistButton"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Toggle } from "Styleguide/Components"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"
import { ArtworkFilterRefetchContainer as ArtworkFilter } from "./ArtworkFilterRefetch"
import { MobileActionSheet } from "./MobileActionSheet"

import {
  Box,
  Button,
  Checkbox,
  color,
  Flex,
  Message,
  Radio,
  Sans,
  Separator,
  SmallSelect,
  Spacer,
} from "@artsy/palette"

interface Props {
  artist: ArtworkFilter_artist
  hideTopBorder?: boolean
}

class Filter extends Component<Props> {
  static defaultProps = {
    hideTopBorder: false,
  }

  get existy() {
    const { artist } = this.props

    return {
      hasForSaleArtworks: artist.counts.for_sale_artworks > 0,
      hasBuyNowArtworks: artist.counts.ecommerce_artworks > 0,
      hasAuctionArtworks: artist.counts.auction_artworks > 0,
      hasArtworks: artist.counts.artworks > 0,
    }
  }

  get showZeroState() {
    return !this.existy.hasArtworks
  }

  renderFilters({ user, filters, mediator, hideTopBorder }) {
    const { counts } = this.props.artist
    const { aggregations } = this.props.artist.filtered_artworks
    const mediumAggregation = aggregations.find(agg => agg.slice === "MEDIUM")
    const galleryAggregation = aggregations.find(agg => agg.slice === "GALLERY")

    const institutionAggregation = aggregations.find(
      agg => agg.slice === "INSTITUTION"
    )

    const periodAggregation = aggregations.find(
      agg => agg.slice === "MAJOR_PERIOD"
    )

    const enableLabFeature =
      user &&
      user.lab_features &&
      user.lab_features.includes("New Buy Now Flow")

    return (
      <>
        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          {!hideTopBorder && <Separator mb={1} />}
          {enableLabFeature
            ? this.renderWaysToBuy(filters, mediator, counts)
            : this.renderForSaleCheckbox(filters, mediator, counts)}
        </Flex>

        <Toggle label="Medium" expanded={!this.showZeroState}>
          {this.renderCategory({
            filters,
            category: "medium",
            counts: mediumAggregation.counts,
            mediator,
          })}
        </Toggle>
        <Toggle
          expanded={filters.state.partner_id && !this.showZeroState}
          label="Gallery"
        >
          {this.renderCategory({
            filters,
            category: "partner_id",
            counts: galleryAggregation.counts,
            mediator,
          })}
        </Toggle>

        <Toggle
          expanded={filters.state.partner_id && !this.showZeroState}
          label="Institution"
        >
          {this.renderCategory({
            filters,
            category: "partner_id",
            counts: institutionAggregation.counts,
            mediator,
          })}
        </Toggle>
        <Toggle
          expanded={
            filters.state.major_periods.length > 0 && !this.showZeroState
          }
          label="Time period"
        >
          {this.renderCategory({
            filters,
            category: "major_periods",
            counts: periodAggregation.counts,
            mediator,
          })}
        </Toggle>
      </>
    )
  }

  renderCategory({ filters, category, counts, mediator }) {
    const currentFilter =
      category === "major_periods"
        ? filters.state.major_periods[0]
        : filters.state[category]

    return counts.map((count, index) => {
      return (
        <Radio
          my={0.3}
          selected={currentFilter === count.id}
          value={count.id}
          onSelect={({ selected }) => {
            if (selected) {
              return filters.setFilter(category, count.id, mediator)
            } else {
              return filters.unsetFilter(category, mediator)
            }
          }}
          key={index}
        >
          {count.name}
        </Radio>
      )
    })
  }

  renderForSaleCheckbox(filters, mediator, counts) {
    return (
      <Checkbox
        selected={filters.state.for_sale}
        disabled={!this.existy.hasForSaleArtworks || this.showZeroState}
        onSelect={value => {
          return filters.setFilter("for_sale", value, mediator)
        }}
      >
        For sale
      </Checkbox>
    )
  }

  renderWaysToBuy(filters, mediator, counts) {
    return (
      <React.Fragment>
        <Sans size="2" weight="medium" color="black100" mt={0.3} mb={1}>
          Ways to Buy
        </Sans>
        <Checkbox
          selected={filters.state.acquireable}
          disabled={!this.existy.hasBuyNowArtworks || this.showZeroState}
          onSelect={value => {
            return filters.setFilter("acquireable", value, mediator)
          }}
        >
          Buy now
        </Checkbox>
        <Checkbox
          selected={filters.state.at_auction}
          disabled={!this.existy.hasAuctionArtworks || this.showZeroState}
          onSelect={value => {
            return filters.setFilter("at_auction", value, mediator)
          }}
        >
          Bid
        </Checkbox>
        <Checkbox
          selected={filters.state.inquireable_only}
          disabled={!this.existy.hasForSaleArtworks || this.showZeroState}
          onSelect={value => {
            return filters.setFilter("inquireable_only", value, mediator)
          }}
        >
          Inquire
        </Checkbox>
      </React.Fragment>
    )
  }

  renderZeroState({ user, mediator, xs }) {
    const {
      artist,
      artist: { id, name, is_followed },
    } = this.props

    return (
      <Message textSize={xs ? "3t" : "5t"} justifyContent="center">
        There aren’t any works available by the artist at this time.{" "}
        {!is_followed && (
          <>
            <FollowArtistButton
              artist={artist}
              useDeprecatedButtonStyle={false}
              user={user}
              onOpenAuthModal={() => {
                mediator.trigger("open:auth", {
                  mode: "signup",
                  copy: `Sign up to follow ${name}`,
                  signupIntent: "follow artist",
                  afterSignUpAction: {
                    kind: "artist",
                    action: "follow",
                    objectId: id,
                  },
                })
              }}
              render={() => <ZeroStateLink>Follow {name}</ZeroStateLink>}
            />{" "}
            to receive notifications when new works are added.
          </>
        )}
      </Message>
    )
  }

  renderSelect({ filters, mediator, xs }) {
    return (
      <Flex
        justifyContent={xs ? "space-between" : "flex-end"}
        alignItems="center"
        mr={2}
      >
        <SmallSelect
          mt="-8px"
          options={[
            {
              value: "-decayed_merch",
              text: "Default",
            },
            {
              value: "-partner_updated_at",
              text: "Recently updated",
            },
            {
              value: "-published_at",
              text: "Recently added",
            },
            {
              value: "-year",
              text: "Artwork year (desc.)",
            },
            {
              value: "year",
              text: "Artwork year (asc.)",
            },
          ]}
          selected={filters.state.sort}
          onSelect={sort => {
            return filters.setSort(sort, mediator)
          }}
        />

        {xs && (
          <Button
            size="small"
            mt={-1}
            onClick={() => filters.showActionSheet(true)}
          >
            <Flex justifyContent="space-between" alignItems="center">
              <FilterIcon fill={color("white100")} />
              <Spacer mr={0.5} />
              Filter
            </Flex>
          </Button>
        )}
      </Flex>
    )
  }

  render() {
    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Subscribe to={[FilterState]}>
              {(filters: FilterState) => {
                return (
                  <Responsive>
                    {({ xs, sm, md }) => {
                      const hideTopBorder = this.props.hideTopBorder || xs

                      const Filters = () =>
                        this.renderFilters({
                          user,
                          filters,
                          mediator,
                          hideTopBorder,
                        })

                      return (
                        <>
                          <Flex>
                            {xs ? (
                              // Mobile
                              filters.state.showActionSheet && (
                                <MobileActionSheet
                                  onClose={() => filters.showActionSheet(false)}
                                >
                                  <Filters />
                                </MobileActionSheet>
                              )
                            ) : (
                              // Desktop
                              <Sidebar width="25%" mr={2}>
                                <Filters />
                              </Sidebar>
                            )}

                            {/* Main Artwork Grid */}
                            <Box width={xs ? "100%" : "75%"}>
                              {!hideTopBorder && <Separator mb={2} mt={-1} />}

                              {this.renderSelect({
                                filters,
                                mediator,
                                xs,
                              })}

                              <Spacer mb={2} />

                              {this.showZeroState ? (
                                this.renderZeroState({
                                  user,
                                  mediator,
                                  xs,
                                })
                              ) : (
                                <ArtworkFilter
                                  artist={this.props.artist}
                                  artistID={this.props.artist.id}
                                  columnCount={xs || sm || md ? 2 : 3}
                                  filters={filters.state}
                                />
                              )}
                            </Box>
                          </Flex>
                        </>
                      )
                    }}
                  </Responsive>
                )
              }}
            </Subscribe>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const ArtworkFilterFragmentContainer = createFragmentContainer(
  Filter,
  graphql`
    fragment ArtworkFilter_artist on Artist
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL, GALLERY, INSTITUTION, MAJOR_PERIOD]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
      ) {
      id
      name
      is_followed
      counts {
        for_sale_artworks
        ecommerce_artworks
        auction_artworks
        artworks
      }
      filtered_artworks(aggregations: $aggregations, size: 0) {
        aggregations {
          slice
          counts {
            name
            id
          }
        }
      }

      ...ArtworkFilterRefetch_artist
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          sort: $sort
          acquireable: $acquireable
          at_auction: $at_auction
          inquireable_only: $inquireable_only
        )

      ...FollowArtistButton_artist
    }
  `
)

const Sidebar = Box

const ZeroStateLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`
