/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarExtraLinks_artwork$ref } from "./ArtworkSidebarExtraLinks_artwork.graphql";
export type ArtworkSidebarExtraLinks_Test_QueryVariables = {};
export type ArtworkSidebarExtraLinks_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSidebarExtraLinks_artwork$ref;
    }) | null;
};
export type ArtworkSidebarExtraLinks_Test_Query = {
    readonly response: ArtworkSidebarExtraLinks_Test_QueryResponse;
    readonly variables: ArtworkSidebarExtraLinks_Test_QueryVariables;
};



/*
query ArtworkSidebarExtraLinks_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebarExtraLinks_artwork
    __id
  }
}

fragment ArtworkSidebarExtraLinks_artwork on Artwork {
  __id
  is_in_auction
  is_for_sale
  is_acquireable
  is_inquireable
  artists {
    __id
    is_consignable
  }
  sale {
    is_closed
    __id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85",
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
  "name": "ArtworkSidebarExtraLinks_Test_Query",
  "id": null,
  "text": "query ArtworkSidebarExtraLinks_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebarExtraLinks_artwork\n    __id\n  }\n}\n\nfragment ArtworkSidebarExtraLinks_artwork on Artwork {\n  __id\n  is_in_auction\n  is_for_sale\n  is_acquireable\n  is_inquireable\n  artists {\n    __id\n    is_consignable\n  }\n  sale {\n    is_closed\n    __id\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarExtraLinks_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarExtraLinks_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarExtraLinks_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          v1,
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_in_auction",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "is_for_sale",
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
            "kind": "LinkedField",
            "alias": null,
            "name": "artists",
            "storageKey": null,
            "args": null,
            "concreteType": "Artist",
            "plural": true,
            "selections": [
              v1,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_consignable",
                "args": null,
                "storageKey": null
              }
            ]
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
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_closed",
                "args": null,
                "storageKey": null
              },
              v1
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '84e923a3d181590ea494f2f2305c70c6';
export default node;
