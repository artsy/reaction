/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtworkMetadata_artwork = {
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
  "name": "ArtworkMetadata_artwork",
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
      "name": "TitleInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "SizeInfo_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Classification_artwork",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = '9d43f215573fd93c5a3460a588e25adc';
export default node;
