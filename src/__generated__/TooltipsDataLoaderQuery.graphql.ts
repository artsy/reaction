/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistToolTip_artist$ref } from "./ArtistToolTip_artist.graphql";
import { FollowArtistButton_artist$ref } from "./FollowArtistButton_artist.graphql";
import { FollowGeneButton_gene$ref } from "./FollowGeneButton_gene.graphql";
import { GeneToolTip_gene$ref } from "./GeneToolTip_gene.graphql";
import { MarketDataSummary_artist$ref } from "./MarketDataSummary_artist.graphql";
export type TooltipsDataLoaderQueryVariables = {
    readonly artistSlugs?: ReadonlyArray<string> | null;
    readonly geneSlugs?: ReadonlyArray<string> | null;
};
export type TooltipsDataLoaderQueryResponse = {
    readonly artists: ReadonlyArray<{
        readonly id: string;
        readonly _id: string;
        readonly " $fragmentRefs": ArtistToolTip_artist$ref & MarketDataSummary_artist$ref & FollowArtistButton_artist$ref;
    } | null> | null;
    readonly genes: ReadonlyArray<{
        readonly id: string;
        readonly _id: string;
        readonly " $fragmentRefs": GeneToolTip_gene$ref & FollowGeneButton_gene$ref;
    } | null> | null;
};
export type TooltipsDataLoaderQuery = {
    readonly response: TooltipsDataLoaderQueryResponse;
    readonly variables: TooltipsDataLoaderQueryVariables;
};



/*
query TooltipsDataLoaderQuery(
  $artistSlugs: [String!]
  $geneSlugs: [String!]
) {
  artists(slugs: $artistSlugs) {
    id
    _id
    ...ArtistToolTip_artist
    ...MarketDataSummary_artist
    ...FollowArtistButton_artist
  }
  genes(slugs: $geneSlugs) {
    id
    _id
    ...GeneToolTip_gene
    ...FollowGeneButton_gene
  }
}

fragment ArtistToolTip_artist on Artist {
  name
  id
  _id
  formatted_nationality_and_birthday
  href
  blurb
  carousel {
    images {
      resized(height: 200) {
        url
        width
        height
      }
      id
    }
  }
  genes {
    name
    id
  }
}

fragment MarketDataSummary_artist on Artist {
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
        id
      }
    }
  }
}

fragment FollowArtistButton_artist on Artist {
  __id
  id
  is_followed
  counts {
    follows
  }
}

fragment GeneToolTip_gene on Gene {
  description
  href
  id
  _id
  image {
    url(version: "tall")
    id
  }
  name
}

fragment FollowGeneButton_gene on Gene {
  __id
  id
  is_followed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistSlugs",
    "type": "[String!]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "geneSlugs",
    "type": "[String!]",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "artistSlugs"
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
v4 = [
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "geneSlugs"
  }
],
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
  "name": "href",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_followed",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TooltipsDataLoaderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artists",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "ArtistToolTip_artist",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "MarketDataSummary_artist",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "FollowArtistButton_artist",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "genes",
        "storageKey": null,
        "args": (v4/*: any*/),
        "concreteType": "Gene",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "GeneToolTip_gene",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "FollowGeneButton_gene",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TooltipsDataLoaderQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artists",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v5/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "formatted_nationality_and_birthday",
            "args": null,
            "storageKey": null
          },
          (v6/*: any*/),
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
                  },
                  (v2/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "genes",
            "storageKey": null,
            "args": null,
            "concreteType": "Gene",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "collections",
            "args": null,
            "storageKey": null
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
                            "selections": [
                              (v2/*: any*/)
                            ]
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
          {
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
                      (v2/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v7/*: any*/),
          (v8/*: any*/),
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
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "genes",
        "storageKey": null,
        "args": (v4/*: any*/),
        "concreteType": "Gene",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": null,
            "storageKey": null
          },
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
                "kind": "ScalarField",
                "alias": null,
                "name": "url",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "tall"
                  }
                ],
                "storageKey": "url(version:\"tall\")"
              },
              (v2/*: any*/)
            ]
          },
          (v5/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TooltipsDataLoaderQuery",
    "id": null,
    "text": "query TooltipsDataLoaderQuery(\n  $artistSlugs: [String!]\n  $geneSlugs: [String!]\n) {\n  artists(slugs: $artistSlugs) {\n    id\n    _id\n    ...ArtistToolTip_artist\n    ...MarketDataSummary_artist\n    ...FollowArtistButton_artist\n  }\n  genes(slugs: $geneSlugs) {\n    id\n    _id\n    ...GeneToolTip_gene\n    ...FollowGeneButton_gene\n  }\n}\n\nfragment ArtistToolTip_artist on Artist {\n  name\n  id\n  _id\n  formatted_nationality_and_birthday\n  href\n  blurb\n  carousel {\n    images {\n      resized(height: 200) {\n        url\n        width\n        height\n      }\n      id\n    }\n  }\n  genes {\n    name\n    id\n  }\n}\n\nfragment MarketDataSummary_artist on Artist {\n  _id\n  collections\n  highlights {\n    partners(first: 10, display_on_partner_profile: true, represented_by: true, partner_category: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResults(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized {\n          display(format: \"0a\")\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  __id\n  id\n  is_followed\n  counts {\n    follows\n  }\n}\n\nfragment GeneToolTip_gene on Gene {\n  description\n  href\n  id\n  _id\n  image {\n    url(version: \"tall\")\n    id\n  }\n  name\n}\n\nfragment FollowGeneButton_gene on Gene {\n  __id\n  id\n  is_followed\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a2937409c3f2edc519a6b78d0d2a0a82';
export default node;
