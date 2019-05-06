/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _GeneSearchResults_viewer$ref: unique symbol;
export type GeneSearchResults_viewer$ref = typeof _GeneSearchResults_viewer$ref;
export type GeneSearchResults_viewer = {
    readonly match_gene: ReadonlyArray<({
        readonly name: string | null;
        readonly id: string;
        readonly _id: string;
        readonly image: ({
            readonly cropped: ({
                readonly url: string | null;
            }) | null;
        }) | null;
    }) | null> | null;
    readonly " $refType": GeneSearchResults_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "GeneSearchResults_viewer",
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
      "name": "match_gene",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "term",
          "variableName": "term",
          "type": "String!"
        }
      ],
      "concreteType": "Gene",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
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
          "name": "_id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "image",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "cropped",
              "storageKey": "cropped(height:100,width:100)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 100,
                  "type": "Int!"
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 100,
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
          "name": "__id",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '6adc25a242a646cc0d4169ff9d4e5c20';
export default node;
