/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _SearchResultsArtistsRoute_viewer$ref: unique symbol;
export type SearchResultsArtistsRoute_viewer$ref = typeof _SearchResultsArtistsRoute_viewer$ref;
export type SearchResultsArtistsRoute_viewer = {
    readonly search: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly name?: string | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly " $refType": SearchResultsArtistsRoute_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SearchResultsArtistsRoute_viewer",
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
            "ARTIST"
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
                  "type": "Artist",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "name",
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
(node as any).hash = '3d3faae97e6950ba05e320b5cdd93944';
export default node;
