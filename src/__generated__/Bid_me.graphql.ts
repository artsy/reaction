/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _Bid_me$ref: unique symbol;
export type Bid_me$ref = typeof _Bid_me$ref;
export type Bid_me = {
    readonly has_qualified_credit_cards: boolean | null;
    readonly " $refType": Bid_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Bid_me",
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
(node as any).hash = '424f05fcb1808f5cbdcc3a0c6c7e8899';
export default node;
