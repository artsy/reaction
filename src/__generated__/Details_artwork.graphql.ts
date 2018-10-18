/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Details_artwork$ref: unique symbol;
export type Details_artwork$ref = typeof _Details_artwork$ref;
export type Details_artwork = {
    readonly href: string | null;
    readonly title: string | null;
    readonly date: string | null;
    readonly sale_message: string | null;
    readonly cultural_maker: string | null;
    readonly artists: ReadonlyArray<({
        readonly __id: string;
        readonly href: string | null;
        readonly name: string | null;
    }) | null> | null;
    readonly collecting_institution: string | null;
    readonly partner: ({
        readonly name: string | null;
        readonly href: string | null;
    }) | null;
    readonly sale: ({
        readonly is_auction: boolean | null;
        readonly is_live_open: boolean | null;
        readonly is_open: boolean | null;
        readonly is_closed: boolean | null;
        readonly display_timely_at: string | null;
        readonly auction_state: string | null;
    }) | null;
    readonly sale_artwork: ({
        readonly highest_bid: ({
            readonly display: string | null;
        }) | null;
        readonly opening_bid: ({
            readonly display: string | null;
        }) | null;
    }) | null;
    readonly " $refType": Details_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
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
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Details_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": "artists(shallow:true)",
      "args": v0,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        v1,
        v2,
        v3
      ]
    },
    v2,
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
      "name": "sale_message",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cultural_maker",
      "args": null,
      "storageKey": null
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
      "name": "collecting_institution",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": "partner(shallow:true)",
      "args": v0,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        v3,
        v2,
        v1
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
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "display_timely_at",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "auction_state",
          "args": null,
          "storageKey": null
        },
        v1
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
          "selections": [
            v4,
            {
              "kind": "ScalarField",
              "alias": "__id",
              "name": "id",
              "args": null,
              "storageKey": null
            }
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
          "selections": [
            v4
          ]
        },
        v1
      ]
    },
    v1
  ]
};
})();
(node as any).hash = '6c8e96bbb549d363d5dd7a66cc56d100';
export default node;
