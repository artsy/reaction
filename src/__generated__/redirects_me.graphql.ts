/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _redirects_me$ref: unique symbol;
export type redirects_me$ref = typeof _redirects_me$ref;
export type redirects_me = {
    readonly has_qualified_credit_cards: boolean | null;
    readonly " $refType": redirects_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "redirects_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "has_qualified_credit_cards",
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
(node as any).hash = '3415c6dd0dfd0accbba4a38a64800f5e';
export default node;
