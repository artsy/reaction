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
    readonly phoneNumber?: string | null;
};
export type ShippingOrderAddressUpdateMutationVariables = {
    readonly input: SetOrderShippingInput;
};
export type ShippingOrderAddressUpdateMutationResponse = {
    readonly ecommerceSetOrderShipping: ({
        readonly orderOrError: ({
            readonly __typename: "OrderWithMutationSuccess";
            readonly order?: ({
                readonly id: string | null;
                readonly state: string | null;
                readonly requestedFulfillment: ({
                    readonly __typename: "Ship";
                    readonly name: string | null;
                    readonly addressLine1: string | null;
                    readonly addressLine2: string | null;
                    readonly city: string | null;
                    readonly region: string | null;
                    readonly country: string;
                    readonly postalCode: string | null;
                    readonly phoneNumber: string | null;
                } | {
                    /*This will never be '% other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
            }) | null;
            readonly error?: ({
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            }) | null;
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
  ecommerceSetOrderShipping(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        __typename
        order {
          __typename
          id
          state
          requestedFulfillment {
            __typename
            ... on Ship {
              name
              addressLine1
              addressLine2
              city
              region
              country
              postalCode
              phoneNumber
            }
          }
          __id: id
        }
      }
      ... on OrderWithMutationFailure {
        error {
          type
          code
          data
        }
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "SetOrderShippingInput!"
  }
],
v2 = {
  "kind": "InlineFragment",
  "type": "OrderWithMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "error",
      "storageKey": null,
      "args": null,
      "concreteType": "EcommerceError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "code",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "data",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "requestedFulfillment",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    v3,
    {
      "kind": "InlineFragment",
      "type": "Ship",
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "addressLine1",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "addressLine2",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "city",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "region",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "country",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "postalCode",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "phoneNumber",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v7 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "ShippingOrderAddressUpdateMutation",
  "id": null,
  "text": "mutation ShippingOrderAddressUpdateMutation(\n  $input: SetOrderShippingInput!\n) {\n  ecommerceSetOrderShipping(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          id\n          state\n          requestedFulfillment {\n            __typename\n            ... on Ship {\n              name\n              addressLine1\n              addressLine2\n              city\n              region\n              country\n              postalCode\n              phoneNumber\n            }\n          }\n          __id: id\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ShippingOrderAddressUpdateMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSetOrderShipping",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetOrderShippingPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v2,
              {
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  v3,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      v4,
                      v5,
                      v6,
                      v7
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingOrderAddressUpdateMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSetOrderShipping",
        "storageKey": null,
        "args": v1,
        "concreteType": "SetOrderShippingPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v3,
              v2,
              {
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  v3,
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      v3,
                      v4,
                      v5,
                      v6,
                      v7
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '46e5953502991373be73e849583f9fb9';
export default node;
