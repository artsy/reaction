/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkApp_artwork$ref } from "./ArtworkApp_artwork.graphql";
export type routes_ArtworkQueryVariables = {
    readonly artworkID: string;
};
export type routes_ArtworkQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": ArtworkApp_artwork$ref;
    } | null;
};
export type routes_ArtworkQuery = {
    readonly response: routes_ArtworkQueryResponse;
    readonly variables: routes_ArtworkQueryVariables;
};



/*
query routes_ArtworkQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...ArtworkApp_artwork
    id
  }
}

fragment ArtworkApp_artwork on Artwork {
  id
  _id
  is_acquireable
  is_offerable
  availability
  price
  is_in_auction
  artists {
    id
    ...ArtistInfo_artist
  }
  artist {
    ...ArtistInfo_artist
    id
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

fragment ArtistInfo_artist on Artist {
  _id
  id
  name
  href
  image {
    cropped(width: 100, height: 100) {
      url
    }
    id
  }
  formatted_nationality_and_birthday
  counts {
    partner_shows
  }
  exhibition_highlights(size: 3) {
    ...SelectedExhibitions_exhibitions
    id
  }
  collections
  highlights {
    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            id
          }
          id
        }
        id
      }
    }
  }
  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized {
          display(format: "0a")
        }
        id
      }
    }
  }
  ...ArtistBio_bio
  ...ArtistMarketInsights_artist
  ...FollowArtistButton_artist
  biography_blurb(format: HTML, partner_bio: true) {
    text
  }
}

fragment ArtworkRelatedArtists_artwork on Artwork {
  id
  artist {
    href
    related {
      artists(kind: MAIN, first: 4, after: "") {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...ArtistCard_artist
            id
            __typename
          }
          cursor
        }
      }
    }
    id
  }
}

fragment ArtworkMeta_artwork on Artwork {
  href
  _id
  date
  artist_names
  sale_message
  partner {
    name
    id
  }
  image_rights
  is_in_auction
  is_acquireable
  is_shareable
  meta_image: image {
    resized(width: 640, height: 640, version: ["large", "medium", "tall"]) {
      width
      height
      url
    }
    id
  }
  meta {
    title
    description(limit: 155)
    long_description: description(limit: 200)
  }
  context {
    __typename
    ... on ArtworkContextFair {
      id
      name
    }
  }
  ...SeoDataForArtwork_artwork
}

fragment ArtworkBanner_artwork on Artwork {
  partner {
    type
    name
    initials
    profile {
      icon {
        url(version: "square140")
        id
      }
      href
      id
    }
    id
  }
  sale {
    is_auction
    isBenefit
    isGalleryAuction
    cover_image {
      url(version: "square")
      id
    }
    id
  }
  artworkContextAuction: context {
    __typename
    ... on ArtworkContextAuction {
      name
      href
      is_auction
      is_closed
      is_open
      live_start_at
      live_url_if_open
    }
    ... on ArtworkContextFair {
      id
    }
  }
  artworkContextFair: context {
    __typename
    ... on ArtworkContextFair {
      name
      href
      isActive
      start_at
      end_at
      profile {
        initials
        icon {
          img: resized(width: 70, height: 70, version: "square") {
            url
          }
          id
        }
        id
      }
      id
    }
  }
  artworkContextPartnerShow: context {
    __typename
    ... on ArtworkContextPartnerShow {
      name
      href
      type
      status
      thumbnail: cover_image {
        img: resized(width: 70, height: 70, version: "square") {
          url
        }
        id
      }
    }
    ... on ArtworkContextFair {
      id
    }
  }
}

fragment ArtworkSidebar_artwork on Artwork {
  is_in_auction
  ...ArtworkSidebarArtists_artwork
  ...ArtworkSidebarMetadata_artwork
  ...ArtworkSidebarAuctionPartnerInfo_artwork
  ...ArtworkSidebarCurrentBidInfo_artwork
  ...ArtworkSidebarBidAction_artwork
  ...ArtworkSidebarCommercial_artwork
  ...ArtworkSidebarPartnerInfo_artwork
  ...ArtworkSidebarExtraLinks_artwork
  sale {
    is_closed
    ...AuctionTimer_sale
    id
  }
}

fragment ArtworkDetails_artwork on Artwork {
  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
  ...ArtworkDetailsAboutTheWorkFromPartner_artwork
  ...ArtworkDetailsAdditionalInfo_artwork
  ...ArtworkDetailsArticles_artwork
  articles(size: 10) {
    id
  }
  literature(format: HTML)
  exhibition_history(format: HTML)
  provenance(format: HTML)
}

fragment ArtworkImageBrowser_artwork on Artwork {
  title
  image_alt: to_s
  image_title
  href
  ...ArtworkActions_artwork
  image {
    id
    url(version: "larger")
    height
    width
  }
  images {
    id
    uri: url(version: ["large"])
    placeholder: resized(width: 30, height: 30, version: "small") {
      url
    }
    aspectRatio: aspect_ratio
    is_zoomable
    is_default
    deepZoom: deep_zoom {
      Image {
        xmlns
        Url
        Format
        TileSize
        Overlap
        Size {
          Width
          Height
        }
      }
    }
  }
}

fragment OtherWorks_artwork on Artwork {
  ...ArtworkContextArtist_artwork
  ...ArtworkContextFair_artwork
  ...ArtworkContextPartnerShow_artwork
  id
  _id
  sale {
    is_closed
    id
  }
  context {
    __typename
    ... on ArtworkContextFair {
      id
    }
  }
}

fragment PricingContext_artwork on Artwork {
  priceCents {
    min
    max
  }
  artists {
    id
  }
  category
  pricingContext {
    appliedFiltersDisplay
    appliedFilters {
      dimension
      category
    }
    bins {
      maxPrice
      maxPriceCents
      minPrice
      minPriceCents
      numArtworks
    }
  }
}

fragment ArtworkContextArtist_artwork on Artwork {
  id
  artist {
    name
    href
    id
  }
  ...ArtistArtworkGrid_artwork_2Lx1mV
  ...PartnerArtworkGrid_artwork_2Lx1mV
  ...RelatedWorksArtworkGrid_artwork
}

fragment ArtworkContextFair_artwork on Artwork {
  id
  artist {
    name
    href
    id
  }
  ...FairArtworkGrid_artwork_2Lx1mV
  ...PartnerShowArtworkGrid_artwork_2Lx1mV
  ...ArtistArtworkGrid_artwork_2Lx1mV
  ...RelatedWorksArtworkGrid_artwork
}

fragment ArtworkContextPartnerShow_artwork on Artwork {
  id
  artist {
    name
    href
    id
  }
  ...PartnerShowArtworkGrid_artwork_2Lx1mV
  ...ArtistArtworkGrid_artwork_2Lx1mV
  ...PartnerArtworkGrid_artwork_2Lx1mV
  ...RelatedWorksArtworkGrid_artwork
}

fragment PartnerShowArtworkGrid_artwork_2Lx1mV on Artwork {
  show {
    href
    name
    artworksConnection(first: 8) {
      ...ArtworkGrid_artworks
      edges {
        node {
          id
        }
      }
    }
    id
  }
}

fragment ArtistArtworkGrid_artwork_2Lx1mV on Artwork {
  id
  artist {
    name
    href
    counts {
      artworks(format: "0,0", label: "work")
    }
    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC) {
      ...ArtworkGrid_artworks
      edges {
        node {
          id
        }
      }
    }
    id
  }
}

fragment PartnerArtworkGrid_artwork_2Lx1mV on Artwork {
  partner {
    artworksConnection(first: 8, for_sale: true, sort: PUBLISHED_AT_DESC) {
      ...ArtworkGrid_artworks
      edges {
        node {
          id
        }
      }
    }
    href
    name
    id
  }
}

fragment RelatedWorksArtworkGrid_artwork on Artwork {
  layers {
    name
    id
  }
  layer {
    name
    artworksConnection(first: 8) {
      ...ArtworkGrid_artworks
      edges {
        node {
          id
        }
      }
    }
    id
  }
}

fragment ArtworkGrid_artworks on ArtworkConnection {
  edges {
    node {
      __id
      id
      href
      image {
        aspect_ratio
        id
      }
      ...GridItem_artwork
    }
  }
}

fragment GridItem_artwork on Artwork {
  _id
  title
  image_title
  image {
    placeholder
    url(version: "large")
    aspect_ratio
    id
  }
  href
  ...Metadata_artwork
  ...Save_artwork
  ...Badge_artwork
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment Save_artwork on Artwork {
  __id
  _id
  id
  is_saved
  title
}

fragment Badge_artwork on Artwork {
  is_biddable
  is_acquireable
  is_offerable
  href
  sale {
    is_preview
    display_timely_at
    id
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message
  cultural_maker
  artists(shallow: true) {
    __id
    href
    name
    id
  }
  collecting_institution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    is_auction
    is_closed
    id
  }
  sale_artwork {
    counts {
      bidder_positions
    }
    highest_bid {
      display
      id
    }
    opening_bid {
      display
    }
    id
  }
}

fragment Contact_artwork on Artwork {
  _id
  href
  is_inquireable
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork {
    highest_bid {
      display
      id
    }
    opening_bid {
      display
    }
    counts {
      bidder_positions
    }
    id
  }
}

fragment FairArtworkGrid_artwork_2Lx1mV on Artwork {
  fair: show(at_a_fair: true) {
    href
    artworksConnection(first: 8) {
      ...ArtworkGrid_artworks
      edges {
        node {
          id
        }
      }
    }
    id
  }
}

fragment ArtworkActions_artwork on Artwork {
  ...Save_artwork
  ...ArtworkSharePanel_artwork
  artists {
    name
    id
  }
  date
  dimensions {
    cm
  }
  href
  id
  image {
    id
    url(version: "larger")
    height
    width
  }
  is_downloadable
  is_hangable
  partner {
    id
  }
  title
  sale {
    is_closed
    is_auction
    id
  }
}

fragment ArtworkSharePanel_artwork on Artwork {
  href
  images {
    url
    id
  }
  artworkMeta: meta {
    share
  }
}

fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
  description(format: HTML)
}

fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
  additional_information(format: HTML)
  sale {
    isBenefit
    isGalleryAuction
    id
  }
  partner {
    _id
    id
    type
    href
    name
    initials
    locations {
      city
      id
    }
    is_default_profile_public
    profile {
      ...FollowProfileButton_profile
      id
      icon {
        url(version: "square140")
        id
      }
    }
  }
}

fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
  series
  publisher
  manufacturer
  image_rights
  framed {
    label
    details
  }
  signatureInfo {
    label
    details
  }
  conditionDescription {
    label
    details
  }
  certificateOfAuthenticity {
    label
    details
  }
}

fragment ArtworkDetailsArticles_artwork on Artwork {
  articles(size: 10) {
    author {
      name
      id
    }
    href
    published_at(format: "MMM Do, YYYY")
    thumbnail_image {
      resized(width: 300) {
        url
      }
      id
    }
    thumbnail_title
    id
  }
}

fragment FollowProfileButton_profile on Profile {
  __id
  id
  is_followed
}

fragment ArtworkSidebarArtists_artwork on Artwork {
  cultural_maker
  artists {
    __id
    _id
    id
    name
    href
    ...FollowArtistButton_artist_2eN9lh
  }
}

fragment ArtworkSidebarMetadata_artwork on Artwork {
  is_biddable
  edition_sets {
    __id
    id
  }
  sale_artwork {
    lot_label
    id
  }
  ...ArtworkSidebarTitleInfo_artwork
  ...ArtworkSidebarSizeInfo_piece
  ...ArtworkSidebarClassification_artwork
}

fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
  _id
  partner {
    _id
    name
    id
  }
  sale_artwork {
    estimate
    id
  }
  sale {
    _id
    is_closed
    is_with_buyers_premium
    id
  }
}

fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
  _id
  sale {
    is_closed
    is_live_open
    id
  }
  sale_artwork {
    is_with_reserve
    reserve_message
    reserve_status
    current_bid {
      display
    }
    counts {
      bidder_positions
    }
    id
  }
  myLotStanding(live: true) {
    active_bid {
      is_winning
      id
    }
    most_recent_bid {
      is_winning
      max_bid {
        display
      }
      id
    }
  }
}

fragment ArtworkSidebarBidAction_artwork on Artwork {
  myLotStanding(live: true) {
    most_recent_bid {
      max_bid {
        cents
      }
      id
    }
  }
  id
  _id
  sale {
    id
    registrationStatus {
      qualified_for_bidding
      id
    }
    is_preview
    is_open
    is_live_open
    is_closed
    is_registration_closed
  }
  sale_artwork {
    increments {
      cents
      display
    }
    id
  }
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  id
  _id
  is_acquireable
  is_inquireable
  is_offerable
  price
  sale_message
  shippingInfo
  shippingOrigin
  edition_sets {
    id
    __id
    is_acquireable
    is_offerable
    sale_message
    ...ArtworkSidebarSizeInfo_piece
  }
}

fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
  partner {
    __id
    name
    href
    locations {
      city
      id
    }
    id
  }
}

fragment ArtworkSidebarExtraLinks_artwork on Artwork {
  _id
  is_in_auction
  is_for_sale
  is_acquireable
  is_inquireable
  artists {
    _id
    is_consignable
    id
  }
  sale {
    _id
    is_closed
    id
  }
}

fragment AuctionTimer_sale on Sale {
  live_start_at
  end_at
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
  dimensions {
    in
    cm
  }
  edition_of
}

fragment ArtworkSidebarTitleInfo_artwork on Artwork {
  title
  date
  medium
}

fragment ArtworkSidebarClassification_artwork on Artwork {
  attribution_class {
    short_description
    id
  }
}

fragment FollowArtistButton_artist_2eN9lh on Artist {
  __id
  id
  is_followed
  counts {
    follows
  }
  ...FollowArtistPopover_suggested
}

fragment FollowArtistPopover_suggested on Artist {
  related {
    suggested(first: 3, exclude_followed_artists: true) {
      edges {
        node {
          __id
          _id
          ...FollowArtistPopoverRow_artist
          id
        }
      }
    }
  }
}

fragment FollowArtistPopoverRow_artist on Artist {
  id
  _id
  __id
  name
  image {
    cropped(width: 45, height: 45) {
      url
    }
    id
  }
}

fragment SeoDataForArtwork_artwork on Artwork {
  href
  date
  is_price_hidden
  is_price_range
  price
  price_currency
  sale_message
  meta_image: image {
    resized(width: 640, height: 640, version: ["large", "medium", "tall"]) {
      width
      height
      url
    }
    id
  }
  meta {
    title
    description(limit: 155)
  }
  partner {
    name
    type
    profile {
      image {
        resized(width: 320, height: 320, version: ["medium"]) {
          url
        }
        id
      }
      id
    }
    id
  }
  artist_names
  availability
  category
  dimensions {
    in
  }
}

fragment ArtistCard_artist on Artist {
  name
  id
  href
  image {
    cropped(width: 400, height: 300) {
      url
    }
    id
  }
  formatted_nationality_and_birthday
  ...FollowArtistButton_artist
}

fragment FollowArtistButton_artist on Artist {
  __id
  id
  is_followed
  counts {
    follows
  }
}

fragment SelectedExhibitions_exhibitions on Show {
  partner {
    __typename
    ... on ExternalPartner {
      name
      id
    }
    ... on Partner {
      name
    }
  }
  name
  start_at(format: "YYYY")
  cover_image {
    cropped(width: 800, height: 600) {
      url
    }
    id
  }
  city
}

fragment ArtistBio_bio on Artist {
  biography_blurb(format: HTML, partner_bio: true) {
    text
    credit
  }
}

fragment ArtistMarketInsights_artist on Artist {
  _id
  collections
  highlights {
    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            id
          }
          id
        }
        id
      }
    }
  }
  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized {
          display(format: "0a")
        }
        organization
        sale_date(format: "YYYY")
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_acquireable",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_offerable",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "image",
  "storageKey": null,
  "args": null,
  "concreteType": "Image",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "cropped",
      "storageKey": "cropped(height:100,width:100)",
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 100
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 100
        }
      ],
      "concreteType": "CroppedImageUrl",
      "plural": false,
      "selections": (v9/*: any*/)
    },
    (v2/*: any*/)
  ]
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "formatted_nationality_and_birthday",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "partner_shows",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "follows",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v15 = [
  (v6/*: any*/),
  (v2/*: any*/)
],
v16 = [
  (v2/*: any*/)
],
v17 = {
  "kind": "ClientExtension",
  "selections": (v16/*: any*/)
},
v18 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "YYYY"
  }
],
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "city",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "exhibition_highlights",
  "storageKey": "exhibition_highlights(size:3)",
  "args": [
    {
      "kind": "Literal",
      "name": "size",
      "value": 3
    }
  ],
  "concreteType": "Show",
  "plural": true,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        (v14/*: any*/),
        {
          "kind": "InlineFragment",
          "type": "ExternalPartner",
          "selections": (v15/*: any*/)
        },
        {
          "kind": "InlineFragment",
          "type": "Partner",
          "selections": [
            (v6/*: any*/)
          ]
        },
        (v17/*: any*/)
      ]
    },
    (v6/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "start_at",
      "args": (v18/*: any*/),
      "storageKey": "start_at(format:\"YYYY\")"
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "cover_image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:600,width:800)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 600
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 800
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": (v9/*: any*/)
        },
        (v2/*: any*/)
      ]
    },
    (v19/*: any*/),
    (v2/*: any*/)
  ]
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "collections",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "highlights",
  "storageKey": null,
  "args": null,
  "concreteType": "ArtistHighlights",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partners",
      "storageKey": "partners(display_on_partner_profile:true,first:10,partner_category:[\"blue-chip\",\"top-established\",\"top-emerging\"],represented_by:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "display_on_partner_profile",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "partner_category",
          "value": [
            "blue-chip",
            "top-established",
            "top-emerging"
          ]
        },
        {
          "kind": "Literal",
          "name": "represented_by",
          "value": true
        }
      ],
      "concreteType": "PartnerArtistConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "PartnerArtistEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Partner",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "categories",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Category",
                  "plural": true,
                  "selections": (v16/*: any*/)
                },
                (v2/*: any*/)
              ]
            },
            (v2/*: any*/)
          ]
        }
      ]
    }
  ]
},
v23 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "auctionResults",
  "storageKey": "auctionResults(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")",
  "args": [
    {
      "kind": "Literal",
      "name": "first",
      "value": 1
    },
    {
      "kind": "Literal",
      "name": "recordsTrusted",
      "value": true
    },
    {
      "kind": "Literal",
      "name": "sort",
      "value": "PRICE_AND_DATE_DESC"
    }
  ],
  "concreteType": "AuctionResultConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionResultEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "AuctionResult",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "price_realized",
              "storageKey": null,
              "args": null,
              "concreteType": "AuctionResultPriceRealized",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "display",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "format",
                      "value": "0a"
                    }
                  ],
                  "storageKey": "display(format:\"0a\")"
                }
              ]
            },
            (v2/*: any*/),
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "organization",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "sale_date",
              "args": (v18/*: any*/),
              "storageKey": "sale_date(format:\"YYYY\")"
            }
          ]
        }
      ]
    }
  ]
},
v24 = {
  "kind": "Literal",
  "name": "format",
  "value": "HTML"
},
v25 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "biography_blurb",
  "storageKey": "biography_blurb(format:\"HTML\",partner_bio:true)",
  "args": [
    (v24/*: any*/),
    {
      "kind": "Literal",
      "name": "partner_bio",
      "value": true
    }
  ],
  "concreteType": "ArtistBlurb",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "text",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "credit",
      "args": null,
      "storageKey": null
    }
  ]
},
v26 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v27 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_followed",
  "args": null,
  "storageKey": null
},
v28 = [
  {
    "kind": "Literal",
    "name": "after",
    "value": ""
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 4
  },
  {
    "kind": "Literal",
    "name": "kind",
    "value": "MAIN"
  }
],
v29 = {
  "kind": "Literal",
  "name": "first",
  "value": 8
},
v30 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v31 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v32 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "image_title",
  "args": null,
  "storageKey": null
},
v33 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v34 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sale_message",
  "args": null,
  "storageKey": null
},
v35 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cultural_maker",
  "args": null,
  "storageKey": null
},
v36 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v37 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v38 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_auction",
  "args": null,
  "storageKey": null
},
v39 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_closed",
  "args": null,
  "storageKey": null
},
v40 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_live_open",
  "args": null,
  "storageKey": null
},
v41 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_open",
  "args": null,
  "storageKey": null
},
v42 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_preview",
  "args": null,
  "storageKey": null
},
v43 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "counts",
  "storageKey": null,
  "args": null,
  "concreteType": "SaleArtworkCounts",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "bidder_positions",
      "args": null,
      "storageKey": null
    }
  ]
},
v44 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v45 = [
  (v44/*: any*/)
],
v46 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_inquireable",
  "args": null,
  "storageKey": null
},
v47 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_saved",
  "args": null,
  "storageKey": null
},
v48 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_biddable",
  "args": null,
  "storageKey": null
},
v49 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "ArtworkEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v26/*: any*/),
          (v2/*: any*/),
          (v7/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "aspect_ratio",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "placeholder",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "large"
                  }
                ],
                "storageKey": "url(version:\"large\")"
              }
            ]
          },
          (v3/*: any*/),
          (v31/*: any*/),
          (v32/*: any*/),
          (v33/*: any*/),
          (v34/*: any*/),
          (v35/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": "artists(shallow:true)",
            "args": (v36/*: any*/),
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              (v26/*: any*/),
              (v7/*: any*/),
              (v6/*: any*/),
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "collecting_institution",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": "partner(shallow:true)",
            "args": (v36/*: any*/),
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              (v2/*: any*/),
              (v37/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              (v38/*: any*/),
              (v39/*: any*/),
              (v2/*: any*/),
              (v40/*: any*/),
              (v41/*: any*/),
              (v42/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "display_timely_at",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale_artwork",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              (v43/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "highest_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkHighestBid",
                "plural": false,
                "selections": [
                  (v44/*: any*/),
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "opening_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkOpeningBid",
                "plural": false,
                "selections": (v45/*: any*/)
              },
              (v2/*: any*/)
            ]
          },
          (v46/*: any*/),
          (v47/*: any*/),
          (v48/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/)
        ]
      }
    ]
  }
],
v50 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "initials",
  "args": null,
  "storageKey": null
},
v51 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "width",
  "args": null,
  "storageKey": null
},
v52 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "height",
  "args": null,
  "storageKey": null
},
v53 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "category",
  "args": null,
  "storageKey": null
},
v54 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "dimensions",
  "storageKey": null,
  "args": null,
  "concreteType": "dimensions",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "in",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cm",
      "args": null,
      "storageKey": null
    }
  ]
},
v55 = {
  "kind": "Literal",
  "name": "version",
  "value": "square"
},
v56 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "live_start_at",
  "args": null,
  "storageKey": null
},
v57 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "end_at",
  "args": null,
  "storageKey": null
},
v58 = {
  "kind": "InlineFragment",
  "type": "ArtworkContextFair",
  "selections": (v16/*: any*/)
},
v59 = [
  {
    "kind": "LinkedField",
    "alias": "img",
    "name": "resized",
    "storageKey": "resized(height:70,version:\"square\",width:70)",
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 70
      },
      (v55/*: any*/),
      {
        "kind": "Literal",
        "name": "width",
        "value": 70
      }
    ],
    "concreteType": "ResizedImageUrl",
    "plural": false,
    "selections": (v9/*: any*/)
  },
  (v2/*: any*/)
],
v60 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "edition_of",
  "args": null,
  "storageKey": null
},
v61 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
},
v62 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_winning",
  "args": null,
  "storageKey": null
},
v63 = [
  (v24/*: any*/)
],
v64 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "label",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "details",
    "args": null,
    "storageKey": null
  }
],
v65 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artworksConnection",
  "storageKey": "artworksConnection(first:8)",
  "args": [
    (v29/*: any*/)
  ],
  "concreteType": "ArtworkConnection",
  "plural": false,
  "selections": (v49/*: any*/)
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ArtworkQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkApp_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ArtworkQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "availability",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "price",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_in_auction",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "counts",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "plural": false,
                "selections": [
                  (v12/*: any*/),
                  (v13/*: any*/)
                ]
              },
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "related",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistRelatedData",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "suggested",
                    "storageKey": "suggested(exclude_followed_artists:true,first:3)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "exclude_followed_artists",
                        "value": true
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3
                      }
                    ],
                    "concreteType": "ArtistConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtistEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": false,
                            "selections": [
                              (v26/*: any*/),
                              (v3/*: any*/),
                              (v2/*: any*/),
                              (v6/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "image",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "cropped",
                                    "storageKey": "cropped(height:45,width:45)",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 45
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 45
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "plural": false,
                                    "selections": (v9/*: any*/)
                                  },
                                  (v2/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_consignable",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artist",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "counts",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "plural": false,
                "selections": [
                  (v12/*: any*/),
                  (v13/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "artworks",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "0,0"
                      },
                      {
                        "kind": "Literal",
                        "name": "label",
                        "value": "work"
                      }
                    ],
                    "storageKey": "artworks(format:\"0,0\",label:\"work\")"
                  }
                ]
              },
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "related",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistRelatedData",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artists",
                    "storageKey": "artists(after:\"\",first:4,kind:\"MAIN\")",
                    "args": (v28/*: any*/),
                    "concreteType": "ArtistConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "pageInfo",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageInfo",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "hasNextPage",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "endCursor",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtistEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/),
                              (v2/*: any*/),
                              (v7/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "image",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "cropped",
                                    "storageKey": "cropped(height:300,width:400)",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 300
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 400
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "plural": false,
                                    "selections": (v9/*: any*/)
                                  },
                                  (v2/*: any*/)
                                ]
                              },
                              (v11/*: any*/),
                              (v26/*: any*/),
                              (v27/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "counts",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "ArtistCounts",
                                "plural": false,
                                "selections": [
                                  (v13/*: any*/)
                                ]
                              },
                              (v14/*: any*/)
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "cursor",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": null,
                    "name": "artists",
                    "args": (v28/*: any*/),
                    "handle": "connection",
                    "key": "ArtworkRelatedArtists_artists",
                    "filters": [
                      "kind"
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworks_connection",
                "storageKey": "artworks_connection(filter:[\"IS_FOR_SALE\"],first:8,sort:\"PUBLISHED_AT_DESC\")",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "filter",
                    "value": [
                      "IS_FOR_SALE"
                    ]
                  },
                  (v29/*: any*/),
                  (v30/*: any*/)
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": (v49/*: any*/)
              }
            ]
          },
          (v7/*: any*/),
          (v33/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "artist_names",
            "args": null,
            "storageKey": null
          },
          (v34/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v2/*: any*/),
              (v37/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "profile",
                "storageKey": null,
                "args": null,
                "concreteType": "Profile",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "resized",
                        "storageKey": "resized(height:320,version:[\"medium\"],width:320)",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 320
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "medium"
                            ]
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 320
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "plural": false,
                        "selections": (v9/*: any*/)
                      },
                      (v2/*: any*/)
                    ]
                  },
                  (v2/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "icon",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "url",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "square140"
                          }
                        ],
                        "storageKey": "url(version:\"square140\")"
                      },
                      (v2/*: any*/)
                    ]
                  },
                  (v7/*: any*/),
                  (v26/*: any*/),
                  (v27/*: any*/)
                ]
              },
              (v50/*: any*/),
              (v3/*: any*/),
              (v26/*: any*/),
              (v7/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "locations",
                "storageKey": null,
                "args": null,
                "concreteType": "Location",
                "plural": true,
                "selections": [
                  (v19/*: any*/),
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_default_profile_public",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworksConnection",
                "storageKey": "artworksConnection(first:8,for_sale:true,sort:\"PUBLISHED_AT_DESC\")",
                "args": [
                  (v29/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "for_sale",
                    "value": true
                  },
                  (v30/*: any*/)
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": (v49/*: any*/)
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "image_rights",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_shareable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "meta_image",
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "resized",
                "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 640
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "large",
                      "medium",
                      "tall"
                    ]
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 640
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "plural": false,
                "selections": [
                  (v51/*: any*/),
                  (v52/*: any*/),
                  (v8/*: any*/)
                ]
              },
              (v2/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "meta",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkMeta",
            "plural": false,
            "selections": [
              (v31/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "description",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "limit",
                    "value": 155
                  }
                ],
                "storageKey": "description(limit:155)"
              },
              {
                "kind": "ScalarField",
                "alias": "long_description",
                "name": "description",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "limit",
                    "value": 200
                  }
                ],
                "storageKey": "description(limit:200)"
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "context",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v14/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextFair",
                "selections": [
                  (v2/*: any*/),
                  (v6/*: any*/)
                ]
              },
              (v17/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_price_hidden",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_price_range",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "price_currency",
            "args": null,
            "storageKey": null
          },
          (v53/*: any*/),
          (v54/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              (v38/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isBenefit",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isGalleryAuction",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "cover_image",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "url",
                    "args": [
                      (v55/*: any*/)
                    ],
                    "storageKey": "url(version:\"square\")"
                  },
                  (v2/*: any*/)
                ]
              },
              (v2/*: any*/),
              (v3/*: any*/),
              (v39/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_with_buyers_premium",
                "args": null,
                "storageKey": null
              },
              (v40/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "registrationStatus",
                "storageKey": null,
                "args": null,
                "concreteType": "Bidder",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "qualified_for_bidding",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ]
              },
              (v42/*: any*/),
              (v41/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_registration_closed",
                "args": null,
                "storageKey": null
              },
              (v56/*: any*/),
              (v57/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artworkContextAuction",
            "name": "context",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v14/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextAuction",
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v38/*: any*/),
                  (v39/*: any*/),
                  (v41/*: any*/),
                  (v56/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "live_url_if_open",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              (v17/*: any*/),
              (v58/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artworkContextFair",
            "name": "context",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v14/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextFair",
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "isActive",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "start_at",
                    "args": null,
                    "storageKey": null
                  },
                  (v57/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "profile",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Profile",
                    "plural": false,
                    "selections": [
                      (v50/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "icon",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": (v59/*: any*/)
                      },
                      (v2/*: any*/)
                    ]
                  },
                  (v2/*: any*/)
                ]
              },
              (v17/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artworkContextPartnerShow",
            "name": "context",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v14/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextPartnerShow",
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v37/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "status",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": "thumbnail",
                    "name": "cover_image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": (v59/*: any*/)
                  }
                ]
              },
              (v17/*: any*/),
              (v58/*: any*/)
            ]
          },
          (v35/*: any*/),
          (v48/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edition_sets",
            "storageKey": null,
            "args": null,
            "concreteType": "EditionSet",
            "plural": true,
            "selections": [
              (v26/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v34/*: any*/),
              (v54/*: any*/),
              (v60/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale_artwork",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lot_label",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "estimate",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_with_reserve",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "reserve_message",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "reserve_status",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "current_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "SaleArtworkCurrentBid",
                "plural": false,
                "selections": (v45/*: any*/)
              },
              (v43/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": [
                  (v61/*: any*/),
                  (v44/*: any*/)
                ]
              }
            ]
          },
          (v31/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "medium",
            "args": null,
            "storageKey": null
          },
          (v60/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "attribution_class",
            "storageKey": null,
            "args": null,
            "concreteType": "AttributionClass",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "short_description",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "myLotStanding",
            "storageKey": "myLotStanding(live:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true
              }
            ],
            "concreteType": "LotStanding",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "active_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  (v62/*: any*/),
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "most_recent_bid",
                "storageKey": null,
                "args": null,
                "concreteType": "BidderPosition",
                "plural": false,
                "selections": [
                  (v62/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "max_bid",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "plural": false,
                    "selections": [
                      (v44/*: any*/),
                      (v61/*: any*/)
                    ]
                  },
                  (v2/*: any*/)
                ]
              }
            ]
          },
          (v46/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shippingInfo",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shippingOrigin",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_for_sale",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": (v63/*: any*/),
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "additional_information",
            "args": (v63/*: any*/),
            "storageKey": "additional_information(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "series",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "publisher",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "manufacturer",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "framed",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v64/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "signatureInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v64/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "conditionDescription",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v64/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "certificateOfAuthenticity",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v64/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "articles",
            "storageKey": "articles(size:10)",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 10
              }
            ],
            "concreteType": "Article",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "author",
                "storageKey": null,
                "args": null,
                "concreteType": "Author",
                "plural": false,
                "selections": (v15/*: any*/)
              },
              (v7/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "published_at",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do, YYYY"
                  }
                ],
                "storageKey": "published_at(format:\"MMM Do, YYYY\")"
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "thumbnail_image",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "resized",
                    "storageKey": "resized(width:300)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 300
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "plural": false,
                    "selections": (v9/*: any*/)
                  },
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "thumbnail_title",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "literature",
            "args": (v63/*: any*/),
            "storageKey": "literature(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "exhibition_history",
            "args": (v63/*: any*/),
            "storageKey": "exhibition_history(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "provenance",
            "args": (v63/*: any*/),
            "storageKey": "provenance(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": "image_alt",
            "name": "to_s",
            "args": null,
            "storageKey": null
          },
          (v32/*: any*/),
          (v26/*: any*/),
          (v47/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": "uri",
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "large"
                    ]
                  }
                ],
                "storageKey": "url(version:[\"large\"])"
              },
              {
                "kind": "LinkedField",
                "alias": "placeholder",
                "name": "resized",
                "storageKey": "resized(height:30,version:\"small\",width:30)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 30
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "small"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 30
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "plural": false,
                "selections": (v9/*: any*/)
              },
              {
                "kind": "ScalarField",
                "alias": "aspectRatio",
                "name": "aspect_ratio",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_zoomable",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_default",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": "deepZoom",
                "name": "deep_zoom",
                "storageKey": null,
                "args": null,
                "concreteType": "DeepZoom",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "Image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "DeepZoomImage",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "xmlns",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Url",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Format",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "TileSize",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "Overlap",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "Size",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "DeepZoomImageSize",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "Width",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "Height",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artworkMeta",
            "name": "meta",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkMeta",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "share",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "larger"
                  }
                ],
                "storageKey": "url(version:\"larger\")"
              },
              (v52/*: any*/),
              (v51/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_downloadable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_hangable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "layers",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkLayer",
            "plural": true,
            "selections": (v15/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "layer",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkLayer",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v65/*: any*/),
              (v2/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "fair",
            "name": "show",
            "storageKey": "show(at_a_fair:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "at_a_fair",
                "value": true
              }
            ],
            "concreteType": "PartnerShow",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v65/*: any*/),
              (v2/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "show",
            "storageKey": null,
            "args": null,
            "concreteType": "PartnerShow",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v6/*: any*/),
              (v65/*: any*/),
              (v2/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "priceCents",
            "storageKey": null,
            "args": null,
            "concreteType": "PriceCents",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "min",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "max",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "pricingContext",
            "storageKey": null,
            "args": null,
            "concreteType": "AnalyticsPricingContext",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "appliedFiltersDisplay",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "appliedFilters",
                "storageKey": null,
                "args": null,
                "concreteType": "AnalyticsPriceContextFilterType",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "dimension",
                    "args": null,
                    "storageKey": null
                  },
                  (v53/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "bins",
                "storageKey": null,
                "args": null,
                "concreteType": "AnalyticsHistogramBin",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "maxPrice",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "maxPriceCents",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "minPrice",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "minPriceCents",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "numArtworks",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ArtworkQuery",
    "id": null,
    "text": "query routes_ArtworkQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkApp_artwork\n    id\n  }\n}\n\nfragment ArtworkApp_artwork on Artwork {\n  id\n  _id\n  is_acquireable\n  is_offerable\n  availability\n  price\n  is_in_auction\n  artists {\n    id\n    ...ArtistInfo_artist\n  }\n  artist {\n    ...ArtistInfo_artist\n    id\n  }\n  ...ArtworkRelatedArtists_artwork\n  ...ArtworkMeta_artwork\n  ...ArtworkBanner_artwork\n  ...ArtworkSidebar_artwork\n  ...ArtworkDetails_artwork\n  ...ArtworkImageBrowser_artwork\n  ...OtherWorks_artwork\n  ...PricingContext_artwork\n}\n\nfragment ArtistInfo_artist on Artist {\n  _id\n  id\n  name\n  href\n  image {\n    cropped(width: 100, height: 100) {\n      url\n    }\n    id\n  }\n  formatted_nationality_and_birthday\n  counts {\n    partner_shows\n  }\n  exhibition_highlights(size: 3) {\n    ...SelectedExhibitions_exhibitions\n    id\n  }\n  collections\n  highlights {\n    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized {\n          display(format: \"0a\")\n        }\n        id\n      }\n    }\n  }\n  ...ArtistBio_bio\n  ...ArtistMarketInsights_artist\n  ...FollowArtistButton_artist\n  biography_blurb(format: HTML, partner_bio: true) {\n    text\n  }\n}\n\nfragment ArtworkRelatedArtists_artwork on Artwork {\n  id\n  artist {\n    href\n    related {\n      artists(kind: MAIN, first: 4, after: \"\") {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            ...ArtistCard_artist\n            id\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ArtworkMeta_artwork on Artwork {\n  href\n  _id\n  date\n  artist_names\n  sale_message\n  partner {\n    name\n    id\n  }\n  image_rights\n  is_in_auction\n  is_acquireable\n  is_shareable\n  meta_image: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n    id\n  }\n  meta {\n    title\n    description(limit: 155)\n    long_description: description(limit: 200)\n  }\n  context {\n    __typename\n    ... on ArtworkContextFair {\n      id\n      name\n    }\n  }\n  ...SeoDataForArtwork_artwork\n}\n\nfragment ArtworkBanner_artwork on Artwork {\n  partner {\n    type\n    name\n    initials\n    profile {\n      icon {\n        url(version: \"square140\")\n        id\n      }\n      href\n      id\n    }\n    id\n  }\n  sale {\n    is_auction\n    isBenefit\n    isGalleryAuction\n    cover_image {\n      url(version: \"square\")\n      id\n    }\n    id\n  }\n  artworkContextAuction: context {\n    __typename\n    ... on ArtworkContextAuction {\n      name\n      href\n      is_auction\n      is_closed\n      is_open\n      live_start_at\n      live_url_if_open\n    }\n    ... on ArtworkContextFair {\n      id\n    }\n  }\n  artworkContextFair: context {\n    __typename\n    ... on ArtworkContextFair {\n      name\n      href\n      isActive\n      start_at\n      end_at\n      profile {\n        initials\n        icon {\n          img: resized(width: 70, height: 70, version: \"square\") {\n            url\n          }\n          id\n        }\n        id\n      }\n      id\n    }\n  }\n  artworkContextPartnerShow: context {\n    __typename\n    ... on ArtworkContextPartnerShow {\n      name\n      href\n      type\n      status\n      thumbnail: cover_image {\n        img: resized(width: 70, height: 70, version: \"square\") {\n          url\n        }\n        id\n      }\n    }\n    ... on ArtworkContextFair {\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  is_in_auction\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarMetadata_artwork\n  ...ArtworkSidebarAuctionPartnerInfo_artwork\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n  ...ArtworkSidebarCommercial_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarExtraLinks_artwork\n  sale {\n    is_closed\n    ...AuctionTimer_sale\n    id\n  }\n}\n\nfragment ArtworkDetails_artwork on Artwork {\n  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork\n  ...ArtworkDetailsAboutTheWorkFromPartner_artwork\n  ...ArtworkDetailsAdditionalInfo_artwork\n  ...ArtworkDetailsArticles_artwork\n  articles(size: 10) {\n    id\n  }\n  literature(format: HTML)\n  exhibition_history(format: HTML)\n  provenance(format: HTML)\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  title\n  image_alt: to_s\n  image_title\n  href\n  ...ArtworkActions_artwork\n  image {\n    id\n    url(version: \"larger\")\n    height\n    width\n  }\n  images {\n    id\n    uri: url(version: [\"large\"])\n    placeholder: resized(width: 30, height: 30, version: \"small\") {\n      url\n    }\n    aspectRatio: aspect_ratio\n    is_zoomable\n    is_default\n    deepZoom: deep_zoom {\n      Image {\n        xmlns\n        Url\n        Format\n        TileSize\n        Overlap\n        Size {\n          Width\n          Height\n        }\n      }\n    }\n  }\n}\n\nfragment OtherWorks_artwork on Artwork {\n  ...ArtworkContextArtist_artwork\n  ...ArtworkContextFair_artwork\n  ...ArtworkContextPartnerShow_artwork\n  id\n  _id\n  sale {\n    is_closed\n    id\n  }\n  context {\n    __typename\n    ... on ArtworkContextFair {\n      id\n    }\n  }\n}\n\nfragment PricingContext_artwork on Artwork {\n  priceCents {\n    min\n    max\n  }\n  artists {\n    id\n  }\n  category\n  pricingContext {\n    appliedFiltersDisplay\n    appliedFilters {\n      dimension\n      category\n    }\n    bins {\n      maxPrice\n      maxPriceCents\n      minPrice\n      minPriceCents\n      numArtworks\n    }\n  }\n}\n\nfragment ArtworkContextArtist_artwork on Artwork {\n  id\n  artist {\n    name\n    href\n    id\n  }\n  ...ArtistArtworkGrid_artwork_2Lx1mV\n  ...PartnerArtworkGrid_artwork_2Lx1mV\n  ...RelatedWorksArtworkGrid_artwork\n}\n\nfragment ArtworkContextFair_artwork on Artwork {\n  id\n  artist {\n    name\n    href\n    id\n  }\n  ...FairArtworkGrid_artwork_2Lx1mV\n  ...PartnerShowArtworkGrid_artwork_2Lx1mV\n  ...ArtistArtworkGrid_artwork_2Lx1mV\n  ...RelatedWorksArtworkGrid_artwork\n}\n\nfragment ArtworkContextPartnerShow_artwork on Artwork {\n  id\n  artist {\n    name\n    href\n    id\n  }\n  ...PartnerShowArtworkGrid_artwork_2Lx1mV\n  ...ArtistArtworkGrid_artwork_2Lx1mV\n  ...PartnerArtworkGrid_artwork_2Lx1mV\n  ...RelatedWorksArtworkGrid_artwork\n}\n\nfragment PartnerShowArtworkGrid_artwork_2Lx1mV on Artwork {\n  show {\n    href\n    name\n    artworksConnection(first: 8) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ArtistArtworkGrid_artwork_2Lx1mV on Artwork {\n  id\n  artist {\n    name\n    href\n    counts {\n      artworks(format: \"0,0\", label: \"work\")\n    }\n    artworks_connection(first: 8, filter: [IS_FOR_SALE], sort: PUBLISHED_AT_DESC) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment PartnerArtworkGrid_artwork_2Lx1mV on Artwork {\n  partner {\n    artworksConnection(first: 8, for_sale: true, sort: PUBLISHED_AT_DESC) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    href\n    name\n    id\n  }\n}\n\nfragment RelatedWorksArtworkGrid_artwork on Artwork {\n  layers {\n    name\n    id\n  }\n  layer {\n    name\n    artworksConnection(first: 8) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      id\n      href\n      image {\n        aspect_ratio\n        id\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  _id\n  title\n  image_title\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n    id\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  _id\n  id\n  is_saved\n  title\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable\n  is_acquireable\n  is_offerable\n  href\n  sale {\n    is_preview\n    display_timely_at\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n    id\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction\n    is_closed\n    id\n  }\n  sale_artwork {\n    counts {\n      bidder_positions\n    }\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n}\n\nfragment FairArtworkGrid_artwork_2Lx1mV on Artwork {\n  fair: show(at_a_fair: true) {\n    href\n    artworksConnection(first: 8) {\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...Save_artwork\n  ...ArtworkSharePanel_artwork\n  artists {\n    name\n    id\n  }\n  date\n  dimensions {\n    cm\n  }\n  href\n  id\n  image {\n    id\n    url(version: \"larger\")\n    height\n    width\n  }\n  is_downloadable\n  is_hangable\n  partner {\n    id\n  }\n  title\n  sale {\n    is_closed\n    is_auction\n    id\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n    id\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {\n  description(format: HTML)\n}\n\nfragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {\n  additional_information(format: HTML)\n  sale {\n    isBenefit\n    isGalleryAuction\n    id\n  }\n  partner {\n    _id\n    id\n    type\n    href\n    name\n    initials\n    locations {\n      city\n      id\n    }\n    is_default_profile_public\n    profile {\n      ...FollowProfileButton_profile\n      id\n      icon {\n        url(version: \"square140\")\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  series\n  publisher\n  manufacturer\n  image_rights\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n}\n\nfragment ArtworkDetailsArticles_artwork on Artwork {\n  articles(size: 10) {\n    author {\n      name\n      id\n    }\n    href\n    published_at(format: \"MMM Do, YYYY\")\n    thumbnail_image {\n      resized(width: 300) {\n        url\n      }\n      id\n    }\n    thumbnail_title\n    id\n  }\n}\n\nfragment FollowProfileButton_profile on Profile {\n  __id\n  id\n  is_followed\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  cultural_maker\n  artists {\n    __id\n    _id\n    id\n    name\n    href\n    ...FollowArtistButton_artist_2eN9lh\n  }\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable\n  edition_sets {\n    __id\n    id\n  }\n  sale_artwork {\n    lot_label\n    id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  _id\n  partner {\n    _id\n    name\n    id\n  }\n  sale_artwork {\n    estimate\n    id\n  }\n  sale {\n    _id\n    is_closed\n    is_with_buyers_premium\n    id\n  }\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  _id\n  sale {\n    is_closed\n    is_live_open\n    id\n  }\n  sale_artwork {\n    is_with_reserve\n    reserve_message\n    reserve_status\n    current_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid {\n      is_winning\n      id\n    }\n    most_recent_bid {\n      is_winning\n      max_bid {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid {\n      max_bid {\n        cents\n      }\n      id\n    }\n  }\n  id\n  _id\n  sale {\n    id\n    registrationStatus {\n      qualified_for_bidding\n      id\n    }\n    is_preview\n    is_open\n    is_live_open\n    is_closed\n    is_registration_closed\n  }\n  sale_artwork {\n    increments {\n      cents\n      display\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  id\n  _id\n  is_acquireable\n  is_inquireable\n  is_offerable\n  price\n  sale_message\n  shippingInfo\n  shippingOrigin\n  edition_sets {\n    id\n    __id\n    is_acquireable\n    is_offerable\n    sale_message\n    ...ArtworkSidebarSizeInfo_piece\n  }\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  partner {\n    __id\n    name\n    href\n    locations {\n      city\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  _id\n  is_in_auction\n  is_for_sale\n  is_acquireable\n  is_inquireable\n  artists {\n    _id\n    is_consignable\n    id\n  }\n  sale {\n    _id\n    is_closed\n    id\n  }\n}\n\nfragment AuctionTimer_sale on Sale {\n  live_start_at\n  end_at\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  dimensions {\n    in\n    cm\n  }\n  edition_of\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attribution_class {\n    short_description\n    id\n  }\n}\n\nfragment FollowArtistButton_artist_2eN9lh on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n  ...FollowArtistPopover_suggested\n}\n\nfragment FollowArtistPopover_suggested on Artist {\n  related {\n    suggested(first: 3, exclude_followed_artists: true) {\n      edges {\n        node {\n          __id\n          _id\n          ...FollowArtistPopoverRow_artist\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  id\n  _id\n  __id\n  name\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n    id\n  }\n}\n\nfragment SeoDataForArtwork_artwork on Artwork {\n  href\n  date\n  is_price_hidden\n  is_price_range\n  price\n  price_currency\n  sale_message\n  meta_image: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n    id\n  }\n  meta {\n    title\n    description(limit: 155)\n  }\n  partner {\n    name\n    type\n    profile {\n      image {\n        resized(width: 320, height: 320, version: [\"medium\"]) {\n          url\n        }\n        id\n      }\n      id\n    }\n    id\n  }\n  artist_names\n  availability\n  category\n  dimensions {\n    in\n  }\n}\n\nfragment ArtistCard_artist on Artist {\n  name\n  id\n  href\n  image {\n    cropped(width: 400, height: 300) {\n      url\n    }\n    id\n  }\n  formatted_nationality_and_birthday\n  ...FollowArtistButton_artist\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n\nfragment SelectedExhibitions_exhibitions on Show {\n  partner {\n    __typename\n    ... on ExternalPartner {\n      name\n      id\n    }\n    ... on Partner {\n      name\n    }\n  }\n  name\n  start_at(format: \"YYYY\")\n  cover_image {\n    cropped(width: 800, height: 600) {\n      url\n    }\n    id\n  }\n  city\n}\n\nfragment ArtistBio_bio on Artist {\n  biography_blurb(format: HTML, partner_bio: true) {\n    text\n    credit\n  }\n}\n\nfragment ArtistMarketInsights_artist on Artist {\n  _id\n  collections\n  highlights {\n    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized {\n          display(format: \"0a\")\n        }\n        organization\n        sale_date(format: \"YYYY\")\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '346702533ec26d939cdce30f9894a894';
export default node;
