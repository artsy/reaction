/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Sidebar_artwork = {
    readonly is_biddable: boolean | null;
    readonly is_in_auction: boolean | null;
    readonly sale_artwork: ({
        readonly lot_label: string | null;
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
  "name": "Sidebar_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "AuctionPartnerInfo_artwork",
      "args": null
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
        v0
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "Artists_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkMetadata_artwork",
      "args": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_in_auction",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "CurrentBidInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Commercial_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PartnerInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ExtraLinks_artwork",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = '896d2fe54fa63ebb7a423eb1b3c93b67';
export default node;
