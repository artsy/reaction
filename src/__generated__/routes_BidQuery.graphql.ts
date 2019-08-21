/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Bid_artwork$ref } from "./Bid_artwork.graphql";
import { Bid_me$ref } from "./Bid_me.graphql";
import { Bid_sale$ref } from "./Bid_sale.graphql";
import { redirects_me$ref } from "./redirects_me.graphql";
import { redirects_sale$ref } from "./redirects_sale.graphql";
export type routes_BidQueryVariables = {
    readonly saleID: string;
    readonly artworkID: string;
};
export type routes_BidQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": Bid_artwork$ref;
    }) | null;
    readonly sale: ({
        readonly id: string;
        readonly is_auction: boolean | null;
        readonly is_registration_closed: boolean | null;
        readonly is_preview: boolean | null;
        readonly is_open: boolean | null;
        readonly registrationStatus: ({
            readonly qualified_for_bidding: boolean | null;
        }) | null;
        readonly " $fragmentRefs": redirects_sale$ref & Bid_sale$ref;
    }) | null;
    readonly me: ({
        readonly has_qualified_credit_cards: boolean | null;
        readonly " $fragmentRefs": redirects_me$ref & Bid_me$ref;
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
    __id
  }
  sale(id: $saleID) {
    ...redirects_sale
    ...Bid_sale
    id
    is_auction
    is_registration_closed
    is_preview
    is_open
    registrationStatus {
      qualified_for_bidding
      __id
    }
    __id
  }
  me {
    ...redirects_me
    ...Bid_me
    has_qualified_credit_cards
    __id
  }
}

fragment Bid_artwork on Artwork {
  id
  imageUrl
  artist_names
  displayLabel
  __id
}

fragment redirects_sale on Sale {
  id
  is_auction
  is_registration_closed
  is_preview
  is_open
  registrationStatus {
    qualified_for_bidding
    __id
  }
  __id
}

fragment Bid_sale on Sale {
  id
  registrationStatus {
    qualified_for_bidding
    __id
  }
  __id
}

fragment redirects_me on Me {
  has_qualified_credit_cards
  __id
}

fragment Bid_me on Me {
  has_qualified_credit_cards
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "saleID",
    "type": "String!"
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_auction",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_registration_closed",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_preview",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_open",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "registrationStatus",
  "storageKey": null,
  "args": null,
  "concreteType": "Bidder",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "qualified_for_bidding",
      "args": null,
      "storageKey": null
    },
    v2
  ]
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "has_qualified_credit_cards",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "routes_BidQuery",
  "id": null,
  "text": "query routes_BidQuery(\n  $saleID: String!\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) {\n    ...Bid_artwork\n    __id\n  }\n  sale(id: $saleID) {\n    ...redirects_sale\n    ...Bid_sale\n    id\n    is_auction\n    is_registration_closed\n    is_preview\n    is_open\n    registrationStatus {\n      qualified_for_bidding\n      __id\n    }\n    __id\n  }\n  me {\n    ...redirects_me\n    ...Bid_me\n    has_qualified_credit_cards\n    __id\n  }\n}\n\nfragment Bid_artwork on Artwork {\n  id\n  imageUrl\n  artist_names\n  displayLabel\n  __id\n}\n\nfragment redirects_sale on Sale {\n  id\n  is_auction\n  is_registration_closed\n  is_preview\n  is_open\n  registrationStatus {\n    qualified_for_bidding\n    __id\n  }\n  __id\n}\n\nfragment Bid_sale on Sale {\n  id\n  registrationStatus {\n    qualified_for_bidding\n    __id\n  }\n  __id\n}\n\nfragment redirects_me on Me {\n  has_qualified_credit_cards\n  __id\n}\n\nfragment Bid_me on Me {\n  has_qualified_credit_cards\n  __id\n}\n",
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
          v2
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": null,
        "args": v3,
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "redirects_sale",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Bid_sale",
            "args": null
          },
          v4,
          v5,
          v6,
          v7,
          v8,
          v9,
          v2
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
          {
            "kind": "FragmentSpread",
            "name": "redirects_me",
            "args": null
          },
          {
            "kind": "FragmentSpread",
            "name": "Bid_me",
            "args": null
          },
          v10,
          v2
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
          v4,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "imageUrl",
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
            "name": "displayLabel",
            "args": null,
            "storageKey": null
          },
          v2
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "sale",
        "storageKey": null,
        "args": v3,
        "concreteType": "Sale",
        "plural": false,
        "selections": [
          v4,
          v5,
          v6,
          v7,
          v8,
          v9,
          v2
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
          v10,
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = '0de5611209ca50baea7b5d75926d57b2';
export default node;
