/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OrderFulfillmentType = "PICKUP" | "SHIP" | "%future added value";
export type SetOrderShippingInput = {
    readonly orderId?: string | null;
    readonly fulfillmentType?: OrderFulfillmentType | null;
    readonly shipping?: ShippingInputField | null;
    readonly clientMutationId?: string | null;
};
export type ShippingInputField = {
    readonly name?: string | null;
    readonly addressLine1?: string | null;
    readonly addressLine2?: string | null;
    readonly city?: string | null;
    readonly region?: string | null;
    readonly country?: string | null;
    readonly postalCode?: string | null;
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
            readonly errors: ReadonlyArray<string | null> | null;
        }) | null;
    }) | null;
};
export type ShippingOrderAddressUpdateMutation = {
    readonly response: ShippingOrderAddressUpdateMutationResponse;
    readonly variables: ShippingOrderAddressUpdateMutationVariables;
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
      errors
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
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "errors",
            "args": null,
            "storageKey": null
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
  "text": "mutation ShippingOrderAddressUpdateMutation(\n  $input: SetOrderShippingInput!\n) {\n  setOrderShipping(input: $input) {\n    result {\n      order {\n        state\n        __id: id\n      }\n      errors\n    }\n  }\n}\n",
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
(node as any).hash = '8c15f3b0558274117be3712f4a6a3afb';
export default node;
