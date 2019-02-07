/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSidebarArtists_artwork$ref } from "./ArtworkSidebarArtists_artwork.graphql";
import { ArtworkSidebarAuctionPartnerInfo_artwork$ref } from "./ArtworkSidebarAuctionPartnerInfo_artwork.graphql";
import { ArtworkSidebarBidAction_artwork$ref } from "./ArtworkSidebarBidAction_artwork.graphql";
import { ArtworkSidebarCommercial_artwork$ref } from "./ArtworkSidebarCommercial_artwork.graphql";
import { ArtworkSidebarCurrentBidInfo_artwork$ref } from "./ArtworkSidebarCurrentBidInfo_artwork.graphql";
import { ArtworkSidebarExtraLinks_artwork$ref } from "./ArtworkSidebarExtraLinks_artwork.graphql";
import { ArtworkSidebarMetadata_artwork$ref } from "./ArtworkSidebarMetadata_artwork.graphql";
import { ArtworkSidebarPartnerInfo_artwork$ref } from "./ArtworkSidebarPartnerInfo_artwork.graphql";
import { AuctionTimer_sale$ref } from "./AuctionTimer_sale.graphql";
declare const _ArtworkSidebar_artwork$ref: unique symbol;
export type ArtworkSidebar_artwork$ref = typeof _ArtworkSidebar_artwork$ref;
export type ArtworkSidebar_artwork = {
    readonly is_in_auction: boolean | null;
    readonly sale: ({
        readonly is_closed: boolean | null;
        readonly " $fragmentRefs": AuctionTimer_sale$ref;
    }) | null;
    readonly " $fragmentRefs": ArtworkSidebarArtists_artwork$ref & ArtworkSidebarMetadata_artwork$ref & ArtworkSidebarAuctionPartnerInfo_artwork$ref & ArtworkSidebarCurrentBidInfo_artwork$ref & ArtworkSidebarBidAction_artwork$ref & ArtworkSidebarCommercial_artwork$ref & ArtworkSidebarPartnerInfo_artwork$ref & ArtworkSidebarExtraLinks_artwork$ref;
    readonly " $refType": ArtworkSidebar_artwork$ref;
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
  "name": "ArtworkSidebar_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarBidAction_artwork",
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
      "name": "ArtworkSidebarMetadata_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionPartnerInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCurrentBidInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarArtists_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarCommercial_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarPartnerInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarExtraLinks_artwork",
      "args": null
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
          "name": "is_closed",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "AuctionTimer_sale",
          "args": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = 'caa524c1e86a737fdf6e66a8b95e2bc8';
export default node;
