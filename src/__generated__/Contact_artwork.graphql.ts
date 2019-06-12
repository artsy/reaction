/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _Contact_artwork$ref: unique symbol;
export type Contact_artwork$ref = typeof _Contact_artwork$ref;
export type Contact_artwork = {
    readonly _id: string;
    readonly href: string | null;
    readonly is_inquireable: boolean | null;
    readonly sale: {
        readonly is_auction: boolean | null;
        readonly is_live_open: boolean | null;
        readonly is_open: boolean | null;
        readonly is_closed: boolean | null;
    } | null;
    readonly partner: {
        readonly type: string | null;
    } | null;
    readonly sale_artwork: {
        readonly highest_bid: {
            readonly display: string | null;
        } | null;
        readonly opening_bid: {
            readonly display: string | null;
        } | null;
        readonly counts: {
            readonly bidder_positions: any | null;
        } | null;
    } | null;
    readonly " $refType": Contact_artwork$ref;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "Contact_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_inquireable",
      "args": null,
      "storageKey": null
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
          "name": "is_live_open",
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
          "name": "is_closed",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": "partner(shallow:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Partner",
      "plural": false,
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
          "kind": "LinkedField",
          "alias": null,
          "name": "highest_bid",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkHighestBid",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "opening_bid",
          "storageKey": null,
          "args": null,
          "concreteType": "SaleArtworkOpeningBid",
          "plural": false,
          "selections": (v0/*: any*/)
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
        }
      ]
    }
  ]
};
})();
(node as any).hash = '15c2a7973aeb8fd0202f593635e2bbf2';
export default node;
