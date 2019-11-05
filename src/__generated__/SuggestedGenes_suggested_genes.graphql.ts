/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type SuggestedGenes_suggested_genes = ReadonlyArray<{
    readonly slug: string;
    readonly internalID: string;
    readonly name: string | null;
    readonly image: {
        readonly cropped: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly " $refType": "SuggestedGenes_suggested_genes";
}>;



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "SuggestedGenes_suggested_genes",
  "type": "Gene",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
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
      "name": "name",
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
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100
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
    }
  ]
};
(node as any).hash = '3e28c61f569f8c7251477f84f3bd576d';
export default node;
