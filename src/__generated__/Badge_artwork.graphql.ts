/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Badge_artwork$ref: unique symbol;
export type Badge_artwork$ref = typeof _Badge_artwork$ref;
export type Badge_artwork = {
    readonly is_biddable: boolean | null;
    readonly is_acquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly href: string | null;
    readonly sale: ({
        readonly is_preview: boolean | null;
        readonly display_timely_at: string | null;
    }) | null;
    readonly " $refType": Badge_artwork$ref;
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
  "name": "Badge_artwork",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "is_acquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_offerable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
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
          "name": "is_preview",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "display_timely_at",
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
(node as any).hash = '2acc89282c0f63455bd559089466e8f5';
export default node;
