/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtistSearchResults_viewer = {
    readonly searchConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID?: string;
                readonly displayLabel?: string | null;
                readonly imageUrl?: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistSearchResults_viewer";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistSearchResults_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "term",
      "type": "String!"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "searchConnection",
      "storageKey": null,
      "args": [
        {
          "kind": "Literal",
          "name": "entities",
          "value": [
            "ARTIST"
          ]
        },
        {
          "kind": "Literal",
          "name": "mode",
          "value": "AUTOSUGGEST"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "term"
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
                  "kind": "InlineFragment",
                  "type": "SearchableItem",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "internalID",
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
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "imageUrl",
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
(node as any).hash = 'abca0797fe1d8146680ff1b62d267567';
export default node;
