/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_ArtistTopLevelQueryVariables = {
    artistID: string;
};
export type routes_ArtistTopLevelQueryResponse = {
    readonly me: {
        readonly id: string;
    } | null;
    readonly artist: {
        readonly internalID: string;
        readonly slug: string;
        readonly statuses: {
            readonly shows: boolean | null;
            readonly cv: boolean | null;
            readonly articles: boolean | null;
        } | null;
        readonly counts: {
            readonly forSaleArtworks: number | null;
        } | null;
        readonly related: {
            readonly genes: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly slug: string;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
        readonly highlights: {
            readonly partnersConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly categories: ReadonlyArray<{
                            readonly slug: string;
                        } | null> | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
        readonly insights: ReadonlyArray<{
            readonly type: string | null;
        } | null> | null;
        readonly biographyBlurb: {
            readonly text: string | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtistApp_artist">;
    } | null;
};
export type routes_ArtistTopLevelQueryRawResponse = {
    readonly me: ({
        readonly id: string;
    }) | null;
    readonly artist: ({
        readonly internalID: string;
        readonly name: string | null;
        readonly slug: string;
        readonly nationality: string | null;
        readonly birthday: string | null;
        readonly deathday: string | null;
        readonly gender: string | null;
        readonly href: string | null;
        readonly meta: ({
            readonly title: string | null;
            readonly description: string | null;
        }) | null;
        readonly alternate_names: ReadonlyArray<string | null> | null;
        readonly image: ({
            readonly versions: ReadonlyArray<string | null> | null;
            readonly large: string | null;
            readonly square: string | null;
        }) | null;
        readonly counts: ({
            readonly artworks: number | null;
            readonly follows: number | null;
            readonly forSaleArtworks: number | null;
        }) | null;
        readonly blurb: string | null;
        readonly artworks_connection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly title: string | null;
                    readonly date: string | null;
                    readonly description: string | null;
                    readonly category: string | null;
                    readonly price_currency: string | null;
                    readonly listPrice: ({
                        readonly __typename: "PriceRange";
                        readonly minPrice: ({
                            readonly major: number;
                            readonly currencyCode: string;
                        }) | null;
                        readonly maxPrice: ({
                            readonly major: number;
                        }) | null;
                    } | {
                        readonly __typename: "Money";
                        readonly major: number;
                        readonly currencyCode: string;
                    } | {
                        readonly __typename: string;
                    }) | null;
                    readonly availability: string | null;
                    readonly href: string | null;
                    readonly image: ({
                        readonly small: string | null;
                        readonly large: string | null;
                    }) | null;
                    readonly partner: ({
                        readonly name: string | null;
                        readonly href: string | null;
                        readonly profile: ({
                            readonly image: ({
                                readonly small: string | null;
                                readonly large: string | null;
                            }) | null;
                            readonly id: string | null;
                        }) | null;
                        readonly id: string | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly artistHightlights: ({
            readonly partnersConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly categories: ReadonlyArray<({
                            readonly slug: string;
                            readonly id: string | null;
                        }) | null> | null;
                        readonly id: string | null;
                    }) | null;
                    readonly id: string | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly auctionResultsConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly price_realized: ({
                        readonly display: string | null;
                    }) | null;
                    readonly organization: string | null;
                    readonly sale_date: string | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly formattedNationalityAndBirthday: string | null;
        readonly statuses: ({
            readonly artworks: boolean | null;
            readonly shows: boolean | null;
            readonly cv: boolean | null;
            readonly articles: boolean | null;
            readonly auctionLots: boolean | null;
        }) | null;
        readonly carousel: ({
            readonly images: ReadonlyArray<({
                readonly href: string | null;
                readonly resized: ({
                    readonly url: string | null;
                    readonly width: number | null;
                    readonly height: number | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string;
        readonly is_followed: boolean | null;
        readonly related: ({
            readonly genes: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly slug: string;
                        readonly id: string | null;
                    }) | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly highlights: ({
            readonly partnersConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly node: ({
                        readonly categories: ReadonlyArray<({
                            readonly slug: string;
                            readonly id: string | null;
                        }) | null> | null;
                        readonly id: string | null;
                    }) | null;
                    readonly id: string | null;
                }) | null> | null;
            }) | null;
        }) | null;
        readonly insights: ReadonlyArray<({
            readonly type: string | null;
        }) | null> | null;
        readonly biographyBlurb: ({
            readonly text: string | null;
        }) | null;
    }) | null;
};
export type routes_ArtistTopLevelQuery = {
    readonly response: routes_ArtistTopLevelQueryResponse;
    readonly variables: routes_ArtistTopLevelQueryVariables;
    readonly rawResponse: routes_ArtistTopLevelQueryRawResponse;
};



/*
query routes_ArtistTopLevelQuery(
  $artistID: String!
) {
  me {
    id
  }
  artist(id: $artistID) @principalField {
    internalID
    ...ArtistApp_artist
    slug
    statuses {
      shows
      cv(minShowCount: 0)
      articles
    }
    counts {
      forSaleArtworks
    }
    related {
      genes {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
    highlights {
      partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
        edges {
          node {
            categories {
              slug
              id
            }
            id
          }
          id
        }
      }
    }
    insights {
      type
    }
    biographyBlurb(format: HTML, partnerBio: true) {
      text
    }
    id
  }
}

fragment ArtistApp_artist on Artist {
  internalID
  name
  slug
  ...ArtistMeta_artist
  ...ArtistHeader_artist
  ...NavigationTabs_artist
}

fragment ArtistHeader_artist on Artist {
  artistHightlights: highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized: priceRealized {
          display(format: "0a")
        }
        organization
        sale_date: saleDate(format: "YYYY")
        id
      }
    }
  }
  internalID
  slug
  name
  formattedNationalityAndBirthday
  counts {
    follows
    forSaleArtworks
  }
  statuses {
    artworks
  }
  carousel {
    images {
      href
      resized(height: 200) {
        url
        width
        height
      }
    }
  }
  ...FollowArtistButton_artist
}

fragment ArtistMeta_artist on Artist {
  slug
  name
  nationality
  birthday
  deathday
  gender
  href
  meta {
    title
    description
  }
  alternate_names: alternateNames
  image {
    versions
    large: url(version: "large")
    square: url(version: "square")
  }
  counts {
    artworks
  }
  blurb
  artworks_connection: artworksConnection(first: 10, filter: IS_FOR_SALE, published: true) {
    edges {
      node {
        title
        date
        description
        category
        price_currency: priceCurrency
        listPrice {
          __typename
          ... on PriceRange {
            minPrice {
              major
              currencyCode
            }
            maxPrice {
              major
            }
          }
          ... on Money {
            major
            currencyCode
          }
        }
        availability
        href
        image {
          small: url(version: "small")
          large: url(version: "large")
        }
        partner {
          name
          href
          profile {
            image {
              small: url(version: "small")
              large: url(version: "large")
            }
            id
          }
          id
        }
        id
      }
    }
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  is_followed: isFollowed
  counts {
    follows
  }
}

fragment NavigationTabs_artist on Artist {
  slug
  statuses {
    shows
    cv(minShowCount: 0)
    articles
    auctionLots
    artworks
  }
  counts {
    forSaleArtworks
  }
  related {
    genes {
      edges {
        node {
          slug
          id
        }
      }
    }
  }
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  insights {
    type
  }
  biographyBlurb(format: HTML, partnerBio: true) {
    text
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "me",
  "storageKey": null,
  "args": null,
  "concreteType": "Me",
  "plural": false,
  "selections": [
    (v1/*: any*/)
  ]
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shows",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cv",
  "args": [
    {
      "kind": "Literal",
      "name": "minShowCount",
      "value": 0
    }
  ],
  "storageKey": "cv(minShowCount:0)"
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "articles",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "forSaleArtworks",
  "args": null,
  "storageKey": null
},
v10 = [
  (v5/*: any*/)
],
v11 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v12 = [
  {
    "kind": "Literal",
    "name": "displayOnPartnerProfile",
    "value": true
  },
  (v11/*: any*/),
  {
    "kind": "Literal",
    "name": "partnerCategory",
    "value": [
      "blue-chip",
      "top-established",
      "top-emerging"
    ]
  },
  {
    "kind": "Literal",
    "name": "representedBy",
    "value": true
  }
],
v13 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "insights",
  "storageKey": null,
  "args": null,
  "concreteType": "ArtistInsight",
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "type",
      "args": null,
      "storageKey": null
    }
  ]
},
v14 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "biographyBlurb",
  "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)",
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "HTML"
    },
    {
      "kind": "Literal",
      "name": "partnerBio",
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
    }
  ]
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "ScalarField",
  "alias": "large",
  "name": "url",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "large"
    }
  ],
  "storageKey": "url(version:\"large\")"
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "artworks",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "major",
  "args": null,
  "storageKey": null
},
v22 = [
  (v21/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currencyCode",
    "args": null,
    "storageKey": null
  }
],
v23 = {
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
      "alias": "small",
      "name": "url",
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": "small"
        }
      ],
      "storageKey": "url(version:\"small\")"
    },
    (v19/*: any*/)
  ]
},
v24 = [
  (v5/*: any*/),
  (v1/*: any*/)
],
v25 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "partnersConnection",
    "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)",
    "args": (v12/*: any*/),
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
                "concreteType": "PartnerCategory",
                "plural": true,
                "selections": (v24/*: any*/)
              },
              (v1/*: any*/)
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ArtistTopLevelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v2/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v3/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "statuses",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistStatuses",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "counts",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "plural": false,
            "selections": [
              (v9/*: any*/)
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
                "name": "genes",
                "storageKey": null,
                "args": null,
                "concreteType": "GeneConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Gene",
                        "plural": false,
                        "selections": (v10/*: any*/)
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
            "name": "highlights",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "partnersConnection",
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)",
                "args": (v12/*: any*/),
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
                            "concreteType": "PartnerCategory",
                            "plural": true,
                            "selections": (v10/*: any*/)
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          (v13/*: any*/),
          (v14/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "ArtistApp_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ArtistTopLevelQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v2/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v3/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v15/*: any*/),
          (v5/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "nationality",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "birthday",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "deathday",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "gender",
            "args": null,
            "storageKey": null
          },
          (v16/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "meta",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistMeta",
            "plural": false,
            "selections": [
              (v17/*: any*/),
              (v18/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": "alternate_names",
            "name": "alternateNames",
            "args": null,
            "storageKey": null
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "versions",
                "args": null,
                "storageKey": null
              },
              (v19/*: any*/),
              {
                "kind": "ScalarField",
                "alias": "square",
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "square"
                  }
                ],
                "storageKey": "url(version:\"square\")"
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "counts",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "plural": false,
            "selections": [
              (v20/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "follows",
                "args": null,
                "storageKey": null
              },
              (v9/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "blurb",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "artworks_connection",
            "name": "artworksConnection",
            "storageKey": "artworksConnection(filter:\"IS_FOR_SALE\",first:10,published:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "filter",
                "value": "IS_FOR_SALE"
              },
              (v11/*: any*/),
              {
                "kind": "Literal",
                "name": "published",
                "value": true
              }
            ],
            "concreteType": "ArtworkConnection",
            "plural": false,
            "selections": [
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
                      (v17/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "date",
                        "args": null,
                        "storageKey": null
                      },
                      (v18/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "category",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "price_currency",
                        "name": "priceCurrency",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "listPrice",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "__typename",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "PriceRange",
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "minPrice",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Money",
                                "plural": false,
                                "selections": (v22/*: any*/)
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "maxPrice",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Money",
                                "plural": false,
                                "selections": [
                                  (v21/*: any*/)
                                ]
                              }
                            ]
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Money",
                            "selections": (v22/*: any*/)
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "availability",
                        "args": null,
                        "storageKey": null
                      },
                      (v16/*: any*/),
                      (v23/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          (v15/*: any*/),
                          (v16/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "profile",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Profile",
                            "plural": false,
                            "selections": [
                              (v23/*: any*/),
                              (v1/*: any*/)
                            ]
                          },
                          (v1/*: any*/)
                        ]
                      },
                      (v1/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "artistHightlights",
            "name": "highlights",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "plural": false,
            "selections": (v25/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "auctionResultsConnection",
            "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")",
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
                        "alias": "price_realized",
                        "name": "priceRealized",
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
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "organization",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "sale_date",
                        "name": "saleDate",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "YYYY"
                          }
                        ],
                        "storageKey": "saleDate(format:\"YYYY\")"
                      },
                      (v1/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "formattedNationalityAndBirthday",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "statuses",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistStatuses",
            "plural": false,
            "selections": [
              (v20/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "auctionLots",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "carousel",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistCarousel",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "images",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": true,
                "selections": [
                  (v16/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "resized",
                    "storageKey": "resized(height:200)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 200
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "url",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "width",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "height",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": "is_followed",
            "name": "isFollowed",
            "args": null,
            "storageKey": null
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
                "name": "genes",
                "storageKey": null,
                "args": null,
                "concreteType": "GeneConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Gene",
                        "plural": false,
                        "selections": (v24/*: any*/)
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
            "name": "highlights",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "plural": false,
            "selections": (v25/*: any*/)
          },
          (v13/*: any*/),
          (v14/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ArtistTopLevelQuery",
    "id": null,
    "text": "query routes_ArtistTopLevelQuery(\n  $artistID: String!\n) {\n  me {\n    id\n  }\n  artist(id: $artistID) @principalField {\n    internalID\n    ...ArtistApp_artist\n    slug\n    statuses {\n      shows\n      cv(minShowCount: 0)\n      articles\n    }\n    counts {\n      forSaleArtworks\n    }\n    related {\n      genes {\n        edges {\n          node {\n            slug\n            id\n          }\n        }\n      }\n    }\n    highlights {\n      partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n        edges {\n          node {\n            categories {\n              slug\n              id\n            }\n            id\n          }\n          id\n        }\n      }\n    }\n    insights {\n      type\n    }\n    biographyBlurb(format: HTML, partnerBio: true) {\n      text\n    }\n    id\n  }\n}\n\nfragment ArtistApp_artist on Artist {\n  internalID\n  name\n  slug\n  ...ArtistMeta_artist\n  ...ArtistHeader_artist\n  ...NavigationTabs_artist\n}\n\nfragment ArtistHeader_artist on Artist {\n  artistHightlights: highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n    forSaleArtworks\n  }\n  statuses {\n    artworks\n  }\n  carousel {\n    images {\n      href\n      resized(height: 200) {\n        url\n        width\n        height\n      }\n    }\n  }\n  ...FollowArtistButton_artist\n}\n\nfragment ArtistMeta_artist on Artist {\n  slug\n  name\n  nationality\n  birthday\n  deathday\n  gender\n  href\n  meta {\n    title\n    description\n  }\n  alternate_names: alternateNames\n  image {\n    versions\n    large: url(version: \"large\")\n    square: url(version: \"square\")\n  }\n  counts {\n    artworks\n  }\n  blurb\n  artworks_connection: artworksConnection(first: 10, filter: IS_FOR_SALE, published: true) {\n    edges {\n      node {\n        title\n        date\n        description\n        category\n        price_currency: priceCurrency\n        listPrice {\n          __typename\n          ... on PriceRange {\n            minPrice {\n              major\n              currencyCode\n            }\n            maxPrice {\n              major\n            }\n          }\n          ... on Money {\n            major\n            currencyCode\n          }\n        }\n        availability\n        href\n        image {\n          small: url(version: \"small\")\n          large: url(version: \"large\")\n        }\n        partner {\n          name\n          href\n          profile {\n            image {\n              small: url(version: \"small\")\n              large: url(version: \"large\")\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment NavigationTabs_artist on Artist {\n  slug\n  statuses {\n    shows\n    cv(minShowCount: 0)\n    articles\n    auctionLots\n    artworks\n  }\n  counts {\n    forSaleArtworks\n  }\n  related {\n    genes {\n      edges {\n        node {\n          slug\n          id\n        }\n      }\n    }\n  }\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n  }\n  biographyBlurb(format: HTML, partnerBio: true) {\n    text\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'c95a7f9dd9cb814d2409559f8b959c3e';
export default node;
