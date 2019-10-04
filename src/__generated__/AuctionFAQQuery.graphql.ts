/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { AuctionFAQ_viewer$ref } from "./AuctionFAQ_viewer.graphql";
export type AuctionFAQQueryVariables = {};
export type AuctionFAQQueryResponse = {
    readonly viewer: ({
        readonly " $fragmentRefs": AuctionFAQ_viewer$ref;
    }) | null;
};
export type AuctionFAQQuery = {
    readonly response: AuctionFAQQueryResponse;
    readonly variables: AuctionFAQQueryVariables;
};



/*
query AuctionFAQQuery {
  viewer {
    ...AuctionFAQ_viewer
  }
}

fragment AuctionFAQ_viewer on Viewer {
  bidding: staticContent(id: "how-auctions-work-bidding") {
    content
    __id
  }
  buyersPremiumTaxesAndFees: staticContent(id: "how-auctions-work-buyers-premium-taxes-and-fees") {
    content
    __id
  }
  paymentsAndShipping: staticContent(id: "how-auctions-work-payments-and-shipping") {
    content
    __id
  }
  emailsAndAlerts: staticContent(id: "how-auctions-work-emails-and-alerts") {
    content
    __id
  }
  conditionsOfSale: staticContent(id: "how-auctions-work-conditions-of-sale") {
    content
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "content",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "__id",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AuctionFAQQuery",
  "id": null,
  "text": "query AuctionFAQQuery {\n  viewer {\n    ...AuctionFAQ_viewer\n  }\n}\n\nfragment AuctionFAQ_viewer on Viewer {\n  bidding: staticContent(id: \"how-auctions-work-bidding\") {\n    content\n    __id\n  }\n  buyersPremiumTaxesAndFees: staticContent(id: \"how-auctions-work-buyers-premium-taxes-and-fees\") {\n    content\n    __id\n  }\n  paymentsAndShipping: staticContent(id: \"how-auctions-work-payments-and-shipping\") {\n    content\n    __id\n  }\n  emailsAndAlerts: staticContent(id: \"how-auctions-work-emails-and-alerts\") {\n    content\n    __id\n  }\n  conditionsOfSale: staticContent(id: \"how-auctions-work-conditions-of-sale\") {\n    content\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AuctionFAQQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "__viewer_viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "AuctionFAQ_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AuctionFAQQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "bidding",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-bidding\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-bidding",
                "type": "String!"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": v0
          },
          {
            "kind": "LinkedField",
            "alias": "buyersPremiumTaxesAndFees",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-buyers-premium-taxes-and-fees\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-buyers-premium-taxes-and-fees",
                "type": "String!"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": v0
          },
          {
            "kind": "LinkedField",
            "alias": "paymentsAndShipping",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-payments-and-shipping\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-payments-and-shipping",
                "type": "String!"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": v0
          },
          {
            "kind": "LinkedField",
            "alias": "emailsAndAlerts",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-emails-and-alerts\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-emails-and-alerts",
                "type": "String!"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": v0
          },
          {
            "kind": "LinkedField",
            "alias": "conditionsOfSale",
            "name": "staticContent",
            "storageKey": "staticContent(id:\"how-auctions-work-conditions-of-sale\")",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "how-auctions-work-conditions-of-sale",
                "type": "String!"
              }
            ],
            "concreteType": "StaticContent",
            "plural": false,
            "selections": v0
          }
        ]
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "name": "viewer",
        "args": null,
        "handle": "viewer",
        "key": "",
        "filters": null
      }
    ]
  }
};
})();
(node as any).hash = 'a3919be173a3a996315aa0da7c1bc1e6';
export default node;
