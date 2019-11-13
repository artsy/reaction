/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { BidForm_me$ref } from "./BidForm_me.graphql";
declare const _ConfirmBid_me$ref: unique symbol;
export type ConfirmBid_me$ref = typeof _ConfirmBid_me$ref;
export type ConfirmBid_me = {
    readonly id: string;
    readonly hasQualifiedCreditCards: boolean | null;
    readonly " $fragmentRefs": BidForm_me$ref;
    readonly " $refType": ConfirmBid_me$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ConfirmBid_me",
  "type": "Me",
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
      "alias": "hasQualifiedCreditCards",
      "name": "has_qualified_credit_cards",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "BidForm_me",
      "args": null
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
(node as any).hash = '1d5fb927e240a30087d3ea0cdb5d7ca6';
export default node;
