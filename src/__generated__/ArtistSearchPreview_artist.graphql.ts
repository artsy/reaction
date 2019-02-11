/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtistSearchPreview_artist$ref: unique symbol;
export type ArtistSearchPreview_artist$ref = typeof _ArtistSearchPreview_artist$ref;
export type ArtistSearchPreview_artist = {
    readonly marketingCollections: ReadonlyArray<({
        readonly title: string;
    }) | null> | null;
    readonly " $refType": ArtistSearchPreview_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtistSearchPreview_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "marketingCollections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "plural": true,
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
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'cd2fc82225ebe403923888807c11ce3a';
export default node;
