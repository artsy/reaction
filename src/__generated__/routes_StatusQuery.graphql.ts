/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Status_order$ref } from "./Status_order.graphql";
export type routes_StatusQueryVariables = {
    readonly orderID: string;
};
export type routes_StatusQueryResponse = {
    readonly order: ({
        readonly " $fragmentRefs": Status_order$ref;
    }) | null;
};
export type routes_StatusQuery = {
    readonly response: routes_StatusQueryResponse;
    readonly variables: routes_StatusQueryVariables;
};



/*
query routes_StatusQuery(
  $orderID: ID!
) {
  order: commerceOrder(id: $orderID) {
    __typename
    ...Status_order
    __id: id
  }
}

fragment Status_order on CommerceOrder {
  __typename
  id
  code
  state
  mode
  stateReason
  stateExpiresAt(format: "MMM D")
  requestedFulfillment {
    __typename
    ... on CommerceShip {
      __typename
    }
    ... on CommercePickup {
      __typename
    }
  }
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
  ...ShippingSummaryItem_order
  ...CreditCardSummaryItem_order
  lineItems {
    edges {
      node {
        ...ItemReview_lineItem
        fulfillments {
          edges {
            node {
              courier
              trackingId
              estimatedDelivery(format: "MMM Do, YYYY")
              __id: id
            }
          }
        }
        artwork {
          id
          is_acquireable
          __id
        }
        __id: id
      }
    }
  }
  ... on CommerceOfferOrder {
    myLastOffer {
      id
      amount(precision: 2)
      amountCents
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      __id: id
    }
  }
  __id: id
}

fragment ArtworkSummaryItem_order on CommerceOrder {
  sellerDetails {
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
            __id: id
          }
          __id
        }
        __id: id
      }
    }
  }
  __id: id
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
          __id
        }
        __id: id
      }
    }
  }
  __id: id
}

fragment CreditCardSummaryItem_order on CommerceOrder {
  creditCard {
    brand
    last_digits
    expiration_year
    expiration_month
    __id
  }
  __id: id
}

fragment ItemReview_lineItem on CommerceLineItem {
  artwork {
    artist_names
    title
    date
    medium
    dimensions {
      in
      cm
    }
    attribution_class {
      shortDescription
      __id
    }
    image {
      resized(width: 185) {
        url
      }
      __id: id
    }
    edition_sets {
      id
      dimensions {
        in
        cm
      }
      __id
    }
    __id
  }
  editionSetId
  __id: id
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
    "name": "orderID",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID",
    "type": "ID"
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
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v6 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
],
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "dimensions",
  "storageKey": null,
  "args": null,
  "concreteType": "dimensions",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "in",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "cm",
      "args": null,
      "storageKey": null
    }
  ]
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
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
  v8,
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
  "name": "routes_StatusQuery",
  "id": null,
  "text": "query routes_StatusQuery(\n  $orderID: ID!\n) {\n  order: commerceOrder(id: $orderID) {\n    __typename\n    ...Status_order\n    __id: id\n  }\n}\n\nfragment Status_order on CommerceOrder {\n  __typename\n  id\n  code\n  state\n  mode\n  stateReason\n  stateExpiresAt(format: \"MMM D\")\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      __typename\n    }\n    ... on CommercePickup {\n      __typename\n    }\n  }\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...ShippingSummaryItem_order\n  ...CreditCardSummaryItem_order\n  lineItems {\n    edges {\n      node {\n        ...ItemReview_lineItem\n        fulfillments {\n          edges {\n            node {\n              courier\n              trackingId\n              estimatedDelivery(format: \"MMM Do, YYYY\")\n              __id: id\n            }\n          }\n        }\n        artwork {\n          id\n          is_acquireable\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      __id: id\n    }\n  }\n  __id: id\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __id\n    }\n    ... on User {\n      __id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artist_names\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n            __id: id\n          }\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  __id: id\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  ... on CommerceOfferOrder {\n    lastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      __id: id\n    }\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      __id: id\n    }\n  }\n  __id: id\n}\n\nfragment ShippingSummaryItem_order on CommerceOrder {\n  state\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          __id\n        }\n        __id: id\n      }\n    }\n  }\n  __id: id\n}\n\nfragment CreditCardSummaryItem_order on CommerceOrder {\n  creditCard {\n    brand\n    last_digits\n    expiration_year\n    expiration_month\n    __id\n  }\n  __id: id\n}\n\nfragment ItemReview_lineItem on CommerceLineItem {\n  artwork {\n    artist_names\n    title\n    date\n    medium\n    dimensions {\n      in\n      cm\n    }\n    attribution_class {\n      shortDescription\n      __id\n    }\n    image {\n      resized(width: 185) {\n        url\n      }\n      __id: id\n    }\n    edition_sets {\n      id\n      dimensions {\n        in\n        cm\n      }\n      __id\n    }\n    __id\n  }\n  editionSetId\n  __id: id\n}\n\nfragment ShippingAddress_ship on CommerceShip {\n  name\n  addressLine1\n  addressLine2\n  city\n  postalCode\n  region\n  country\n  phoneNumber\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_StatusQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "commerceOrder",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Status_order",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_StatusQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "commerceOrder",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          v2,
          v3,
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
            "name": "state",
            "args": null,
            "storageKey": null
          },
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
            "name": "stateReason",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "stateExpiresAt",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D",
                "type": "String"
              }
            ],
            "storageKey": "stateExpiresAt(format:\"MMM D\")"
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
              v3,
              {
                "kind": "InlineFragment",
                "type": "CommerceShip",
                "selections": [
                  v4,
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
            "name": "sellerDetails",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              v3,
              v5,
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": [
                  v4
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
                            "name": "medium",
                            "args": null,
                            "storageKey": null
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
                                "selections": v6
                              },
                              v2,
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "resized",
                                "storageKey": "resized(width:185)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 185,
                                    "type": "Int"
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "plural": false,
                                "selections": v6
                              }
                            ]
                          },
                          v5,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "title",
                            "args": null,
                            "storageKey": null
                          },
                          v7,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "attribution_class",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "shortDescription",
                                "args": null,
                                "storageKey": null
                              },
                              v5
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edition_sets",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "EditionSet",
                            "plural": true,
                            "selections": [
                              v8,
                              v7,
                              v5
                            ]
                          },
                          v8,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_acquireable",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      v2,
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "editionSetId",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "fulfillments",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "CommerceFulfillmentConnection",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edges",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "CommerceFulfillmentEdge",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "node",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "CommerceFulfillment",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "courier",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "trackingId",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "estimatedDelivery",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "format",
                                        "value": "MMM Do, YYYY",
                                        "type": "String"
                                      }
                                    ],
                                    "storageKey": "estimatedDelivery(format:\"MMM Do, YYYY\")"
                                  },
                                  v2
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
          v8,
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
              v5
            ]
          },
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
                "selections": v15
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "myLastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "CommerceOffer",
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
(node as any).hash = '20e0ace33eac225ab7b81e3c814d58f5';
export default node;
