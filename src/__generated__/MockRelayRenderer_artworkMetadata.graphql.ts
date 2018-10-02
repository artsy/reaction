/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _MockRelayRenderer_artworkMetadata$ref: unique symbol;
export type MockRelayRenderer_artworkMetadata$ref = typeof _MockRelayRenderer_artworkMetadata$ref;
export type MockRelayRenderer_artworkMetadata = {
    readonly title: string | null;
    readonly " $refType": MockRelayRenderer_artworkMetadata$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "MockRelayRenderer_artworkMetadata",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
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
(node as any).hash = '987763c86f1b83c5aa0574a6c4dc4c60';
export default node;
