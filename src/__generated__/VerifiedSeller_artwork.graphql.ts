/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _VerifiedSeller_artwork$ref: unique symbol;
export type VerifiedSeller_artwork$ref = typeof _VerifiedSeller_artwork$ref;
export type VerifiedSeller_artwork = {
    readonly is_biddable: boolean | null;
    readonly partner: ({
        readonly isVerifiedSeller: boolean | null;
        readonly name: string | null;
    }) | null;
    readonly " $refType": VerifiedSeller_artwork$ref;
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
  "name": "VerifiedSeller_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_biddable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "isVerifiedSeller",
          "args": null,
          "storageKey": null
        },
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
(node as any).hash = '5037e65d788b7be2400c0a017b8257e6';
export default node;
