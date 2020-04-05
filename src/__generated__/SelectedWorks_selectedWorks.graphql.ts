/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SelectedWorks_selectedWorks = {
    readonly itemsConnection: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
    } | null;
    readonly " $refType": "SelectedWorks_selectedWorks";
};
export type SelectedWorks_selectedWorks$data = SelectedWorks_selectedWorks;
export type SelectedWorks_selectedWorks$key = {
    readonly " $data"?: SelectedWorks_selectedWorks$data;
    readonly " $fragmentRefs": FragmentRefs<"SelectedWorks_selectedWorks">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SelectedWorks_selectedWorks",
  "type": "OrderedSet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "itemsConnection",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtworkGrid_artworks",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = 'bb0029e03343940dad0ef07441e466f9';
export default node;
