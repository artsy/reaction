/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _ArtistBio_bio$ref: unique symbol;
export type ArtistBio_bio$ref = typeof _ArtistBio_bio$ref;
export type ArtistBio_bio = {
    readonly biography_blurb: {
        readonly text: string | null;
        readonly credit: string | null;
    } | null;
    readonly " $refType": ArtistBio_bio$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistBio_bio",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "biography_blurb",
      "storageKey": "biography_blurb(format:\"HTML\",partner_bio:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        },
        {
          "kind": "Literal",
          "name": "partner_bio",
          "value": true
        }
      ],
      "concreteType": "ArtistBlurb",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "text",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "credit",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '7f29aeb3dc2e2e1aea12bc09ede0391b';
export default node;
