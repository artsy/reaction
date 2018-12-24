/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Save_artwork$ref: unique symbol;
export type Save_artwork$ref = typeof _Save_artwork$ref;
export type Save_artwork = {
    readonly __id: string;
    readonly id: string;
    readonly is_saved: boolean | null;
    readonly sale: ({
        readonly is_closed: boolean | null;
    }) | null;
    readonly " $refType": Save_artwork$ref;
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
  "name": "Save_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_saved",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_closed",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    }
  ]
};
})();
(node as any).hash = '225185869af193663c3f62e57c89efbb';
export default node;
