/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _MockRelayRenderer_artist$ref: unique symbol;
export type MockRelayRenderer_artist$ref = typeof _MockRelayRenderer_artist$ref;
export type MockRelayRenderer_artist = {
    readonly name: string | null;
    readonly " $refType": MockRelayRenderer_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "MockRelayRenderer_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
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
(node as any).hash = '21290c447f406913d871869bb737c717';
export default node;
