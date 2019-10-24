/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistApp_artist$ref } from "./ArtistApp_artist.graphql";
export type routes_ArtistTopLevelQueryVariables = {
    readonly artist_id: string;
};
export type routes_ArtistTopLevelQueryResponse = {
    readonly artist: ({
        readonly " $fragmentRefs": ArtistApp_artist$ref;
    }) | null;
};
export type routes_ArtistTopLevelQuery = {
    readonly response: routes_ArtistTopLevelQueryResponse;
    readonly variables: routes_ArtistTopLevelQueryVariables;
};



/*
query routes_ArtistTopLevelQuery(
  $artist_id: String!
) {
  artist(id: $artist_id) @principalField {
    ...ArtistApp_artist
    __id
  }
}

fragment ArtistApp_artist on Artist {
  _id
  id
  ...ArtistMeta_artist
  ...ArtistHeader_artist
  ...NavigationTabs_artist
  __id
}

fragment ArtistMeta_artist on Artist {
  id
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
  alternate_names
  image {
    versions
    large: url(version: "large")
    square: url(version: "square")
    __id: id
  }
  counts {
    artworks
  }
  blurb
  artworks_connection(first: 10, filter: IS_FOR_SALE, published: true) {
    edges {
      node {
        title
        date
        description
        category
        price_currency
        listPrice {
          __typename
          ... on PriceRange {
            minPrice {
              major
            }
            maxPrice {
              major
              currencyCode
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
          __id: id
        }
        partner {
          name
          href
          profile {
            image {
              small: url(version: "small")
              large: url(version: "large")
              __id: id
            }
            __id
          }
          __id
        }
        __id
      }
    }
  }
  __id
}

fragment ArtistHeader_artist on Artist {
  _id
  id
  name
  nationality
  years
  counts {
    follows
  }
  carousel {
    images {
      href
      resized(height: 200) {
        url
        width
        height
      }
      __id: id
    }
  }
  ...FollowArtistButton_artist
  __id
}

fragment NavigationTabs_artist on Artist {
  id
  statuses {
    shows
    articles
    cv(minShowCount: 0)
    auction_lots
  }
  __id
}

fragment FollowArtistButton_artist on Artist {
  __id
  name
  id
  is_followed
  counts {
    follows
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artist_id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artist_id",
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
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": "large",
  "name": "url",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "large",
      "type": "[String]"
    }
  ],
  "storageKey": "url(version:\"large\")"
},
v8 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "major",
  "args": null,
  "storageKey": null
},
v10 = [
  v9,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currencyCode",
    "args": null,
    "storageKey": null
  }
],
v11 = {
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
          "value": "small",
          "type": "[String]"
        }
      ],
      "storageKey": "url(version:\"small\")"
    },
    v7,
    v8
  ]
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_ArtistTopLevelQuery",
  "id": null,
  "text": "query routes_ArtistTopLevelQuery(\n  $artist_id: String!\n) {\n  artist(id: $artist_id) @principalField {\n    ...ArtistApp_artist\n    __id\n  }\n}\n\nfragment ArtistApp_artist on Artist {\n  _id\n  id\n  ...ArtistMeta_artist\n  ...ArtistHeader_artist\n  ...NavigationTabs_artist\n  __id\n}\n\nfragment ArtistMeta_artist on Artist {\n  id\n  name\n  nationality\n  birthday\n  deathday\n  gender\n  href\n  meta {\n    title\n    description\n  }\n  alternate_names\n  image {\n    versions\n    large: url(version: \"large\")\n    square: url(version: \"square\")\n    __id: id\n  }\n  counts {\n    artworks\n  }\n  blurb\n  artworks_connection(first: 10, filter: IS_FOR_SALE, published: true) {\n    edges {\n      node {\n        title\n        date\n        description\n        category\n        price_currency\n        listPrice {\n          __typename\n          ... on PriceRange {\n            minPrice {\n              major\n            }\n            maxPrice {\n              major\n              currencyCode\n            }\n          }\n          ... on Money {\n            major\n            currencyCode\n          }\n        }\n        availability\n        href\n        image {\n          small: url(version: \"small\")\n          large: url(version: \"large\")\n          __id: id\n        }\n        partner {\n          name\n          href\n          profile {\n            image {\n              small: url(version: \"small\")\n              large: url(version: \"large\")\n              __id: id\n            }\n            __id\n          }\n          __id\n        }\n        __id\n      }\n    }\n  }\n  __id\n}\n\nfragment ArtistHeader_artist on Artist {\n  _id\n  id\n  name\n  nationality\n  years\n  counts {\n    follows\n  }\n  carousel {\n    images {\n      href\n      resized(height: 200) {\n        url\n        width\n        height\n      }\n      __id: id\n    }\n  }\n  ...FollowArtistButton_artist\n  __id\n}\n\nfragment NavigationTabs_artist on Artist {\n  id\n  statuses {\n    shows\n    articles\n    cv(minShowCount: 0)\n    auction_lots\n  }\n  __id\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  name\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ArtistTopLevelQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistApp_artist",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ArtistTopLevelQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "alternate_names",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          },
          v3,
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
          v4,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "meta",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistMeta",
            "plural": false,
            "selections": [
              v5,
              v6
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
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
              v7,
              {
                "kind": "ScalarField",
                "alias": "square",
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "square",
                    "type": "[String]"
                  }
                ],
                "storageKey": "url(version:\"square\")"
              },
              v8
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "artworks",
                "args": null,
                "storageKey": null
              },
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
            "kind": "ScalarField",
            "alias": null,
            "name": "blurb",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artworks_connection",
            "storageKey": "artworks_connection(filter:\"IS_FOR_SALE\",first:10,published:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "filter",
                "value": "IS_FOR_SALE",
                "type": "[ArtistArtworksFilters]"
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10,
                "type": "Int"
              },
              {
                "kind": "Literal",
                "name": "published",
                "value": true,
                "type": "Boolean"
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
                            "type": "Money",
                            "selections": v10
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
                                "selections": [
                                  v9
                                ]
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "maxPrice",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Money",
                                "plural": false,
                                "selections": v10
                              }
                            ]
                          }
                        ]
                      },
                      v5,
                      v6,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "category",
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
                        "name": "availability",
                        "args": null,
                        "storageKey": null
                      },
                      v4,
                      v11,
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          v3,
                          v4,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "profile",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Profile",
                            "plural": false,
                            "selections": [
                              v11,
                              v2
                            ]
                          },
                          v2
                        ]
                      },
                      v2
                    ]
                  }
                ]
              }
            ]
          },
          v2,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "years",
            "args": null,
            "storageKey": null
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
                  v4,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "resized",
                    "storageKey": "resized(height:200)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 200,
                        "type": "Int"
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
                  },
                  v8
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_followed",
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "shows",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "articles",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "cv",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "minShowCount",
                    "value": 0,
                    "type": "Int"
                  }
                ],
                "storageKey": "cv(minShowCount:0)"
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "auction_lots",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '457b31c97881104086337d7b2ea87270';
export default node;
