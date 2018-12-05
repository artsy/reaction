/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkApp_artwork$ref } from "./ArtworkApp_artwork.graphql";
export type routes_ArtworkQueryVariables = {
    readonly artworkID: string;
};
export type routes_ArtworkQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkApp_artwork$ref;
    }) | null;
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
    __id
  }
}

fragment ArtworkApp_artwork on Artwork {
  id
  artist {
    id
    __id
  }
  ...ArtworkBanner_artwork
  ...ArtworkSidebar_artwork
  ...ArtworkDetails_artwork
  ...ArtworkImages_artwork
  ...OtherWorks_artwork
  __id
}

fragment ArtworkBanner_artwork on Artwork {
  partner {
    type
    name
    initials
    profile {
      icon {
        url(version: "square140")
      }
      __id
    }
    __id
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
    ... on Node {
      __id
    }
    ... on ArtworkContextFair {
      __id
    }
  }
  artworkContextFair: context {
    __typename
    ... on ArtworkContextFair {
      name
      href
      is_active
      start_at
      end_at
      profile {
        initials
        icon {
          img: resized(width: 70, height: 70, version: "square") {
            url
          }
        }
        __id
      }
      __id
    }
    ... on Node {
      __id
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
      }
    }
    ... on Node {
      __id
    }
    ... on ArtworkContextFair {
      __id
    }
  }
  __id
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
  __id
}

fragment ArtworkDetails_artwork on Artwork {
  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
  ...ArtworkDetailsAboutTheWorkFromPartner_artwork
  ...ArtworkDetailsChecklist_artwork
  ...ArtworkDetailsAdditionalInfo_artwork
  ...ArtworkDetailsArticles_artwork
  articles(size: 10) {
    id
    __id
  }
  literature(format: HTML)
  exhibition_history(format: HTML)
  provenance(format: HTML)
  __id
}

fragment ArtworkImages_artwork on Artwork {
  title
  image_alt: to_s
  image_title
  images {
    id
    uri: url(version: ["larger", "large"])
    placeholder: resized(width: 30, height: 30, version: "small") {
      url
    }
    aspectRatio: aspect_ratio
    is_zoomable
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
  __id
}

fragment OtherWorks_artwork on Artwork {
  id
  _id
  sale {
    is_closed
    __id
  }
  context {
    __typename
    ... on Node {
      __id
    }
    ... on ArtworkContextFair {
      __id
    }
  }
  __id
}

fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
  description(format: HTML)
  __id
}

fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
  additional_information(format: HTML)
  partner {
    _id
    id
    type
    href
    name
    initials
    locations {
      city
      __id
    }
    is_default_profile_public
    profile {
      ...FollowProfileButton_profile
      id
      icon {
        url(version: "square140")
      }
      __id
    }
    __id
  }
  __id
}

fragment ArtworkDetailsChecklist_artwork on Artwork {
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
  __id
}

fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
  series
  publisher
  manufacturer
  image_rights
  __id
}

fragment ArtworkDetailsArticles_artwork on Artwork {
  articles(size: 10) {
    author {
      name
      __id
    }
    href
    published_at(format: "MMM Do, YYYY")
    thumbnail_image {
      resized(width: 300) {
        url
      }
    }
    thumbnail_title
    __id
  }
  __id
}

fragment FollowProfileButton_profile on Profile {
  __id
  id
  is_followed
}

fragment ArtworkSidebarArtists_artwork on Artwork {
  artists {
    __id
    id
    name
    href
    ...FollowArtistButton_artist_2eN9lh
  }
  __id
}

fragment ArtworkSidebarMetadata_artwork on Artwork {
  is_biddable
  edition_sets {
    __id
  }
  sale_artwork {
    lot_label
    __id
  }
  ...ArtworkSidebarTitleInfo_artwork
  ...ArtworkSidebarSizeInfo_piece
  ...ArtworkSidebarClassification_artwork
  __id
}

fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
  _id
  partner {
    _id
    name
    __id
  }
  sale_artwork {
    estimate
    __id
  }
  sale {
    _id
    is_closed
    is_with_buyers_premium
    __id
  }
  __id
}

fragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {
  myLotStanding(live: true) {
    active_bid {
      is_winning
      max_bid {
        display
      }
      __id
    }
  }
  sale {
    is_open
    is_closed
    __id
  }
  sale_artwork {
    lot_label
    estimate
    is_with_reserve
    reserve_message
    reserve_status
    current_bid {
      display
    }
    counts {
      bidder_positions
    }
    __id
  }
  __id
}

fragment ArtworkSidebarBidAction_artwork on Artwork {
  myLotStanding(live: true) {
    active_bid {
      __id
    }
  }
  sale {
    registrationStatus {
      qualified_for_bidding
      __id
    }
    is_preview
    is_open
    is_live_open
    is_closed
    is_registration_closed
    __id
  }
  sale_artwork {
    increments {
      display
    }
    __id
  }
  __id
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  id
  is_acquireable
  is_inquireable
  is_offerable
  sale_message
  shippingInfo
  shippingOrigin
  edition_sets {
    __id
    ...ArtworkSidebarSizeInfo_piece
  }
  __id
}

fragment ArtworkSidebarPartnerInfo_artwork on Artwork {
  partner {
    __id
    name
    href
    locations {
      city
      __id
    }
  }
  __id
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
    __id
  }
  sale {
    _id
    is_closed
    __id
  }
  __id
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
  dimensions {
    in
    cm
  }
  edition_of
  ... on Node {
    __id
  }
  ... on EditionSet {
    __id
  }
}

fragment ArtworkSidebarTitleInfo_artwork on Artwork {
  title
  date
  medium
  __id
}

fragment ArtworkSidebarClassification_artwork on Artwork {
  attribution_class {
    short_description
  }
  __id
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
          ...FollowArtistPopoverRow_artist
        }
      }
    }
  }
  __id
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
    "variableName": "artworkID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "initials",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_followed",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_closed",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_open",
  "args": null,
  "storageKey": null
},
v13 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
],
v14 = [
  {
    "kind": "LinkedField",
    "alias": "img",
    "name": "resized",
    "storageKey": "resized(height:70,version:\"square\",width:70)",
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 70,
        "type": "Int"
      },
      {
        "kind": "Literal",
        "name": "version",
        "value": "square",
        "type": "[String]"
      },
      {
        "kind": "Literal",
        "name": "width",
        "value": 70,
        "type": "Int"
      }
    ],
    "concreteType": "ResizedImageUrl",
    "plural": false,
    "selections": v13
  }
],
v15 = {
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
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "edition_of",
  "args": null,
  "storageKey": null
},
v17 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v18 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML",
    "type": "Format"
  }
],
v19 = [
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
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_ArtworkQuery",
  "id": null,
  "text": "query routes_ArtworkQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkApp_artwork\n    __id\n  }\n}\n\nfragment ArtworkApp_artwork on Artwork {\n  id\n  artist {\n    id\n    __id\n  }\n  ...ArtworkBanner_artwork\n  ...ArtworkSidebar_artwork\n  ...ArtworkDetails_artwork\n  ...ArtworkImages_artwork\n  ...OtherWorks_artwork\n  __id\n}\n\nfragment ArtworkBanner_artwork on Artwork {\n  partner {\n    type\n    name\n    initials\n    profile {\n      icon {\n        url(version: \"square140\")\n      }\n      __id\n    }\n    __id\n  }\n  artworkContextAuction: context {\n    __typename\n    ... on ArtworkContextAuction {\n      name\n      href\n      is_auction\n      is_closed\n      is_open\n      live_start_at\n      live_url_if_open\n    }\n    ... on Node {\n      __id\n    }\n    ... on ArtworkContextFair {\n      __id\n    }\n  }\n  artworkContextFair: context {\n    __typename\n    ... on ArtworkContextFair {\n      name\n      href\n      is_active\n      start_at\n      end_at\n      profile {\n        initials\n        icon {\n          img: resized(width: 70, height: 70, version: \"square\") {\n            url\n          }\n        }\n        __id\n      }\n      __id\n    }\n    ... on Node {\n      __id\n    }\n  }\n  artworkContextPartnerShow: context {\n    __typename\n    ... on ArtworkContextPartnerShow {\n      name\n      href\n      type\n      status\n      thumbnail: cover_image {\n        img: resized(width: 70, height: 70, version: \"square\") {\n          url\n        }\n      }\n    }\n    ... on Node {\n      __id\n    }\n    ... on ArtworkContextFair {\n      __id\n    }\n  }\n  __id\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  is_in_auction\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarMetadata_artwork\n  ...ArtworkSidebarAuctionPartnerInfo_artwork\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n  ...ArtworkSidebarCommercial_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarExtraLinks_artwork\n  __id\n}\n\nfragment ArtworkDetails_artwork on Artwork {\n  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork\n  ...ArtworkDetailsAboutTheWorkFromPartner_artwork\n  ...ArtworkDetailsChecklist_artwork\n  ...ArtworkDetailsAdditionalInfo_artwork\n  ...ArtworkDetailsArticles_artwork\n  articles(size: 10) {\n    id\n    __id\n  }\n  literature(format: HTML)\n  exhibition_history(format: HTML)\n  provenance(format: HTML)\n  __id\n}\n\nfragment ArtworkImages_artwork on Artwork {\n  title\n  image_alt: to_s\n  image_title\n  images {\n    id\n    uri: url(version: [\"larger\", \"large\"])\n    placeholder: resized(width: 30, height: 30, version: \"small\") {\n      url\n    }\n    aspectRatio: aspect_ratio\n    is_zoomable\n    deepZoom: deep_zoom {\n      Image {\n        xmlns\n        Url\n        Format\n        TileSize\n        Overlap\n        Size {\n          Width\n          Height\n        }\n      }\n    }\n  }\n  __id\n}\n\nfragment OtherWorks_artwork on Artwork {\n  id\n  _id\n  sale {\n    is_closed\n    __id\n  }\n  context {\n    __typename\n    ... on Node {\n      __id\n    }\n    ... on ArtworkContextFair {\n      __id\n    }\n  }\n  __id\n}\n\nfragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {\n  description(format: HTML)\n  __id\n}\n\nfragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {\n  additional_information(format: HTML)\n  partner {\n    _id\n    id\n    type\n    href\n    name\n    initials\n    locations {\n      city\n      __id\n    }\n    is_default_profile_public\n    profile {\n      ...FollowProfileButton_profile\n      id\n      icon {\n        url(version: \"square140\")\n      }\n      __id\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtworkDetailsChecklist_artwork on Artwork {\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  __id\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  series\n  publisher\n  manufacturer\n  image_rights\n  __id\n}\n\nfragment ArtworkDetailsArticles_artwork on Artwork {\n  articles(size: 10) {\n    author {\n      name\n      __id\n    }\n    href\n    published_at(format: \"MMM Do, YYYY\")\n    thumbnail_image {\n      resized(width: 300) {\n        url\n      }\n    }\n    thumbnail_title\n    __id\n  }\n  __id\n}\n\nfragment FollowProfileButton_profile on Profile {\n  __id\n  id\n  is_followed\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  artists {\n    __id\n    id\n    name\n    href\n    ...FollowArtistButton_artist_2eN9lh\n  }\n  __id\n}\n\nfragment ArtworkSidebarMetadata_artwork on Artwork {\n  is_biddable\n  edition_sets {\n    __id\n  }\n  sale_artwork {\n    lot_label\n    __id\n  }\n  ...ArtworkSidebarTitleInfo_artwork\n  ...ArtworkSidebarSizeInfo_piece\n  ...ArtworkSidebarClassification_artwork\n  __id\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  _id\n  partner {\n    _id\n    name\n    __id\n  }\n  sale_artwork {\n    estimate\n    __id\n  }\n  sale {\n    _id\n    is_closed\n    is_with_buyers_premium\n    __id\n  }\n  __id\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  myLotStanding(live: true) {\n    active_bid {\n      is_winning\n      max_bid {\n        display\n      }\n      __id\n    }\n  }\n  sale {\n    is_open\n    is_closed\n    __id\n  }\n  sale_artwork {\n    lot_label\n    estimate\n    is_with_reserve\n    reserve_message\n    reserve_status\n    current_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    active_bid {\n      __id\n    }\n  }\n  sale {\n    registrationStatus {\n      qualified_for_bidding\n      __id\n    }\n    is_preview\n    is_open\n    is_live_open\n    is_closed\n    is_registration_closed\n    __id\n  }\n  sale_artwork {\n    increments {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  id\n  is_acquireable\n  is_inquireable\n  is_offerable\n  sale_message\n  shippingInfo\n  shippingOrigin\n  edition_sets {\n    __id\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  __id\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  partner {\n    __id\n    name\n    href\n    locations {\n      city\n      __id\n    }\n  }\n  __id\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  _id\n  is_in_auction\n  is_for_sale\n  is_acquireable\n  is_inquireable\n  artists {\n    _id\n    is_consignable\n    __id\n  }\n  sale {\n    _id\n    is_closed\n    __id\n  }\n  __id\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  dimensions {\n    in\n    cm\n  }\n  edition_of\n  ... on Node {\n    __id\n  }\n  ... on EditionSet {\n    __id\n  }\n}\n\nfragment ArtworkSidebarTitleInfo_artwork on Artwork {\n  title\n  date\n  medium\n  __id\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attribution_class {\n    short_description\n  }\n  __id\n}\n\nfragment FollowArtistButton_artist_2eN9lh on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n  ...FollowArtistPopover_suggested\n}\n\nfragment FollowArtistPopover_suggested on Artist {\n  related {\n    suggested(first: 3, exclude_followed_artists: true) {\n      edges {\n        node {\n          __id\n          ...FollowArtistPopoverRow_artist\n        }\n      }\n    }\n  }\n  __id\n}\n\nfragment FollowArtistPopoverRow_artist on Artist {\n  id\n  _id\n  __id\n  name\n  image {\n    cropped(width: 45, height: 45) {\n      url\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ArtworkQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkApp_artwork",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ArtworkQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_inquireable",
            "args": null,
            "storageKey": null
          },
          v3,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              v4,
              v5,
              v6,
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
                            "value": "square140",
                            "type": "[String]"
                          }
                        ],
                        "storageKey": "url(version:\"square140\")"
                      }
                    ]
                  },
                  v2,
                  v3,
                  v7
                ]
              },
              v2,
              v8,
              v9,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "locations",
                "storageKey": null,
                "args": null,
                "concreteType": "Location",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "city",
                    "args": null,
                    "storageKey": null
                  },
                  v2
                ]
              },
              v3,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_default_profile_public",
                "args": null,
                "storageKey": null
              }
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
              v10,
              v2,
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextAuction",
                "selections": [
                  v5,
                  v9,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "is_auction",
                    "args": null,
                    "storageKey": null
                  },
                  v11,
                  v12,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "live_start_at",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "live_url_if_open",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
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
              v10,
              v2,
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextFair",
                "selections": [
                  v5,
                  v9,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "is_active",
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
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "end_at",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "profile",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Profile",
                    "plural": false,
                    "selections": [
                      v6,
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "icon",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": v14
                      },
                      v2
                    ]
                  }
                ]
              }
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
              v10,
              v2,
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextPartnerShow",
                "selections": [
                  v5,
                  v9,
                  v4,
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
                    "selections": v14
                  }
                ]
              }
            ]
          },
          v2,
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
              v2,
              v3,
              v5,
              v9,
              v7,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "counts",
                "storageKey": null,
                "args": null,
                "concreteType": "ArtistCounts",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "follows",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
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
                        "value": true,
                        "type": "Boolean"
                      },
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 3,
                        "type": "Int"
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
                              v2,
                              v3,
                              v8,
                              v5,
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
                                        "value": 45,
                                        "type": "Int!"
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 45,
                                        "type": "Int!"
                                      }
                                    ],
                                    "concreteType": "CroppedImageUrl",
                                    "plural": false,
                                    "selections": v13
                                  }
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
              v8,
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
            "kind": "ScalarField",
            "alias": null,
            "name": "is_biddable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "edition_sets",
            "storageKey": null,
            "args": null,
            "concreteType": "EditionSet",
            "plural": true,
            "selections": [
              v2,
              v15,
              v16
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
              v2,
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
                "selections": v17
              },
              {
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
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "increments",
                "storageKey": null,
                "args": null,
                "concreteType": "BidIncrementsFormatted",
                "plural": true,
                "selections": v17
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "date",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "medium",
            "args": null,
            "storageKey": null
          },
          v15,
          v16,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "images",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": true,
            "selections": [
              v3,
              {
                "kind": "ScalarField",
                "alias": "uri",
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "larger",
                      "large"
                    ],
                    "type": "[String]"
                  }
                ],
                "storageKey": "url(version:[\"larger\",\"large\"])"
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
                    "value": 30,
                    "type": "Int"
                  },
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "small",
                    "type": "[String]"
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 30,
                    "type": "Int"
                  }
                ],
                "concreteType": "ResizedImageUrl",
                "plural": false,
                "selections": v13
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
              }
            ]
          },
          v8,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              v8,
              v11,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_with_buyers_premium",
                "args": null,
                "storageKey": null
              },
              v2,
              v12,
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
                  v2
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_preview",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_live_open",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_registration_closed",
                "args": null,
                "storageKey": null
              }
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
                "value": true,
                "type": "Boolean"
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
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "is_winning",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "max_bid",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "BidderPositionMaxBid",
                    "plural": false,
                    "selections": v17
                  },
                  v2
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_acquireable",
            "args": null,
            "storageKey": null
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
              v3,
              v2
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_offerable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "sale_message",
            "args": null,
            "storageKey": null
          },
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
            "args": v18,
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "additional_information",
            "args": v18,
            "storageKey": "additional_information(format:\"HTML\")"
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "framed",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": v19
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "signatureInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": v19
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "conditionDescription",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": v19
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "certificateOfAuthenticity",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": v19
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
            "kind": "ScalarField",
            "alias": null,
            "name": "image_rights",
            "args": null,
            "storageKey": null
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
                "value": 10,
                "type": "Int"
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
                "selections": [
                  v5,
                  v2
                ]
              },
              v9,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "published_at",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do, YYYY",
                    "type": "String"
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
                        "value": 300,
                        "type": "Int"
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "plural": false,
                    "selections": v13
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "thumbnail_title",
                "args": null,
                "storageKey": null
              },
              v2,
              v3
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "literature",
            "args": v18,
            "storageKey": "literature(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "exhibition_history",
            "args": v18,
            "storageKey": "exhibition_history(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "provenance",
            "args": v18,
            "storageKey": "provenance(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": "image_alt",
            "name": "to_s",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "image_title",
            "args": null,
            "storageKey": null
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
              v10,
              v2
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '346702533ec26d939cdce30f9894a894';
export default node;
