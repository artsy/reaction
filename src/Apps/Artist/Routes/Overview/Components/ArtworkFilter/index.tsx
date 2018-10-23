import { ArtworkFilter_artist } from "__generated__/ArtworkFilter_artist.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { ContextConsumer } from "Artsy/SystemContext"
import { FilterIcon } from "Assets/Icons/FilterIcon"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
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
  filterState?: FilterState
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

  renderFilters({ user, filterState, mediator, hideTopBorder }) {
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

    return (
      <>
        <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
          {!hideTopBorder && <Separator mb={1} />}
          {this.renderWaysToBuy(filterState, mediator, counts)}
        </Flex>

        <Toggle label="Medium" expanded={!this.showZeroState}>
          {this.renderCategory({
            filterState,
            category: "medium",
            counts: mediumAggregation.counts,
            mediator,
          })}
        </Toggle>
        <Toggle
          expanded={filterState.state.partner_id && !this.showZeroState}
          label="Gallery"
        >
          {this.renderCategory({
            filterState,
            category: "partner_id",
            counts: galleryAggregation.counts,
            mediator,
          })}
        </Toggle>

        <Toggle
          expanded={filterState.state.partner_id && !this.showZeroState}
          label="Institution"
        >
          {this.renderCategory({
            filterState,
            category: "partner_id",
            counts: institutionAggregation.counts,
            mediator,
          })}
        </Toggle>
        <Toggle
          expanded={
            filterState.state.major_periods.length > 0 && !this.showZeroState
          }
          label="Time period"
        >
          {this.renderCategory({
            filterState,
            category: "major_periods",
            counts: periodAggregation.counts,
            mediator,
          })}
        </Toggle>
      </>
    )
  }

  renderCategory({ filterState, category, counts, mediator }) {
    const currentFilter =
      category === "major_periods"
        ? filterState.state.major_periods[0]
        : filterState.state[category]

    return counts.map((count, index) => {
      return (
        <Radio
          my={0.3}
          selected={currentFilter === count.id}
          value={count.id}
          onSelect={({ selected }) => {
            if (selected) {
              return filterState.setFilter(category, count.id, mediator)
            } else {
              return filterState.unsetFilter(category, mediator)
            }
          }}
          key={index}
        >
          {count.name}
        </Radio>
      )
    })
  }

  renderWaysToBuy(filterState, mediator, counts) {
    return (
      <React.Fragment>
        <Sans size="2" weight="medium" color="black100" mt={0.3} mb={1}>
          Ways to Buy
        </Sans>
        <Checkbox
          selected={filterState.state.acquireable}
          disabled={!this.existy.hasBuyNowArtworks || this.showZeroState}
          onSelect={value => {
            return filterState.setFilter("acquireable", value, mediator)
          }}
        >
          Buy now
        </Checkbox>
        <Checkbox
          selected={filterState.state.at_auction}
          disabled={!this.existy.hasAuctionArtworks || this.showZeroState}
          onSelect={value => {
            return filterState.setFilter("at_auction", value, mediator)
          }}
        >
          Bid
        </Checkbox>
        <Checkbox
          selected={filterState.state.inquireable_only}
          disabled={!this.existy.hasForSaleArtworks || this.showZeroState}
          onSelect={value => {
            return filterState.setFilter("inquireable_only", value, mediator)
          }}
        >
          Inquire
        </Checkbox>
      </React.Fragment>
    )
  }

  renderZeroState({ user, mediator }) {
    const {
      artist,
      artist: { id, name, is_followed },
    } = this.props

    return (
      <Message>
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
              render={() => <a>Follow {name}</a>}
            />{" "}
            to receive notifications when new works are added.
          </>
        )}
      </Message>
    )
  }

  renderSelect({ filterState, mediator, xs }) {
    return (
      <Flex
        justifyContent={xs ? "space-between" : "flex-end"}
        alignItems="center"
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
          selected={filterState.state.sort}
          onSelect={sort => {
            return filterState.setSort(sort, mediator)
          }}
        />

        {xs && (
          <Button
            size="small"
            mt={-1}
            onClick={() => filterState.showActionSheet(true)}
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
    const { filterState } = this.props

    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Responsive>
              {({ xs, sm, md }) => {
                const hideTopBorder = this.props.hideTopBorder || xs

                const Filters = () =>
                  this.renderFilters({
                    user,
                    filterState,
                    mediator,
                    hideTopBorder,
                  })

                return (
                  <>
                    <Flex>
                      {xs ? (
                        // Mobile
                        filterState.state.showActionSheet && (
                          <MobileActionSheet
                            onClose={() => filterState.showActionSheet(false)}
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
                          filterState,
                          mediator,
                          xs,
                        })}

                        <Spacer mb={2} />

                        {this.showZeroState ? (
                          this.renderZeroState({
                            user,
                            mediator,
                          })
                        ) : (
                          <ArtworkFilter
                            artist={this.props.artist}
                            artistID={this.props.artist.id}
                            columnCount={xs || sm || md ? 2 : 3}
                            filters={filterState.state}
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
      </ContextConsumer>
    )
  }
}

export const ArtworkFilterFragmentContainer = createFragmentContainer(
  (props: Props) => {
    return (
      <Subscribe to={[FilterState]}>
        {(filters: FilterState) => {
          return <Filter filterState={filters} {...props} />
        }}
      </Subscribe>
    )
  },
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
        sort: { type: "String", defaultValue: "-decayed_merch" }
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
