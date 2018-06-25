/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type OverviewQueryRendererQueryVariables = {
    readonly artistID: string;
};
export type OverviewQueryRendererQueryResponse = {
    readonly artist: ({}) | null;
};



/*
query OverviewQueryRendererQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...ArtistBio_bio
    __id
  }
}

fragment ArtistBio_bio on Artist {
  biography_blurb(format: HTML, partner_bio: true) {
    text
    credit
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "OverviewQueryRendererQuery",
  "id": null,
  "text": "query OverviewQueryRendererQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistBio_bio\n    __id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biography_blurb(format: HTML, partner_bio: true) {\n    text\n    credit\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "OverviewQueryRendererQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistBio_bio",
            "args": null
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "OverviewQueryRendererQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
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
                "value": "HTML",
                "type": "Format"
              },
              {
                "kind": "Literal",
                "name": "partner_bio",
                "value": true,
                "type": "Boolean"
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
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'ec7ddf616f5b4957eff29292a514717e';
export default node;
