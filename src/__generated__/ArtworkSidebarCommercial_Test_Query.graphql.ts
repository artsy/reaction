/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarCommercial_artwork$ref } from "./ArtworkSidebarCommercial_artwork.graphql";
export type ArtworkSidebarCommercial_Test_QueryVariables = {};
export type ArtworkSidebarCommercial_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSidebarCommercial_artwork$ref;
    }) | null;
};
export type ArtworkSidebarCommercial_Test_Query = {
    readonly response: ArtworkSidebarCommercial_Test_QueryResponse;
    readonly variables: ArtworkSidebarCommercial_Test_QueryVariables;
};



/*
query ArtworkSidebarCommercial_Test_Query {
  artwork(id: "commercial_artwork") {
    ...ArtworkSidebarCommercial_artwork
    __id
  }
}

fragment ArtworkSidebarCommercial_artwork on Artwork {
  id
  collecting_institution
  is_acquireable
  is_inquireable
  is_offerable
  sale_message
  shippingInfo
  shippingOrigin
  edition_sets {
    __id
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
    "value": "commercial_artwork",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkSidebarCommercial_Test_Query",
  "id": null,
  "text": "query ArtworkSidebarCommercial_Test_Query {\n  artwork(id: \"commercial_artwork\") {\n    ...ArtworkSidebarCommercial_artwork\n    __id\n  }\n}\n\nfragment ArtworkSidebarCommercial_artwork on Artwork {\n  id\n  collecting_institution\n  is_acquireable\n  is_inquireable\n  is_offerable\n  sale_message\n  shippingInfo\n  shippingOrigin\n  edition_sets {\n    __id\n    ...ArtworkSidebarSizeInfo_piece\n  }\n  __id\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  dimensions {\n    in\n    cm\n  }\n  edition_of\n  ... on Node {\n    __id\n  }\n  ... on EditionSet {\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarCommercial_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"commercial_artwork\")",
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
    "name": "ArtworkSidebarCommercial_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"commercial_artwork\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "collecting_institution",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_acquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_inquireable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_offerable",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "sale_message",
            "args": null,
            "storageKey": null
          },
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
              v1,
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
(node as any).hash = '33ed30d0164e6dbdc5812252d42d68c8';
export default node;
