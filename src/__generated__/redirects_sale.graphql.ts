/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _redirects_sale$ref: unique symbol;
export type redirects_sale$ref = typeof _redirects_sale$ref;
export type redirects_sale = {
    readonly id: string;
    readonly is_auction: boolean | null;
    readonly is_registration_closed: boolean | null;
    readonly is_preview: boolean | null;
    readonly is_open: boolean | null;
    readonly registrationStatus: ({
        readonly qualified_for_bidding: boolean | null;
    }) | null;
    readonly " $refType": redirects_sale$ref;
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
  "name": "redirects_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "is_auction",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_registration_closed",
      "args": null,
      "storageKey": null
    },
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
      "name": "is_open",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "registrationStatus",
      "storageKey": null,
      "args": null,
      "concreteType": "Bidder",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "qualified_for_bidding",
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
(node as any).hash = '66c654d650be1bb648b7e768d4b9566b';
export default node;
