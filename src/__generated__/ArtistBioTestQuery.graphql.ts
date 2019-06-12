/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtistBio_bio$ref } from "./ArtistBio_bio.graphql";
export type ArtistBioTestQueryVariables = {};
export type ArtistBioTestQueryResponse = {
    readonly bio: {
        readonly " $fragmentRefs": ArtistBio_bio$ref;
    } | null;
};
export type ArtistBioTestQuery = {
    readonly response: ArtistBioTestQueryResponse;
    readonly variables: ArtistBioTestQueryVariables;
};



/*
query ArtistBioTestQuery {
  bio: artist(id: "unused") {
    ...ArtistBio_bio
    id
  }
}

fragment ArtistBio_bio on Artist {
  biography_blurb(format: HTML, partner_bio: true) {
    text
    credit
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistBioTestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "bio",
        "name": "artist",
        "storageKey": "artist(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistBio_bio",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistBioTestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "bio",
        "name": "artist",
        "storageKey": "artist(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "biography_blurb",
            "storageKey": "biography_blurb(format:\"HTML\",partner_bio:true)",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              },
              {
                "kind": "Literal",
                "name": "partner_bio",
                "value": true
              }
            ],
            "concreteType": "ArtistBlurb",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "text",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "credit",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistBioTestQuery",
    "id": null,
    "text": "query ArtistBioTestQuery {\n  bio: artist(id: \"unused\") {\n    ...ArtistBio_bio\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biography_blurb(format: HTML, partner_bio: true) {\n    text\n    credit\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f7fadd31b3f1d6d3ef89cd1911a4b0be';
export default node;
