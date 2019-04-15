/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Payment_me$ref } from "./Payment_me.graphql";
import { Payment_order$ref } from "./Payment_order.graphql";
export type PaymentTestQueryVariables = {};
export type PaymentTestQueryResponse = {
    readonly me: ({
        readonly " $fragmentRefs": Payment_me$ref;
    }) | null;
    readonly order: ({
        readonly " $fragmentRefs": Payment_order$ref;
    }) | null;
};
export type PaymentTestQuery = {
    readonly response: PaymentTestQueryResponse;
    readonly variables: PaymentTestQueryVariables;
};



/*
query PaymentTestQuery {
  me {
    ...Payment_me
    __id
  }
  order: ecommerceOrder(id: "unused") {
    __typename
    ...Payment_order
    __id: id
  }
}

fragment Payment_me on Me {
  ...PaymentPicker_me
  __id
}

fragment Payment_order on Order {
  id
  mode
  lineItems {
    edges {
      node {
        artwork {
          id
          __id
        }
        __id: id
      }
    }
  }
  ...PaymentPicker_order
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
  __id: id
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
    __id
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
          __id
        }
        __id: id
      }
    }
  }
  __id: id
}

fragment ArtworkSummaryItem_order on Order {
  seller {
    __typename
    ... on Partner {
      name
    }
    ... on Node {
      __id
    }
    ... on User {
      __id
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
          }
          __id
        }
        __id: id
      }
    }
  }
  __id: id
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
      __id: id
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
      __id: id
    }
  }
  __id: id
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
        __id
      }
    }
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "city",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "country",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
],
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": v9,
  "storageKey": "shippingTotal(precision:2)"
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": v9,
  "storageKey": "taxTotal(precision:2)"
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotal",
  "args": v9,
  "storageKey": "buyerTotal(precision:2)"
},
v15 = [
  v13,
  v3,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "amountCents",
    "args": null,
    "storageKey": null
  },
  v10,
  v11,
  v12,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "amount",
    "args": v9,
    "storageKey": "amount(precision:2)"
  },
  v14,
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "buyerTotalCents",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "fromParticipant",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "note",
    "args": null,
    "storageKey": null
  },
  v2
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "PaymentTestQuery",
  "id": null,
  "text": "query PaymentTestQuery {\n  me {\n    ...Payment_me\n    __id\n  }\n  order: ecommerceOrder(id: \"unused\") {\n    __typename\n    ...Payment_order\n    __id: id\n  }\n}\n\nfragment Payment_me on Me {\n  ...PaymentPicker_me\n  __id\n}\n\nfragment Payment_order on Order {\n  id\n  mode\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  ...PaymentPicker_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  __id: id\n}\n\nfragment PaymentPicker_order on Order {\n  id\n  mode\n  state\n  creditCard {\n    id\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postal_code\n    __id\n  }\n  requestedFulfillment {\n    __typename\n    ... on Ship {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on Pickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  __id: id\n}\n\nfragment ArtworkSummaryItem_order on Order {\n  seller {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __id\n    }\n    ... on User {\n      __id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artist_names\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  __id: id\n}\n\nfragment TransactionDetailsSummaryItem_order on Order {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  ... on OfferOrder {\n    lastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      __id: id\n    }\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      __id: id\n    }\n  }\n  __id: id\n}\n\nfragment PaymentPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        id\n        brand\n        last_digits\n        expiration_month\n        expiration_year\n        __id\n      }\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "PaymentTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
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
            "name": "Payment_me",
            "args": null
          },
          v0
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": "ecommerceOrder(id:\"unused\")",
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Payment_order",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "PaymentTestQuery",
    "argumentDefinitions": [],
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
                "value": 100,
                "type": "Int"
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
                      v3,
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
                        "name": "expiration_month",
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
                      v0
                    ]
                  }
                ]
              }
            ]
          },
          v0
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "ecommerceOrder",
        "storageKey": "ecommerceOrder(id:\"unused\")",
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          v4,
          v3,
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
                          v3,
                          v0,
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
                                    "value": 55,
                                    "type": "Int"
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
                              }
                            ]
                          }
                        ]
                      },
                      v2
                    ]
                  }
                ]
              }
            ]
          },
          v5,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCard",
            "storageKey": null,
            "args": null,
            "concreteType": "CreditCard",
            "plural": false,
            "selections": [
              v3,
              v6,
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
              v7,
              v5,
              v8,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "postal_code",
                "args": null,
                "storageKey": null
              },
              v0
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
              v4,
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
              },
              {
                "kind": "InlineFragment",
                "type": "Ship",
                "selections": [
                  v6,
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
                  v7,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "region",
                    "args": null,
                    "storageKey": null
                  },
                  v8,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "postalCode",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "seller",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v4,
              v0,
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": [
                  v6
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "mode",
            "args": null,
            "storageKey": null
          },
          v10,
          v11,
          v12,
          v13,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "itemsTotal",
            "args": v9,
            "storageKey": "itemsTotal(precision:2)"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": v9,
            "storageKey": "totalListPrice(precision:2)"
          },
          v14,
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
                "selections": v15
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "myLastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "Offer",
                "plural": false,
                "selections": v15
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'e9af3d7697e6e446d3ba2fe9deb83deb';
export default node;
