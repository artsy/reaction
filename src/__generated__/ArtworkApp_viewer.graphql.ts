/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type ArtworkApp_viewer = {
    readonly artwork: ({
        readonly description: string | null;
    }) | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkApp_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "artworkID",
      "type": "String!"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artwork",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "artworkID",
          "type": "String!"
        }
      ],
      "concreteType": "Artwork",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "description",
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
    }
  ]
};
(node as any).hash = '9899b78a8ebb08edccc0f6b15755b8c5';
export default node;
