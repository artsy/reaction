/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _BidForm_me$ref: unique symbol;
export type BidForm_me$ref = typeof _BidForm_me$ref;
export type BidForm_me = {
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $refType": BidForm_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "BidForm_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "hasQualifiedCreditCards",
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
(node as any).hash = '7f8137c88b31245f0b14d6df94c90179';
export default node;
