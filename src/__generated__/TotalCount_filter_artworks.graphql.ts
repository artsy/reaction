/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _TotalCount_filter_artworks$ref: unique symbol;
export type TotalCount_filter_artworks$ref = typeof _TotalCount_filter_artworks$ref;
export type TotalCount_filter_artworks = {
    readonly counts: {
        readonly total: any | null;
    } | null;
    readonly " $refType": TotalCount_filter_artworks$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "TotalCount_filter_artworks",
  "type": "FilterArtworks",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "FilterArtworksCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "total",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'ef252545faa2dcdc0445805a52f4e7c0';
export default node;
