/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtworkSidebarMetadata_artwork = {
    readonly edition_sets: ReadonlyArray<({
        readonly __id: string;
    }) | null> | null;
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
(node as any).hash = 'b989f89262b9a42e30332c3a0244dd8a';
export default node;
