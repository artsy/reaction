/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ShippingAndPaymentReview_order$ref } from "./ShippingAndPaymentReview_order.graphql";
import { ShippingAndPaymentSummary_order$ref } from "./ShippingAndPaymentSummary_order.graphql";
export type ShippingAndPaymentDetailsQueryVariables = {};
export type ShippingAndPaymentDetailsQueryResponse = {
    readonly order: ({
        readonly " $fragmentRefs": ShippingAndPaymentSummary_order$ref & ShippingAndPaymentReview_order$ref;
    }) | null;
};
export type ShippingAndPaymentDetailsQuery = {
    readonly response: ShippingAndPaymentDetailsQueryResponse;
    readonly variables: ShippingAndPaymentDetailsQueryVariables;
};



/*
query ShippingAndPaymentDetailsQuery {
  order: ecommerceOrder(id: "foo") {
    ...ShippingAndPaymentSummary_order
    ...ShippingAndPaymentReview_order
    __id: id
  }
}

fragment ShippingAndPaymentSummary_order on Order {
  state
  requestedFulfillment {
    __typename
    ...ShippingAddress_ship
  }
  lineItems {
    edges {
      node {
        artwork {
          shippingOrigin
          __id
        }
        __id: id
      }
    }
  }
  creditCard {
    brand
    last_digits
    expiration_year
    expiration_month
    __id
  }
  __id: id
}

fragment ShippingAndPaymentReview_order on Order {
  mode
  totalListPrice(precision: 2)
  itemsTotal(precision: 2)
  requestedFulfillment {
    __typename
    ...ShippingAddress_ship
  }
  lineItems {
    edges {
      node {
        artwork {
          shippingOrigin
          __id
        }
        __id: id
      }
    }
  }
  creditCard {
    brand
    last_digits
    expiration_year
    expiration_month
    __id
  }
  __id: id
}

fragment ShippingAddress_ship on Ship {
  name
  addressLine1
  addressLine2
  city
  postalCode
  region
  country
  phoneNumber
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ShippingAndPaymentDetailsQuery",
  "id": null,
  "text": "query ShippingAndPaymentDetailsQuery {\n  order: ecommerceOrder(id: \"foo\") {\n    ...ShippingAndPaymentSummary_order\n    ...ShippingAndPaymentReview_order\n    __id: id\n  }\n}\n\nfragment ShippingAndPaymentSummary_order on Order {\n  state\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  creditCard {\n    brand\n    last_digits\n    expiration_year\n    expiration_month\n    __id\n  }\n  __id: id\n}\n\nfragment ShippingAndPaymentReview_order on Order {\n  mode\n  totalListPrice(precision: 2)\n  itemsTotal(precision: 2)\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  creditCard {\n    brand\n    last_digits\n    expiration_year\n    expiration_month\n    __id\n  }\n  __id: id\n}\n\nfragment ShippingAddress_ship on Ship {\n  name\n  addressLine1\n  addressLine2\n  city\n  postalCode\n  region\n  country\n  phoneNumber\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ShippingAndPaymentDetailsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": "ecommerceOrder(id:\"foo\")",
        "args": v0,
        "concreteType": "Order",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ShippingAndPaymentSummary_order",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "ShippingAndPaymentReview_order",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ShippingAndPaymentDetailsQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": "ecommerceOrder(id:\"foo\")",
        "args": v0,
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
            "kind": "LinkedField",
            "alias": null,
            "name": "requestedFulfillment",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "__typename",
                "args": null,
                "storageKey": null
              },
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
                    "name": "postalCode",
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
                    "name": "phoneNumber",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lineItems",
            "storageKey": null,
            "args": null,
            "concreteType": "OrderLineItemConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "OrderLineItemEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "OrderLineItem",
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
                            "name": "shippingOrigin",
                            "args": null,
                            "storageKey": null
                          },
                          v2
                        ]
                      },
                      v1
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCard",
            "storageKey": null,
            "args": null,
            "concreteType": "CreditCard",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "brand",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "last_digits",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "expiration_year",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "expiration_month",
                "args": null,
                "storageKey": null
              },
              v2
            ]
          },
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "mode",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": v3,
            "storageKey": "totalListPrice(precision:2)"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "itemsTotal",
            "args": v3,
            "storageKey": "itemsTotal(precision:2)"
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '12d0982905e17e0658cff7975cc336af';
export default node;
