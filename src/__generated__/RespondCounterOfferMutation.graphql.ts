/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Respond_order$ref } from "./Respond_order.graphql";
export type buyerCounterOfferInput = {
    readonly offerId: string;
    readonly offerPrice?: MoneyInput | null;
    readonly note?: string | null;
    readonly clientMutationId?: string | null;
};
export type MoneyInput = {
    readonly amount: number;
    readonly currencyCode: string;
};
export type RespondCounterOfferMutationVariables = {
    readonly input: buyerCounterOfferInput;
};
export type RespondCounterOfferMutationResponse = {
    readonly ecommerceBuyerCounterOffer: {
        readonly orderOrError: ({
            readonly order?: {
                readonly " $fragmentRefs": Respond_order$ref;
            } | null;
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | null;
        } & ({
            readonly order: {
                readonly " $fragmentRefs": Respond_order$ref;
            } | null;
        } | {
            readonly error: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | null;
        } | {
            /*This will never be '% other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        })) | null;
    } | null;
};
export type RespondCounterOfferMutation = {
    readonly response: RespondCounterOfferMutationResponse;
    readonly variables: RespondCounterOfferMutationVariables;
};



/*
mutation RespondCounterOfferMutation(
  $input: buyerCounterOfferInput!
) {
  ecommerceBuyerCounterOffer(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        order {
          __typename
          ...Respond_order
          id
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

fragment Respond_order on Order {
  id
  mode
  state
  itemsTotal(precision: 2)
  itemsTotalCents
  totalListPrice(precision: 2)
  totalListPriceCents
  stateExpiresAt
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
  ... on OfferOrder {
    lastOffer {
      createdAt
      id
      note
    }
  }
  ...TransactionDetailsSummaryItem_order
  ...ArtworkSummaryItem_order
  ...ShippingSummaryItem_order
  ...CreditCardSummaryItem_order
  ...OfferHistoryItem_order
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

fragment ShippingSummaryItem_order on Order {
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
          id
        }
        id
      }
    }
  }
}

fragment CreditCardSummaryItem_order on Order {
  creditCard {
    brand
    last_digits
    expiration_year
    expiration_month
    id
  }
}

fragment OfferHistoryItem_order on Order {
  ... on OfferOrder {
    offers {
      edges {
        node {
          id
          amount(precision: 2)
          createdAt(format: "MMM D")
          fromParticipant
        }
      }
    }
    lastOffer {
      id
      fromParticipant
      amount(precision: 2)
      shippingTotal(precision: 2)
      taxTotal(precision: 2)
      note
    }
  }
  totalListPrice(precision: 2)
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
    "kind": "LocalArgument",
    "name": "input",
    "type": "buyerCounterOfferInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
v5 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": (v5/*: any*/),
  "storageKey": "shippingTotal(precision:2)"
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": (v5/*: any*/),
  "storageKey": "taxTotal(precision:2)"
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotal",
  "args": (v5/*: any*/),
  "storageKey": "buyerTotal(precision:2)"
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v12 = [
  (v4/*: any*/)
],
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "note",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": (v5/*: any*/),
  "storageKey": "amount(precision:2)"
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amountCents",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotalCents",
  "args": null,
  "storageKey": null
},
v17 = {
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
    "name": "RespondCounterOfferMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceBuyerCounterOffer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "buyerCounterOfferPayload",
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
              {
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      {
                        "kind": "FragmentSpread",
                        "name": "Respond_order",
                        "args": null
                      }
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
  "operation": {
    "kind": "Operation",
    "name": "RespondCounterOfferMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceBuyerCounterOffer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "buyerCounterOfferPayload",
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
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
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
                        "name": "state",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "itemsTotal",
                        "args": (v5/*: any*/),
                        "storageKey": "itemsTotal(precision:2)"
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "itemsTotalCents",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "totalListPrice",
                        "args": (v5/*: any*/),
                        "storageKey": "totalListPrice(precision:2)"
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "totalListPriceCents",
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
                                      (v4/*: any*/),
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
                                          (v4/*: any*/)
                                        ]
                                      }
                                    ]
                                  },
                                  (v4/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      (v3/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "seller",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "Partner",
                            "selections": [
                              (v11/*: any*/)
                            ]
                          },
                          {
                            "kind": "ClientExtension",
                            "selections": (v12/*: any*/)
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "User",
                            "selections": (v12/*: any*/)
                          }
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
                          (v3/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "Ship",
                            "selections": [
                              (v11/*: any*/),
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
                          (v4/*: any*/)
                        ]
                      },
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
                              (v4/*: any*/),
                              (v13/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v16/*: any*/),
                              (v17/*: any*/)
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
                              (v4/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v16/*: any*/),
                              (v17/*: any*/),
                              (v13/*: any*/)
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "offers",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "OfferConnection",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "edges",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "OfferEdge",
                                "plural": true,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "node",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "Offer",
                                    "plural": false,
                                    "selections": [
                                      (v4/*: any*/),
                                      (v14/*: any*/),
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "name": "createdAt",
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "format",
                                            "value": "MMM D"
                                          }
                                        ],
                                        "storageKey": "createdAt(format:\"MMM D\")"
                                      },
                                      (v17/*: any*/)
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
                ]
              },
              (v2/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "RespondCounterOfferMutation",
    "id": null,
    "text": "mutation RespondCounterOfferMutation(\n  $input: buyerCounterOfferInput!\n) {\n  ecommerceBuyerCounterOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        order {\n          __typename\n          ...Respond_order\n          id\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n\nfragment Respond_order on Order {\n  id\n  mode\n  state\n  itemsTotal(precision: 2)\n  itemsTotalCents\n  totalListPrice(precision: 2)\n  totalListPriceCents\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on OfferOrder {\n    lastOffer {\n      createdAt\n      id\n      note\n    }\n  }\n  ...TransactionDetailsSummaryItem_order\n  ...ArtworkSummaryItem_order\n  ...ShippingSummaryItem_order\n  ...CreditCardSummaryItem_order\n  ...OfferHistoryItem_order\n}\n\nfragment TransactionDetailsSummaryItem_order on Order {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  ... on OfferOrder {\n    lastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n    }\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n    }\n  }\n}\n\nfragment ArtworkSummaryItem_order on Order {\n  seller {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artist_names\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ShippingSummaryItem_order on Order {\n  state\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardSummaryItem_order on Order {\n  creditCard {\n    brand\n    last_digits\n    expiration_year\n    expiration_month\n    id\n  }\n}\n\nfragment OfferHistoryItem_order on Order {\n  ... on OfferOrder {\n    offers {\n      edges {\n        node {\n          id\n          amount(precision: 2)\n          createdAt(format: \"MMM D\")\n          fromParticipant\n        }\n      }\n    }\n    lastOffer {\n      id\n      fromParticipant\n      amount(precision: 2)\n      shippingTotal(precision: 2)\n      taxTotal(precision: 2)\n      note\n    }\n  }\n  totalListPrice(precision: 2)\n}\n\nfragment ShippingAddress_ship on Ship {\n  name\n  addressLine1\n  addressLine2\n  city\n  postalCode\n  region\n  country\n  phoneNumber\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'e68917d98fa6cd5025eb8bed98f5018e';
export default node;
