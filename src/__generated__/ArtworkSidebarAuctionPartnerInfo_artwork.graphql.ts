/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkSidebarAuctionPartnerInfo_artwork$ref: unique symbol;
export type ArtworkSidebarAuctionPartnerInfo_artwork$ref = typeof _ArtworkSidebarAuctionPartnerInfo_artwork$ref;
export type ArtworkSidebarAuctionPartnerInfo_artwork = {
    readonly _id: string;
    readonly partner: ({
        readonly _id: string;
        readonly name: string | null;
    }) | null;
    readonly sale_artwork: ({
        readonly estimate: string | null;
    }) | null;
    readonly sale: ({
        readonly _id: string;
        readonly is_closed: boolean | null;
        readonly is_with_buyers_premium: boolean | null;
    }) | null;
    readonly " $refType": ArtworkSidebarAuctionPartnerInfo_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarAuctionPartnerInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
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
          "kind": "ScalarField",
          "alias": null,
          "name": "estimate",
          "args": null,
          "storageKey": null
        },
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
        v0,
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
          "name": "is_with_buyers_premium",
          "args": null,
          "storageKey": null
        },
        v1
      ]
    },
    v1
  ]
};
})();
(node as any).hash = 'e1fe54df68d7f574fbcb85149c14f99e';
export default node;
