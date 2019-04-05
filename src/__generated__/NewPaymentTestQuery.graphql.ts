/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { NewPayment_me$ref } from "./NewPayment_me.graphql";
import { NewPayment_order$ref } from "./NewPayment_order.graphql";
export type NewPaymentTestQueryVariables = {};
export type NewPaymentTestQueryResponse = {
    readonly me: ({
        readonly " $fragmentRefs": NewPayment_me$ref;
    }) | null;
    readonly order: ({
        readonly " $fragmentRefs": NewPayment_order$ref;
    }) | null;
};
export type NewPaymentTestQuery = {
    readonly response: NewPaymentTestQueryResponse;
    readonly variables: NewPaymentTestQueryVariables;
};



/*
query NewPaymentTestQuery {
  me {
    ...NewPayment_me
    __id
  }
  order: ecommerceOrder(id: "unused") {
    __typename
    ...NewPayment_order
    __id: id
  }
}

fragment NewPayment_me on Me {
  ...PaymentPicker_me
  __id
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
            __id
          }
          __id
        }
        __id: id
      }
    }
  }
  ... on OfferOrder {
    lastOffer {
      createdAt
      id
      note
      __id: id
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
  creditCards {
    edges {
      node {
        brand
        name
        last_digits
        expiration_month
        expiration_year
        street1
        street2
        city
        state
        country
        postal_code
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
  "name": "street2",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "street1",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "city",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
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
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "postal_code",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v12 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
],
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": v12,
  "storageKey": "shippingTotal(precision:2)"
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": v12,
  "storageKey": "taxTotal(precision:2)"
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotal",
  "args": v12,
  "storageKey": "buyerTotal(precision:2)"
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "note",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": v12,
  "storageKey": "amount(precision:2)"
},
v20 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amountCents",
  "args": null,
  "storageKey": null
},
v21 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotalCents",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fromParticipant",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "NewPaymentTestQuery",
  "id": null,
  "text": "query NewPaymentTestQuery {\n  me {\n    ...NewPayment_me\n    __id\n  }\n  order: ecommerceOrder(id: \"unused\") {\n    __typename\n    ...NewPayment_order\n    __id: id\n  }\n}\n\nfragment NewPayment_me on Me {\n  ...PaymentPicker_me\n  __id\n}\n\nfragment NewPayment_order on Order {\n  id\n  mode\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n          artists {\n            id\n            __id\n          }\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  ... on OfferOrder {\n    lastOffer {\n      createdAt\n      id\n      note\n      __id: id\n    }\n  }\n  ...PaymentPicker_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  __id: id\n}\n\nfragment PaymentPicker_order on Order {\n  id\n  mode\n  state\n  creditCard {\n    id\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postal_code\n    __id\n  }\n  requestedFulfillment {\n    __typename\n    ... on Ship {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on Pickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  __id: id\n}\n\nfragment ArtworkSummaryItem_order on Order {\n  seller {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __id\n    }\n    ... on User {\n      __id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artist_names\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  __id: id\n}\n\nfragment TransactionDetailsSummaryItem_order on Order {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  ... on OfferOrder {\n    lastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      __id: id\n    }\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      __id: id\n    }\n  }\n  __id: id\n}\n\nfragment PaymentPicker_me on Me {\n  creditCards {\n    edges {\n      node {\n        brand\n        name\n        last_digits\n        expiration_month\n        expiration_year\n        street1\n        street2\n        city\n        state\n        country\n        postal_code\n        __id\n      }\n    }\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "NewPaymentTestQuery",
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
            "name": "NewPayment_me",
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
            "name": "NewPayment_order",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NewPaymentTestQuery",
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
            "storageKey": null,
            "args": null,
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
                      v4,
                      v5,
                      v6,
                      v7,
                      v8,
                      v9,
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "seller",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v10,
              v0,
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": [
                  v5
                ]
              }
            ]
          },
          v11,
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
                          v11,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              v11,
                              v0
                            ]
                          },
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": v12,
            "storageKey": "totalListPrice(precision:2)"
          },
          v7,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCard",
            "storageKey": null,
            "args": null,
            "concreteType": "CreditCard",
            "plural": false,
            "selections": [
              v11,
              v5,
              v4,
              v3,
              v6,
              v7,
              v8,
              v9,
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
              v10,
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
                  v5,
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
                  v6,
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
            "kind": "ScalarField",
            "alias": null,
            "name": "mode",
            "args": null,
            "storageKey": null
          },
          v10,
          v13,
          v14,
          v15,
          v16,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "itemsTotal",
            "args": v12,
            "storageKey": "itemsTotal(precision:2)"
          },
          v17,
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
                  v13,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "createdAt",
                    "args": null,
                    "storageKey": null
                  },
                  v18,
                  v2,
                  v19,
                  v20,
                  v11,
                  v14,
                  v15,
                  v16,
                  v17,
                  v21,
                  v22
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
                  v16,
                  v11,
                  v20,
                  v13,
                  v14,
                  v15,
                  v19,
                  v17,
                  v21,
                  v22,
                  v18,
                  v2
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
(node as any).hash = '61d3a580eaa51de3f59394e2cda5a563';
export default node;
