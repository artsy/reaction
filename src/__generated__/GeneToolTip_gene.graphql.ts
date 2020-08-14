/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneToolTip_gene = {
    readonly description: string | null;
    readonly href: string | null;
    readonly slug: string;
    readonly internalID: string;
    readonly image: {
        readonly url: string | null;
    } | null;
    readonly name: string | null;
    readonly " $refType": "GeneToolTip_gene";
};
export type GeneToolTip_gene$data = GeneToolTip_gene;
export type GeneToolTip_gene$key = {
    readonly " $data"?: GeneToolTip_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneToolTip_gene">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneToolTip_gene",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "tall"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"tall\")"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Gene"
};
(node as any).hash = 'ab5f28661f9c5437186bbdaa00ac1414';
export default node;
