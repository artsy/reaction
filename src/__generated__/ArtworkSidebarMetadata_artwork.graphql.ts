/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSidebarClassification_artwork$ref } from "./ArtworkSidebarClassification_artwork.graphql";
import { ArtworkSidebarSizeInfo_piece$ref } from "./ArtworkSidebarSizeInfo_piece.graphql";
import { ArtworkSidebarTitleInfo_artwork$ref } from "./ArtworkSidebarTitleInfo_artwork.graphql";
declare const _ArtworkSidebarMetadata_artwork$ref: unique symbol;
export type ArtworkSidebarMetadata_artwork$ref = typeof _ArtworkSidebarMetadata_artwork$ref;
export type ArtworkSidebarMetadata_artwork = {
    readonly is_biddable: boolean | null;
    readonly edition_sets: ReadonlyArray<({
        readonly __id: string;
    }) | null> | null;
    readonly sale_artwork: ({
        readonly lot_label: string | null;
    }) | null;
    readonly " $fragmentRefs": ArtworkSidebarTitleInfo_artwork$ref & ArtworkSidebarSizeInfo_piece$ref & ArtworkSidebarClassification_artwork$ref;
    readonly " $refType": ArtworkSidebarMetadata_artwork$ref;
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
  "name": "ArtworkSidebarMetadata_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "edition_sets",
      "storageKey": null,
      "args": null,
      "concreteType": "EditionSet",
      "plural": true,
      "selections": [
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
      "name": "ArtworkSidebarTitleInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarSizeInfo_piece",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarClassification_artwork",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = '04f48094f4aca61848838f497c242421';
export default node;
