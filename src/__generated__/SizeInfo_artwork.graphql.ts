/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type SizeInfo_artwork = {
    readonly dimensions: ({
        readonly in: string | null;
        readonly cm: string | null;
    }) | null;
    readonly edition_of: string | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SizeInfo_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "dimensions",
      "storageKey": null,
      "args": null,
      "concreteType": "dimensions",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "in",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cm",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "edition_of",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '6fcd4868f74b2927a73cf4ce7b5722a9';
export default node;
