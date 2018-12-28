/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkSharePanel_artwork$ref: unique symbol;
export type ArtworkSharePanel_artwork$ref = typeof _ArtworkSharePanel_artwork$ref;
export type ArtworkSharePanel_artwork = {
    readonly href: string | null;
    readonly images: ReadonlyArray<({
        readonly url: string | null;
    }) | null> | null;
    readonly artworkMeta: ({
        readonly share: string | null;
    }) | null;
    readonly " $refType": ArtworkSharePanel_artwork$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "ArtworkSharePanel_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artworkMeta",
      "name": "meta",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkMeta",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "share",
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
(node as any).hash = '1aa535d73c67f2bc420065b91e091f3c';
export default node;
