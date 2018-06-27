/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type SizeInfo_piece = {
    readonly dimensions: ({
        readonly in: string | null;
        readonly cm: string | null;
    }) | null;
    readonly edition_of: string | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SizeInfo_piece",
  "type": "Saleable",
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
(node as any).hash = 'cd91af58255ca71c20e07cdb4a298c3f';
export default node;
