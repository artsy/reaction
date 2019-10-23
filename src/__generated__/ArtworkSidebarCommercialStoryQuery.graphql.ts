/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarCommercial_artwork$ref } from "./ArtworkSidebarCommercial_artwork.graphql";
export type ArtworkSidebarCommercialStoryQueryVariables = {};
export type ArtworkSidebarCommercialStoryQueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSidebarCommercial_artwork$ref;
    }) | null;
};
export type ArtworkSidebarCommercialStoryQuery = {
    readonly response: ArtworkSidebarCommercialStoryQueryResponse;
    readonly variables: ArtworkSidebarCommercialStoryQueryVariables;
};



/*
query ArtworkSidebarCommercialStoryQuery {
  artwork(id: "unused") {
    ...ArtworkSidebarCommercial_artwork
    __id
  }
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  id
  _id
  is_for_sale
  is_acquireable
  is_inquireable
  is_offerable
  price
  priceIncludesTaxDisplay
  sale_message
  shippingInfo
  shippingOrigin
  edition_sets {
    id
    __id
    is_acquireable
    is_offerable
    sale_message
    ...ArtworkSidebarSizeInfo_piece
  }
  __id
}

fragment ArtworkSidebarSizeInfo_piece on Sellable {
  dimensions {
    in
    cm
  }
  edition_of
  ... on Node {
    __id
  }
  ... on EditionSet {
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_acquireable",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_offerable",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sale_message",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkSidebarCommercialStoryQuery",
  "id": null,
  "text": "query ArtworkSidebarCommercialStoryQuery {\n  artwork(id: \"unused\") {\n    ...ArtworkSidebarCommercial_artwork\n    __id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  id\n  _id\n  is_for_sale\n  is_acquireable\n  is_inquireable\n  is_offerable\n  price\n  priceIncludesTaxDisplay\n  sale_message\n  shippingInfo\n  shippingOrigin\n  edition_sets {\n    id\n    __id\n    is_acquireable\n    is_offerable\n    sale_message\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  __id\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  dimensions {\n    in\n    cm\n  }\n  edition_of\n  ... on Node {\n    __id\n  }\n  ... on EditionSet {\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarCommercialStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarCommercial_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarCommercialStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"unused\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "price",
            "args": null,
            "storageKey": null
          },
          v2,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_for_sale",
            "args": null,
            "storageKey": null
          },
          v3,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_inquireable",
            "args": null,
            "storageKey": null
          },
          v4,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "priceIncludesTaxDisplay",
            "args": null,
            "storageKey": null
          },
          v5,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shippingInfo",
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
            "name": "edition_sets",
            "storageKey": null,
            "args": null,
            "concreteType": "EditionSet",
            "plural": true,
            "selections": [
              v2,
              v1,
              v3,
              v4,
              v5,
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
                "kind": "ScalarField",
                "alias": null,
                "name": "edition_of",
                "args": null,
                "storageKey": null
              }
            ]
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = '3853d27c0bbf48663e60ab83a0cb382d';
export default node;
