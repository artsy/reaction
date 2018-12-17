/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtworkSharePanel_artwork$ref: unique symbol;
export type ArtworkSharePanel_artwork$ref = typeof _ArtworkSharePanel_artwork$ref;
export type ArtworkSharePanel_artwork = {
    readonly href: string | null;
    readonly images: ReadonlyArray<({
        readonly url: string | null;
    }) | null> | null;
    readonly imageDescription: string | null;
    readonly title: string | null;
    readonly date: string | null;
    readonly artists: ReadonlyArray<({
        readonly name: string | null;
    }) | null> | null;
    readonly partner: ({
        readonly name: string | null;
    }) | null;
    readonly " $refType": ArtworkSharePanel_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  },
  v0
];
return {
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
      "kind": "ScalarField",
      "alias": "imageDescription",
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": v1
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": v1
    },
    v0
  ]
};
})();
(node as any).hash = '2cc649ce87b0d832cee588058d3766e1';
export default node;
