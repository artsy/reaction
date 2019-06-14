/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkBanner_artwork$ref: unique symbol;
export type ArtworkBanner_artwork$ref = typeof _ArtworkBanner_artwork$ref;
export type ArtworkBanner_artwork = {
    readonly partner: ({
        readonly name: string | null;
        readonly initials: string | null;
    }) | null;
    readonly sale: ({
        readonly is_auction: boolean | null;
        readonly isBenefit: boolean | null;
        readonly isGalleryAuction: boolean | null;
        readonly cover_image: ({
            readonly url: string | null;
        }) | null;
    }) | null;
    readonly artworkContextAuction: ({
        readonly __typename: "ArtworkContextAuction";
        readonly name: string | null;
        readonly href: string | null;
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly artworkContextFair: ({
        readonly __typename: "ArtworkContextFair";
        readonly name: string | null;
        readonly href: string | null;
        readonly profile: ({
            readonly initials: string | null;
            readonly icon: ({
                readonly img: ({
                    readonly url: string | null;
                }) | null;
            }) | null;
        }) | null;
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly artworkContextShow: ({
        readonly __typename: "ArtworkContextShow";
        readonly name: string | null;
        readonly href: string | null;
        readonly status: string | null;
        readonly thumbnail: ({
            readonly img: ({
                readonly url: string | null;
            }) | null;
        }) | null;
    } | {
        /*This will never be '% other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly " $refType": ArtworkBanner_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "initials",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "version",
  "value": "square",
  "type": "[String]"
},
v4 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
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
v7 = [
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
      v3,
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
  },
  v4
];
return {
  "kind": "Fragment",
  "name": "ArtworkBanner_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
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
        v0,
        v1,
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_auction",
          "args": null,
          "storageKey": null
        },
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
                v3
              ],
              "storageKey": "url(version:\"square\")"
            },
            v4
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
        v5,
        v2,
        {
          "kind": "InlineFragment",
          "type": "ArtworkContextAuction",
          "selections": [
            v0,
            v6
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
        v5,
        v2,
        {
          "kind": "InlineFragment",
          "type": "ArtworkContextFair",
          "selections": [
            v0,
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
                v1,
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "icon",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Image",
                  "plural": false,
                  "selections": v7
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
      "alias": "artworkContextShow",
      "name": "context",
      "storageKey": null,
      "args": null,
      "concreteType": null,
      "plural": false,
      "selections": [
        v5,
        v2,
        {
          "kind": "InlineFragment",
          "type": "ArtworkContextShow",
          "selections": [
            v0,
            v6,
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
              "selections": v7
            }
          ]
        }
      ]
    },
    v2
  ]
};
})();
(node as any).hash = '0b8dbf774b64eb873aa039f6bd031c78';
export default node;
