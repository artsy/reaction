/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _ArtworkSidebarSizeInfo_piece$ref: unique symbol;
export type ArtworkSidebarSizeInfo_piece$ref = typeof _ArtworkSidebarSizeInfo_piece$ref;
export type ArtworkSidebarSizeInfo_piece = {
    readonly dimensions: {
        readonly in: string | null;
        readonly cm: string | null;
    } | null;
    readonly edition_of: string | null;
    readonly " $refType": ArtworkSidebarSizeInfo_piece$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarSizeInfo_piece",
  "type": "Sellable",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "dimensions",
      "storageKey": null,
      "args": null,
      "concreteType": "dimensions",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "in",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cm",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "edition_of",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '0b7abbfbf9eeaea9d739a6744e2c2403';
export default node;
