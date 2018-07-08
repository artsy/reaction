/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtworkSidebarBidAction_artwork = {
    readonly sale: ({
        readonly is_preview: boolean | null;
        readonly is_open: boolean | null;
        readonly is_live_open: boolean | null;
        readonly is_closed: boolean | null;
        readonly is_registration_closed: boolean | null;
    }) | null;
    readonly sale_artwork: ({
        readonly increments: ReadonlyArray<({
            readonly display: string | null;
        }) | null> | null;
    }) | null;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarBidAction_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
          "name": "is_preview",
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
          "name": "is_live_open",
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
          "name": "is_registration_closed",
          "args": null,
          "storageKey": null
        },
        v0
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
          "name": "increments",
          "storageKey": null,
          "args": null,
          "concreteType": "BidIncrementsFormatted",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "display",
              "args": null,
              "storageKey": null
            }
          ]
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = 'a2fc9fb9d800ee9087db60bedbf1fc91';
export default node;
