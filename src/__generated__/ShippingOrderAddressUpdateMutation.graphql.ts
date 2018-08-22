/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OrderFulfillmentType = "PICKUP" | "SHIP" | "%future added value";
export type SetOrderShippingInput = {
    readonly orderId?: string | null;
    readonly fulfillmentType?: OrderFulfillmentType | null;
    readonly shippingName?: string | null;
    readonly shippingAddressLine1?: string | null;
    readonly shippingAddressLine2?: string | null;
    readonly shippingCity?: string | null;
    readonly shippingRegion?: string | null;
    readonly shippingCountry?: string | null;
    readonly shippingPostalCode?: string | null;
    readonly clientMutationId?: string | null;
};
export type ShippingOrderAddressUpdateMutationVariables = {
    readonly input: SetOrderShippingInput;
};
export type ShippingOrderAddressUpdateMutationResponse = {
    readonly setOrderShipping: ({
        readonly result: ({
            readonly order: ({
                readonly state: string | null;
            }) | null;
        }) | null;
    }) | null;
};



/*
mutation ShippingOrderAddressUpdateMutation(
  $input: SetOrderShippingInput!
) {
  setOrderShipping(input: $input) {
    result {
      order {
        state
        __id: id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "SetOrderShippingInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "setOrderShipping",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "SetOrderShippingInput!"
      }
    ],
    "concreteType": "SetOrderShippingPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "result",
        "storageKey": null,
        "args": null,
        "concreteType": "OrderReturnType",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "order",
            "storageKey": null,
            "args": null,
            "concreteType": "Order",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "state",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "__id",
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "ShippingOrderAddressUpdateMutation",
  "id": null,
  "text": "mutation ShippingOrderAddressUpdateMutation(\n  $input: SetOrderShippingInput!\n) {\n  setOrderShipping(input: $input) {\n    result {\n      order {\n        state\n        __id: id\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ShippingOrderAddressUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingOrderAddressUpdateMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'a58cd0e6d450018a34b8ca4b546ba826';
export default node;
