/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PurchaseApp_orders = {
    readonly " $fragmentRefs": FragmentRefs<"PurchaseHistory_orders">;
    readonly " $refType": "PurchaseApp_orders";
};
export type PurchaseApp_orders$data = PurchaseApp_orders;
export type PurchaseApp_orders$key = {
    readonly " $data"?: PurchaseApp_orders$data;
    readonly " $fragmentRefs": FragmentRefs<"PurchaseApp_orders">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "PurchaseApp_orders",
  "type": "CommerceOrderConnectionWithTotalCount",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "PurchaseHistory_orders",
      "args": null
    }
  ]
};
(node as any).hash = '6b2892b43948ac49c6f86b1ecefca027';
export default node;
