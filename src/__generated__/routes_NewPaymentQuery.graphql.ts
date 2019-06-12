/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { NewPayment_me$ref } from "./NewPayment_me.graphql";
import { NewPayment_order$ref } from "./NewPayment_order.graphql";
export type routes_NewPaymentQueryVariables = {
    readonly orderID: string;
};
export type routes_NewPaymentQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": NewPayment_me$ref;
    } | null;
    readonly order: {
        readonly " $fragmentRefs": NewPayment_order$ref;
    } | null;
};
export type routes_NewPaymentQuery = {
    readonly response: routes_NewPaymentQueryResponse;
    readonly variables: routes_NewPaymentQueryVariables;
};



/*
query routes_NewPaymentQuery(
  $orderID: String!
) {
  me {
    ...NewPayment_me
    id
  }
  order: ecommerceOrder(id: $orderID) {
    __typename
    ...NewPayment_order
    id
  }
}

fragment NewPayment_me on Me {
  ...PaymentPicker_me
}

fragment NewPayment_order on Order {
  id
  mode
  stateExpiresAt
  lineItems {
    edges {
      node {
        artwork {
          id
          artists {
            id
          }
        }
        id
      }
    }
  }
  ... on OfferOrder {
    lastOffer {
      createdAt
      id
      note
    }
  }
  ...PaymentPicker_order
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
}

fragment PaymentPicker_order on Order {
  id
  mode
  state
  creditCard {
    id
    name
    street1
    street2
    city
    state
    country
    postal_code
    expiration_month
    expiration_year
    last_digits
    brand
  }
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
    }
    ... on Pickup {
      fulfillmentType
    }
  }
  lineItems {
    edges {
      node {
        artwork {
          id
        }
        id
      }
    }
  }
}

fragment ArtworkSummaryItem_order on Order {
  seller {
    __typename
    ... on Partner {
      name
    }
    ... on User {
      id
    }
  }
  lineItems {
    edges {
      node {
        artwork {
          artist_names
          title
          date
          shippingOrigin
          image {
            resized_ArtworkSummaryItem: resized(width: 55) {
              url
            }
            id
          }
          id
        }
        id
      }
    }
  }
}

fragment TransactionDetailsSummaryItem_order on Order {
  __typename
  mode
  shippingTotal(precision: 2)
  shippingTotalCents
  taxTotal(precision: 2)
  taxTotalCents
  itemsTotal(precision: 2)
  totalListPrice(precision: 2)
  buyerTotal(precision: 2)
  ... on OfferOrder {
    lastOffer {
      id
      amount(precision: 2)
      amountCents
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      buyerTotal(precision: 2)
      buyerTotalCents
      fromParticipant
      note
    }
    myLastOffer {
      id
      amount(precision: 2)
      amountCents
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      buyerTotal(precision: 2)
      buyerTotalCents
      fromParticipant
      note
    }
  }
}

fragment PaymentPicker_me on Me {
  creditCards(first: 100) {
    edges {
      node {
        id
        brand
        last_digits
        expiration_month
        expiration_year
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "brand",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "last_digits",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "expiration_month",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "expiration_year",
  "args": null,
  "storageKey": null
},
v7 = [
  (v2/*: any*/)
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "city",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "country",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v13 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": (v13/*: any*/),
  "storageKey": "shippingTotal(precision:2)"
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": (v13/*: any*/),
  "storageKey": "taxTotal(precision:2)"
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotal",
  "args": (v13/*: any*/),
  "storageKey": "buyerTotal(precision:2)"
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "note",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": (v13/*: any*/),
  "storageKey": "amount(precision:2)"
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amountCents",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotalCents",
  "args": null,
  "storageKey": null
},
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fromParticipant",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_NewPaymentQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "NewPayment_me",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "NewPayment_order",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_NewPaymentQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCards",
            "storageKey": "creditCards(first:100)",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100
              }
            ],
            "concreteType": "CreditCardConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "CreditCardEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v2/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "stateExpiresAt",
            "args": null,
            "storageKey": null
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
                          (v2/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": (v7/*: any*/)
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "artist_names",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "title",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "date",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "shippingOrigin",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": "resized_ArtworkSummaryItem",
                                "name": "resized",
                                "storageKey": "resized(width:55)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 55
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "url",
                                    "args": null,
                                    "storageKey": null
                                  }
                                ]
                              },
                              (v2/*: any*/)
                            ]
                          }
                        ]
                      },
                      (v2/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCard",
            "storageKey": null,
            "args": null,
            "concreteType": "CreditCard",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v9/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "street1",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "street2",
                "args": null,
                "storageKey": null
              },
              (v10/*: any*/),
              (v8/*: any*/),
              (v11/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "postal_code",
                "args": null,
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/),
              (v4/*: any*/),
              (v3/*: any*/)
            ]
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
              (v12/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "Ship",
                "selections": [
                  (v9/*: any*/),
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
                  (v10/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "region",
                    "args": null,
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "postalCode",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Pickup",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "fulfillmentType",
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
            "name": "seller",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v12/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": [
                  (v9/*: any*/)
                ]
              },
              {
                "kind": "ClientExtension",
                "selections": (v7/*: any*/)
              },
              {
                "kind": "InlineFragment",
                "type": "User",
                "selections": (v7/*: any*/)
              }
            ]
          },
          (v12/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "itemsTotal",
            "args": (v13/*: any*/),
            "storageKey": "itemsTotal(precision:2)"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": (v13/*: any*/),
            "storageKey": "totalListPrice(precision:2)"
          },
          (v18/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "OfferOrder",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "Offer",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "createdAt",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/)
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "myLastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "Offer",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/),
                  (v19/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_NewPaymentQuery",
    "id": null,
    "text": "query routes_NewPaymentQuery(\n  $orderID: String!\n) {\n  me {\n    ...NewPayment_me\n    id\n  }\n  order: ecommerceOrder(id: $orderID) {\n    __typename\n    ...NewPayment_order\n    id\n  }\n}\n\nfragment NewPayment_me on Me {\n  ...PaymentPicker_me\n}\n\nfragment NewPayment_order on Order {\n  id\n  mode\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n          artists {\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  ... on OfferOrder {\n    lastOffer {\n      createdAt\n      id\n      note\n    }\n  }\n  ...PaymentPicker_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n}\n\nfragment PaymentPicker_order on Order {\n  id\n  mode\n  state\n  creditCard {\n    id\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postal_code\n    expiration_month\n    expiration_year\n    last_digits\n    brand\n  }\n  requestedFulfillment {\n    __typename\n    ... on Ship {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on Pickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkSummaryItem_order on Order {\n  seller {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artist_names\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on Order {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  ... on OfferOrder {\n    lastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n    }\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n    }\n  }\n}\n\nfragment PaymentPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        id\n        brand\n        last_digits\n        expiration_month\n        expiration_year\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'fa6cdfa94edb70b670c447eecb9b11df';
export default node;
