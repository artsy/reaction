/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Review_order$ref } from "./Review_order.graphql";
export type routes_ReviewQueryVariables = {
    readonly orderID: string;
};
export type routes_ReviewQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": Review_order$ref;
    } | null;
};
export type routes_ReviewQuery = {
    readonly response: routes_ReviewQueryResponse;
    readonly variables: routes_ReviewQueryVariables;
};



/*
query routes_ReviewQuery(
  $orderID: String!
) {
  order: ecommerceOrder(id: $orderID) {
    __typename
    ...Review_order
    id
  }
}

fragment Review_order on Order {
  id
  mode
  itemsTotal(precision: 2)
  lineItems {
    edges {
      node {
        artwork {
          id
          _id
          artists {
            id
          }
          ...ItemReview_artwork
        }
        id
      }
    }
  }
  ... on OfferOrder {
    myLastOffer {
      id
    }
  }
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
  ...ShippingSummaryItem_order
  ...CreditCardSummaryItem_order
  ...OfferSummaryItem_order
}

fragment ItemReview_artwork on Artwork {
  artist_names
  title
  date
  medium
  dimensions {
    in
    cm
  }
  attribution_class {
    short_description
    id
  }
  image {
    resized(width: 185) {
      url
    }
    id
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

fragment OfferSummaryItem_order on Order {
  totalListPrice(precision: 2)
  ... on OfferOrder {
    myLastOffer {
      amount(precision: 2)
      note
      id
    }
  }
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
v3 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v4 = [
  (v2/*: any*/)
],
v5 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "url",
    "args": null,
    "storageKey": null
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": (v3/*: any*/),
  "storageKey": "shippingTotal(precision:2)"
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotalCents",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotal",
  "args": (v3/*: any*/),
  "storageKey": "taxTotal(precision:2)"
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "taxTotalCents",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "buyerTotal",
  "args": (v3/*: any*/),
  "storageKey": "buyerTotal(precision:2)"
},
v13 = [
  (v2/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "amount",
    "args": (v3/*: any*/),
    "storageKey": "amount(precision:2)"
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "amountCents",
    "args": null,
    "storageKey": null
  },
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
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
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_ReviewQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
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
            "name": "Review_order",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_ReviewQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
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
            "name": "itemsTotal",
            "args": (v3/*: any*/),
            "storageKey": "itemsTotal(precision:2)"
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
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "_id",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": (v4/*: any*/)
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
                            "name": "medium",
                            "args": null,
                            "storageKey": null
                          },
                          {
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
                                "name": "short_description",
                                "args": null,
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ]
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
                                "alias": null,
                                "name": "resized",
                                "storageKey": "resized(width:185)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 185
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "plural": false,
                                "selections": (v5/*: any*/)
                              },
                              (v2/*: any*/),
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
                                "selections": (v5/*: any*/)
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "shippingOrigin",
                            "args": null,
                            "storageKey": null
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "seller",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": [
                  (v7/*: any*/)
                ]
              },
              {
                "kind": "ClientExtension",
                "selections": (v4/*: any*/)
              },
              {
                "kind": "InlineFragment",
                "type": "User",
                "selections": (v4/*: any*/)
              }
            ]
          },
          (v6/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": (v3/*: any*/),
            "storageKey": "totalListPrice(precision:2)"
          },
          (v12/*: any*/),
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
              (v6/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "Ship",
                "selections": [
                  (v7/*: any*/),
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
              (v2/*: any*/)
            ]
          },
          {
            "kind": "InlineFragment",
            "type": "OfferOrder",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "myLastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "Offer",
                "plural": false,
                "selections": (v13/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "Offer",
                "plural": false,
                "selections": (v13/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_ReviewQuery",
    "id": null,
    "text": "query routes_ReviewQuery(\n  $orderID: String!\n) {\n  order: ecommerceOrder(id: $orderID) {\n    __typename\n    ...Review_order\n    id\n  }\n}\n\nfragment Review_order on Order {\n  id\n  mode\n  itemsTotal(precision: 2)\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n          _id\n          artists {\n            id\n          }\n          ...ItemReview_artwork\n        }\n        id\n      }\n    }\n  }\n  ... on OfferOrder {\n    myLastOffer {\n      id\n    }\n  }\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...ShippingSummaryItem_order\n  ...CreditCardSummaryItem_order\n  ...OfferSummaryItem_order\n}\n\nfragment ItemReview_artwork on Artwork {\n  artist_names\n  title\n  date\n  medium\n  dimensions {\n    in\n    cm\n  }\n  attribution_class {\n    short_description\n    id\n  }\n  image {\n    resized(width: 185) {\n      url\n    }\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on Order {\n  seller {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artist_names\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on Order {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  ... on OfferOrder {\n    lastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n    }\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n    }\n  }\n}\n\nfragment ShippingSummaryItem_order on Order {\n  state\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardSummaryItem_order on Order {\n  creditCard {\n    brand\n    last_digits\n    expiration_year\n    expiration_month\n    id\n  }\n}\n\nfragment OfferSummaryItem_order on Order {\n  totalListPrice(precision: 2)\n  ... on OfferOrder {\n    myLastOffer {\n      amount(precision: 2)\n      note\n      id\n    }\n  }\n}\n\nfragment ShippingAddress_ship on Ship {\n  name\n  addressLine1\n  addressLine2\n  city\n  postalCode\n  region\n  country\n  phoneNumber\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'cfabb8a0ecc3bffbbaea2e073c390d3e';
export default node;
