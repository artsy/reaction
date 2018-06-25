/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type ExhibitionHighlightsQueryRendererQueryVariables = {
    readonly artistID: string;
};
export type ExhibitionHighlightsQueryRendererQueryResponse = {
    readonly artist: ({
        readonly exhibition_highlights: ReadonlyArray<({}) | null> | null;
    }) | null;
};



/*
query ExhibitionHighlightsQueryRendererQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    exhibition_highlights(size: 15) {
      ...SelectedExhibitions_exhibitions
      __id
    }
    __id
  }
}

fragment SelectedExhibitions_exhibitions on Show {
  partner {
    __typename
    ... on ExternalPartner {
      name
      __id
    }
    ... on Partner {
      name
    }
    ... on Node {
      __id
    }
  }
  name
  start_at(format: "YYYY")
  cover_image {
    cropped(width: 800, height: 600) {
      url
    }
  }
  city
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
v2 = [
  {
    "kind": "Literal",
    "name": "size",
    "value": 15,
    "type": "Int"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = [
  v4
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ExhibitionHighlightsQueryRendererQuery",
  "id": null,
  "text": "query ExhibitionHighlightsQueryRendererQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    exhibition_highlights(size: 15) {\n      ...SelectedExhibitions_exhibitions\n      __id\n    }\n    __id\n  }\n}\n\nfragment SelectedExhibitions_exhibitions on Show {\n  partner {\n    __typename\n    ... on ExternalPartner {\n      name\n      __id\n    }\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __id\n    }\n  }\n  name\n  start_at(format: \"YYYY\")\n  cover_image {\n    cropped(width: 800, height: 600) {\n      url\n    }\n  }\n  city\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ExhibitionHighlightsQueryRendererQuery",
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
            "kind": "LinkedField",
            "alias": null,
            "name": "exhibition_highlights",
            "storageKey": "exhibition_highlights(size:15)",
            "args": v2,
            "concreteType": "Show",
            "plural": true,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "SelectedExhibitions_exhibitions",
                "args": null
              },
              v3
            ]
          },
          v3
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ExhibitionHighlightsQueryRendererQuery",
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
            "name": "exhibition_highlights",
            "storageKey": "exhibition_highlights(size:15)",
            "args": v2,
            "concreteType": "Show",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "partner",
                "storageKey": null,
                "args": null,
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
                  v3,
                  {
                    "kind": "InlineFragment",
                    "type": "Partner",
                    "selections": v5
                  },
                  {
                    "kind": "InlineFragment",
                    "type": "ExternalPartner",
                    "selections": v5
                  }
                ]
              },
              v4,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "start_at",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "YYYY",
                    "type": "String"
                  }
                ],
                "storageKey": "start_at(format:\"YYYY\")"
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "cover_image",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "cropped",
                    "storageKey": "cropped(height:600,width:800)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 600,
                        "type": "Int!"
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 800,
                        "type": "Int!"
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
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
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "city",
                "args": null,
                "storageKey": null
              },
              v3
            ]
          },
          v3
        ]
      }
    ]
  }
};
})();
(node as any).hash = '74b5e1ea1ef93cb346a9ffb199e9ef86';
export default node;
