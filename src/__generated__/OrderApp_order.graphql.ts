/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OrderApp_order = {
    readonly mode: CommerceOrderModeEnum | null;
    readonly lineItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artwork: {
                    readonly slug: string;
                    readonly is_acquireable: boolean | null;
                    readonly is_offerable: boolean | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "OrderApp_order";
};
export type OrderApp_order$data = OrderApp_order;
export type OrderApp_order$key = {
    readonly " $data"?: OrderApp_order$data;
    readonly " $fragmentRefs": FragmentRefs<"OrderApp_order">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "OrderApp_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "mode",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lineItems",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceLineItemConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "slug",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": "is_acquireable",
                      "name": "isAcquireable",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": "is_offerable",
                      "name": "isOfferable",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '9fc62d5ccf7d952e69863f2952d5bf51';
export default node;
