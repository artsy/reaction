/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _GeneToolTip_gene$ref: unique symbol;
export type GeneToolTip_gene$ref = typeof _GeneToolTip_gene$ref;
export type GeneToolTip_gene = {
    readonly description: string | null;
    readonly href: string | null;
    readonly id: string;
    readonly _id: string;
    readonly image: ({
        readonly url: string | null;
    }) | null;
    readonly name: string | null;
    readonly " $refType": GeneToolTip_gene$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "GeneToolTip_gene",
  "type": "Gene",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
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
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "tall",
              "type": "[String]"
            }
          ],
          "storageKey": "url(version:\"tall\")"
        },
        {
          "kind": "ScalarField",
          "alias": "__id",
          "name": "id",
          "args": null,
          "storageKey": null
        }
      ]
    },
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
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'e4df0664535bb18b36a35439157de4ce';
export default node;
