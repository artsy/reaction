/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OfferHistoryItemStoryQueryVariables = {};
export type OfferHistoryItemStoryQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"OfferHistoryItem_order">;
    } | null;
};
export type OfferHistoryItemStoryQuery = {
    readonly response: OfferHistoryItemStoryQueryResponse;
    readonly variables: OfferHistoryItemStoryQueryVariables;
};



/*
query OfferHistoryItemStoryQuery {
  order: commerceOrder(id: "foo") {
    __typename
    ...OfferHistoryItem_order
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
    }
  }
  totalListPrice(precision: 2)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": (v1/*: any*/),
  "storageKey": "amount(precision:2)"
},
v4 = {
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
    "name": "OfferHistoryItemStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "commerceOrder",
        "storageKey": "commerceOrder(id:\"foo\")",
        "args": (v0/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "OfferHistoryItem_order",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OfferHistoryItemStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "commerceOrder",
        "storageKey": "commerceOrder(id:\"foo\")",
        "args": (v0/*: any*/),
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
            "kind": "ScalarField",
            "alias": null,
            "name": "totalListPrice",
            "args": (v1/*: any*/),
            "storageKey": "totalListPrice(precision:2)"
          },
          {
            "kind": "InlineFragment",
            "type": "CommerceOfferOrder",
            "selections": [
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
                          (v2/*: any*/),
                          (v3/*: any*/),
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
                          (v4/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v4/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "shippingTotal",
                    "args": (v1/*: any*/),
                    "storageKey": "shippingTotal(precision:2)"
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "taxTotal",
                    "args": (v1/*: any*/),
                    "storageKey": "taxTotal(precision:2)"
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "note",
                    "args": null,
                    "storageKey": null
                  }
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
    "name": "OfferHistoryItemStoryQuery",
    "id": null,
    "text": "query OfferHistoryItemStoryQuery {\n  order: commerceOrder(id: \"foo\") {\n    __typename\n    ...OfferHistoryItem_order\n  }\n}\n\nfragment OfferHistoryItem_order on CommerceOrder {\n  ... on CommerceOfferOrder {\n    offers {\n      edges {\n        node {\n          internalID\n          amount(precision: 2)\n          createdAt(format: \"MMM D\")\n          fromParticipant\n        }\n      }\n    }\n    lastOffer {\n      internalID\n      fromParticipant\n      amount(precision: 2)\n      shippingTotal(precision: 2)\n      taxTotal(precision: 2)\n      note\n    }\n  }\n  totalListPrice(precision: 2)\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f7851aa70a3362d8766e48c18332f34f';
export default node;
