/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Bid_artwork$ref } from "./Bid_artwork.graphql";
import { Bid_me$ref } from "./Bid_me.graphql";
import { Bid_sale$ref } from "./Bid_sale.graphql";
import { Bid_saleArtwork$ref } from "./Bid_saleArtwork.graphql";
export type routes_BidQueryVariables = {
    readonly saleID: string;
    readonly artworkID: string;
};
export type routes_BidQueryResponse = {
    readonly artwork: ({
        readonly sale_artwork: ({
            readonly sale: ({
                readonly name: string | null;
                readonly " $fragmentRefs": Bid_sale$ref;
            }) | null;
            readonly " $fragmentRefs": Bid_saleArtwork$ref;
        }) | null;
        readonly " $fragmentRefs": Bid_artwork$ref;
    }) | null;
    readonly me: ({
        readonly has_qualified_credit_cards: boolean | null;
        readonly bidders: ReadonlyArray<({
            readonly qualified_for_bidding: boolean | null;
            readonly sale: ({
                readonly name: string | null;
            }) | null;
        }) | null> | null;
        readonly " $fragmentRefs": Bid_me$ref;
    }) | null;
};
export type routes_BidQuery = {
    readonly response: routes_BidQueryResponse;
    readonly variables: routes_BidQueryVariables;
};



/*
query routes_BidQuery(
  $saleID: String!
  $artworkID: String!
) {
  artwork(id: $artworkID) {
    ...Bid_artwork
    sale_artwork(sale_id: $saleID) {
      ...Bid_saleArtwork
      sale {
        name
        ...Bid_sale
        __id
      }
      __id
    }
    __id
  }
  me {
    has_qualified_credit_cards
    bidders(sale_id: $saleID) {
      qualified_for_bidding
      sale {
        name
        __id
      }
      __id
    }
    ...Bid_me
    __id
  }
}

fragment Bid_artwork on Artwork {
  _id
  title
  imageUrl
  __id
}

fragment Bid_saleArtwork on SaleArtwork {
  id
  lotLabel: lot_label
  __id
}

fragment Bid_sale on Sale {
  id
  _id
  status
  __id
}

fragment Bid_me on Me {
  id
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "saleID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artworkID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID",
    "type": "String!"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "sale_id",
    "variableName": "saleID",
    "type": "String"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "has_qualified_credit_cards",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "bidders",
  "storageKey": null,
  "args": v2,
  "concreteType": "Bidder",
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "qualified_for_bidding",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        v3,
        v4
      ]
    },
    v4
  ]
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "_id",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_BidQuery",
  "id": null,
  "text": "query routes_BidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...Bid_artwork\n    sale_artwork(sale_id: $saleID) {\n      ...Bid_saleArtwork\n      sale {\n        name\n        ...Bid_sale\n        __id\n      }\n      __id\n    }\n    __id\n  }\n  me {\n    has_qualified_credit_cards\n    bidders(sale_id: $saleID) {\n      qualified_for_bidding\n      sale {\n        name\n        __id\n      }\n      __id\n    }\n    ...Bid_me\n    __id\n  }\n}\n\nfragment Bid_artwork on Artwork {\n  _id\n  title\n  imageUrl\n  __id\n}\n\nfragment Bid_saleArtwork on SaleArtwork {\n  id\n  lotLabel: lot_label\n  __id\n}\n\nfragment Bid_sale on Sale {\n  id\n  _id\n  status\n  __id\n}\n\nfragment Bid_me on Me {\n  id\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routes_BidQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Bid_artwork",
            "args": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale_artwork",
            "storageKey": null,
            "args": v2,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Bid_saleArtwork",
                "args": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale",
                "storageKey": null,
                "args": null,
                "concreteType": "Sale",
                "plural": false,
                "selections": [
                  v3,
                  {
                    "kind": "FragmentSpread",
                    "name": "Bid_sale",
                    "args": null
                  },
                  v4
                ]
              },
              v4
            ]
          },
          v4
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          v5,
          v6,
          {
            "kind": "FragmentSpread",
            "name": "Bid_me",
            "args": null
          },
          v4
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_BidQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          v7,
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
            "name": "imageUrl",
            "args": null,
            "storageKey": null
          },
          v4,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale_artwork",
            "storageKey": null,
            "args": v2,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              v8,
              {
                "kind": "ScalarField",
                "alias": "lotLabel",
                "name": "lot_label",
                "args": null,
                "storageKey": null
              },
              v4,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "sale",
                "storageKey": null,
                "args": null,
                "concreteType": "Sale",
                "plural": false,
                "selections": [
                  v3,
                  v8,
                  v7,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "status",
                    "args": null,
                    "storageKey": null
                  },
                  v4
                ]
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          v5,
          v6,
          v8,
          v4
        ]
      }
    ]
  }
};
})();
(node as any).hash = '41c76dda941ea7846679abbd79f0b538';
export default node;
