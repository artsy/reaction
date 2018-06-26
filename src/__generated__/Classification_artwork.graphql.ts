/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Classification_artwork = {
    readonly attribution_class: ({
        readonly short_description: string | null;
    }) | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Classification_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "attribution_class",
      "storageKey": null,
      "args": null,
      "concreteType": "AttributionClass",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "short_description",
          "args": null,
          "storageKey": null
        }
      ]
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
(node as any).hash = '202933edab49cbd90a8a93f3c0e0fab8';
export default node;
