/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _SearchResultsArtworksRoute_viewer$ref: unique symbol;
export type SearchResultsArtworksRoute_viewer$ref = typeof _SearchResultsArtworksRoute_viewer$ref;
export type SearchResultsArtworksRoute_viewer = {
    readonly search: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly title?: string | null;
                readonly artist_names?: string | null;
                readonly date?: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": SearchResultsArtworksRoute_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SearchResultsArtworksRoute_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "term",
      "type": "String!",
      "defaultValue": ""
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "search",
      "storageKey": null,
      "args": [
        {
          "kind": "Literal",
          "name": "entities",
          "value": [
            "ARTWORK"
          ],
          "type": "[SearchEntity]"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10,
          "type": "Int"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "term",
          "type": "String!"
        }
      ],
      "concreteType": "SearchableConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "SearchableEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__id",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "type": "Artwork",
                  "selections": [
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
                      "name": "artist_names",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "date",
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
    }
  ]
};
(node as any).hash = '990ffd13e50cb18e3370ec806b0069cb';
export default node;
