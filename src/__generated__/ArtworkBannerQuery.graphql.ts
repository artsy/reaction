/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkBanner_artwork$ref } from "./ArtworkBanner_artwork.graphql";
export type ArtworkBannerQueryVariables = {
    readonly artworkID: string;
};
export type ArtworkBannerQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkBanner_artwork$ref;
    }) | null;
};
export type ArtworkBannerQuery = {
    readonly response: ArtworkBannerQueryResponse;
    readonly variables: ArtworkBannerQueryVariables;
};



/*
query ArtworkBannerQuery(
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...ArtworkBanner_artwork
    __id
  }
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
      href
      __id
    }
    __id
  }
  sale {
    is_auction
    is_benefit
    isGalleryAuction
    cover_image {
      url(version: "square")
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
  "name": "type",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "initials",
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
  "name": "is_auction",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "version",
  "value": "square",
  "type": "[String]"
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v10 = [
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
      v8,
      {
        "kind": "Literal",
        "name": "width",
        "value": 70,
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
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkBannerQuery",
  "id": null,
  "text": "query ArtworkBannerQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...ArtworkBanner_artwork\n    __id\n  }\n}\n\nfragment ArtworkBanner_artwork on Artwork {\n  partner {\n    type\n    name\n    initials\n    profile {\n      icon {\n        url(version: \"square140\")\n      }\n      href\n      __id\n    }\n    __id\n  }\n  sale {\n    is_auction\n    is_benefit\n    isGalleryAuction\n    cover_image {\n      url(version: \"square\")\n    }\n    __id\n  }\n  artworkContextAuction: context {\n    __typename\n    ... on ArtworkContextAuction {\n      name\n      href\n      is_auction\n      is_closed\n      is_open\n      live_start_at\n      live_url_if_open\n    }\n    ... on Node {\n      __id\n    }\n    ... on ArtworkContextFair {\n      __id\n    }\n  }\n  artworkContextFair: context {\n    __typename\n    ... on ArtworkContextFair {\n      name\n      href\n      is_active\n      start_at\n      end_at\n      profile {\n        initials\n        icon {\n          img: resized(width: 70, height: 70, version: \"square\") {\n            url\n          }\n        }\n        __id\n      }\n      __id\n    }\n    ... on Node {\n      __id\n    }\n  }\n  artworkContextPartnerShow: context {\n    __typename\n    ... on ArtworkContextPartnerShow {\n      name\n      href\n      type\n      status\n      thumbnail: cover_image {\n        img: resized(width: 70, height: 70, version: \"square\") {\n          url\n        }\n      }\n    }\n    ... on Node {\n      __id\n    }\n    ... on ArtworkContextFair {\n      __id\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkBannerQuery",
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
            "name": "ArtworkBanner_artwork",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkBannerQuery",
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
              v5,
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
                  v6,
                  v2
                ]
              },
              v2
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
              v7,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_benefit",
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
                      v8
                    ],
                    "storageKey": "url(version:\"square\")"
                  }
                ]
              },
              v2
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
              v9,
              v2,
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextAuction",
                "selections": [
                  v4,
                  v6,
                  v7,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "is_closed",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "is_open",
                    "args": null,
                    "storageKey": null
                  },
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
              v9,
              v2,
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextFair",
                "selections": [
                  v4,
                  v6,
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
                      v5,
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "icon",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": v10
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
              v9,
              v2,
              {
                "kind": "InlineFragment",
                "type": "ArtworkContextPartnerShow",
                "selections": [
                  v4,
                  v6,
                  v3,
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
                    "selections": v10
                  }
                ]
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '57669525925ecb7643ccd32c0a3a66a8';
export default node;
