/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _createTestEnv_artwork$ref: unique symbol;
export type createTestEnv_artwork$ref = typeof _createTestEnv_artwork$ref;
export type createTestEnv_artwork = {
    readonly title: string | null;
    readonly artist: ({
        readonly name: string | null;
    }) | null;
    readonly " $refType": createTestEnv_artwork$ref;
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
  "name": "createTestEnv_artwork",
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
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '77748b446a7cb5332e22b3fc524700a1';
export default node;
