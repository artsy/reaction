/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceBuyerCounterOfferInput = {
    readonly amountCents: number;
    readonly clientMutationId?: string | null;
    readonly note?: string | null;
    readonly offerId: string;
};
export type RespondCounterOfferMutationVariables = {
    input: CommerceBuyerCounterOfferInput;
};
export type RespondCounterOfferMutationResponse = {
    readonly commerceBuyerCounterOffer: {
        readonly orderOrError: {
            readonly order?: {
                readonly " $fragmentRefs": FragmentRefs<"Respond_order">;
            };
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
        };
    } | null;
};
export type RespondCounterOfferMutation = {
    readonly response: RespondCounterOfferMutationResponse;
    readonly variables: RespondCounterOfferMutationVariables;
};



/*
mutation RespondCounterOfferMutation(
  $input: CommerceBuyerCounterOfferInput!
) {
  commerceBuyerCounterOffer(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationSuccess {
        order {
          __typename
          ...Respond_order
          id
        }
      }
      ... on CommerceOrderWithMutationFailure {
        error {
          type
          code
          data
        }
      }
    }
  }
}

fragment Respond_order on CommerceOrder {
  internalID
  mode
  state
  currencyCode
  itemsTotal(precision: 2)
  itemsTotalCents
  totalListPrice(precision: 2)
  totalListPriceCents
  stateExpiresAt
  lineItems {
    edges {
      node {
        artwork {
          slug
          id
        }
        id
      }
    }
  }
  ... on CommerceOfferOrder {
    lastOffer {
      createdAt
      internalID
      note
      id
    }
    myLastOffer {
      createdAt
      id
    }
  }
  ...TransactionDetailsSummaryItem_order
  ...ArtworkSummaryItem_order
  ...ShippingSummaryItem_order
  ...CreditCardSummaryItem_order
  ...OfferHistoryItem_order
}

fragment TransactionDetailsSummaryItem_order on CommerceOrder {
  __typename
  mode
  shippingTotal(precision: 2)
  shippingTotalCents
  taxTotal(precision: 2)
  taxTotalCents
  itemsTotal(precision: 2)
  totalListPrice(precision: 2)
  buyerTotal(precision: 2)
  ... on CommerceOfferOrder {
    lastOffer {
      internalID
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
      id
    }
    myLastOffer {
      internalID
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
      id
    }
  }
}

fragment ArtworkSummaryItem_order on CommerceOrder {
  sellerDetails {
    __typename
    ... on Partner {
      name
    }
    ... on Node {
      id
    }
    ... on User {
      id
    }
  }
  lineItems {
    edges {
      node {
        artwork {
          artist_names: artistNames
          title
          date
          shippingOrigin
          image {
            resized_ArtworkSummaryItem: resized(width: 55) {
              url
            }
          }
          id
        }
        id
      }
    }
  }
}

fragment ShippingSummaryItem_order on CommerceOrder {
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

fragment CreditCardSummaryItem_order on CommerceOrder {
  creditCard {
    brand
    lastDigits
    expirationYear
    expirationMonth
    id
  }
}

fragment OfferHistoryItem_order on CommerceOrder {
  ... on CommerceOfferOrder {
    offers {
      edges {
        node {
          internalID
          amount(precision: 2)
          createdAt(format: "MMM D")
          fromParticipant
          id
        }
      }
    }
    lastOffer {
      internalID
      fromParticipant
      amount(precision: 2)
      shippingTotal(precision: 2)
      taxTotal(precision: 2)
      note
      id
    }
  }
  totalListPrice(precision: 2)
}

fragment ShippingAddress_ship on CommerceShip {
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
    "type": "CommerceBuyerCounterOfferInput!",
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
  "type": "CommerceOrderWithMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "error",
      "storageKey": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
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
  "name": "internalID",
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": (v5/*: any*/),
  "storageKey": "shippingTotal(precision:2)"
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": (v5/*: any*/),
  "storageKey": "taxTotal(precision:2)"
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotal",
  "args": (v5/*: any*/),
  "storageKey": "buyerTotal(precision:2)"
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "note",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": (v5/*: any*/),
  "storageKey": "amount(precision:2)"
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amountCents",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotalCents",
  "args": null,
  "storageKey": null
},
v18 = {
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
        "name": "commerceBuyerCounterOffer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceBuyerCounterOfferPayload",
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
                "type": "CommerceOrderWithMutationSuccess",
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
        "name": "commerceBuyerCounterOffer",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceBuyerCounterOfferPayload",
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
                "type": "CommerceOrderWithMutationSuccess",
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
                        "name": "currencyCode",
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
                                      (v6/*: any*/),
                                      {
                                        "kind": "ScalarField",
                                        "alias": "artist_names",
                                        "name": "artistNames",
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
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  (v6/*: any*/)
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      (v3/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "sellerDetails",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v6/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "Partner",
                            "selections": [
                              (v12/*: any*/)
                            ]
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
                            "type": "CommerceShip",
                            "selections": [
                              (v12/*: any*/),
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
                            "name": "lastDigits",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "expirationYear",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "expirationMonth",
                            "args": null,
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ]
                      },
                      (v6/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "type": "CommerceOfferOrder",
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "lastOffer",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "CommerceOffer",
                            "plural": false,
                            "selections": [
                              (v13/*: any*/),
                              (v4/*: any*/),
                              (v14/*: any*/),
                              (v6/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/)
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "myLastOffer",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "CommerceOffer",
                            "plural": false,
                            "selections": [
                              (v13/*: any*/),
                              (v6/*: any*/),
                              (v4/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v17/*: any*/),
                              (v18/*: any*/),
                              (v14/*: any*/)
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "offers",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "CommerceOfferConnection",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "edges",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "CommerceOfferEdge",
                                "plural": true,
                                "selections": [
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "node",
                                    "storageKey": null,
                                    "args": null,
                                    "concreteType": "CommerceOffer",
                                    "plural": false,
                                    "selections": [
                                      (v4/*: any*/),
                                      (v15/*: any*/),
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
                                      (v18/*: any*/),
                                      (v6/*: any*/)
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
    "text": "mutation RespondCounterOfferMutation(\n  $input: CommerceBuyerCounterOfferInput!\n) {\n  commerceBuyerCounterOffer(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        order {\n          __typename\n          ...Respond_order\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n\nfragment Respond_order on CommerceOrder {\n  internalID\n  mode\n  state\n  currencyCode\n  itemsTotal(precision: 2)\n  itemsTotalCents\n  totalListPrice(precision: 2)\n  totalListPriceCents\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    lastOffer {\n      createdAt\n      internalID\n      note\n      id\n    }\n    myLastOffer {\n      createdAt\n      id\n    }\n  }\n  ...TransactionDetailsSummaryItem_order\n  ...ArtworkSummaryItem_order\n  ...ShippingSummaryItem_order\n  ...CreditCardSummaryItem_order\n  ...OfferHistoryItem_order\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      id\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artist_names: artistNames\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ShippingSummaryItem_order on CommerceOrder {\n  state\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardSummaryItem_order on CommerceOrder {\n  creditCard {\n    brand\n    lastDigits\n    expirationYear\n    expirationMonth\n    id\n  }\n}\n\nfragment OfferHistoryItem_order on CommerceOrder {\n  ... on CommerceOfferOrder {\n    offers {\n      edges {\n        node {\n          internalID\n          amount(precision: 2)\n          createdAt(format: \"MMM D\")\n          fromParticipant\n          id\n        }\n      }\n    }\n    lastOffer {\n      internalID\n      fromParticipant\n      amount(precision: 2)\n      shippingTotal(precision: 2)\n      taxTotal(precision: 2)\n      note\n      id\n    }\n  }\n  totalListPrice(precision: 2)\n}\n\nfragment ShippingAddress_ship on CommerceShip {\n  name\n  addressLine1\n  addressLine2\n  city\n  postalCode\n  region\n  country\n  phoneNumber\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a4d9f2cfd72fdd085f7318543ed3de2e';
export default node;
