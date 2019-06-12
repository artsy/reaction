/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Offer_order$ref } from "./Offer_order.graphql";
export type routes_OfferQueryVariables = {
    readonly orderID: string;
};
export type routes_OfferQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": Offer_order$ref;
    } | null;
};
export type routes_OfferQuery = {
    readonly response: routes_OfferQueryResponse;
    readonly variables: routes_OfferQueryVariables;
};



/*
query routes_OfferQuery(
  $orderID: String!
) {
  order: ecommerceOrder(id: $orderID) {
    __typename
    ...Offer_order
    id
  }
}

fragment Offer_order on Order {
  id
  mode
  state
  totalListPrice(precision: 2)
  totalListPriceCents
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
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
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
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v5 = [
  (v2/*: any*/)
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shippingTotal",
  "args": (v3/*: any*/),
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
  "args": (v3/*: any*/),
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
  "args": (v3/*: any*/),
  "storageKey": "buyerTotal(precision:2)"
},
v11 = [
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
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
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
    "name": "routes_OfferQuery",
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
            "name": "Offer_order",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OfferQuery",
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
            "name": "state",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": (v3/*: any*/),
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
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "seller",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "Partner",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "name",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "ClientExtension",
                "selections": (v5/*: any*/)
              },
              {
                "kind": "InlineFragment",
                "type": "User",
                "selections": (v5/*: any*/)
              }
            ]
          },
          (v4/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "itemsTotal",
            "args": (v3/*: any*/),
            "storageKey": "itemsTotal(precision:2)"
          },
          (v10/*: any*/),
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
                "selections": (v11/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "myLastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "Offer",
                "plural": false,
                "selections": (v11/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_OfferQuery",
    "id": null,
    "text": "query routes_OfferQuery(\n  $orderID: String!\n) {\n  order: ecommerceOrder(id: $orderID) {\n    __typename\n    ...Offer_order\n    id\n  }\n}\n\nfragment Offer_order on Order {\n  id\n  mode\n  state\n  totalListPrice(precision: 2)\n  totalListPriceCents\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n        }\n        id\n      }\n    }\n  }\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n}\n\nfragment ArtworkSummaryItem_order on Order {\n  seller {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artist_names\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on Order {\n  __typename\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  totalListPrice(precision: 2)\n  buyerTotal(precision: 2)\n  ... on OfferOrder {\n    lastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n    }\n    myLastOffer {\n      id\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '8b061549c4d41ab0110f7479b4b0b799';
export default node;
