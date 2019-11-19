/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtworkSidebarClassification_artwork = {
    readonly attribution_class: {
        readonly short_description: string | null;
    } | null;
    readonly " $refType": "ArtworkSidebarClassification_artwork";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarClassification_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "attribution_class",
      "name": "attributionClass",
      "storageKey": null,
      "args": null,
      "concreteType": "AttributionClass",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": "short_description",
          "name": "shortDescription",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '8207b17fc2db26e6b886dd476a7920bf';
export default node;
