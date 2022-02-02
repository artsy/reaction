/**
 * @generated SignedSource<<8736e217932b550f468595c1f29960a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GeneToolTip_gene$data = {
  readonly description: string | null;
  readonly href: string | null;
  readonly slug: string;
  readonly internalID: string;
  readonly image: {
    readonly url: string | null;
  } | null;
  readonly name: string | null;
  readonly " $fragmentType": "GeneToolTip_gene";
};
export type GeneToolTip_gene = GeneToolTip_gene$data;
export type GeneToolTip_gene$key = {
  readonly " $data"?: GeneToolTip_gene$data;
  readonly " $fragmentSpreads": FragmentRefs<"GeneToolTip_gene">;
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
  "type": "Gene",
  "abstractKey": null
};

(node as any).hash = "ab5f28661f9c5437186bbdaa00ac1414";

export default node;
