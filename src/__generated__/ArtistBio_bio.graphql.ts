/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _ArtistBio_bio$ref: unique symbol;
export type ArtistBio_bio$ref = typeof _ArtistBio_bio$ref;
export type ArtistBio_bio = {
    readonly biography_blurb: ({
        readonly text: string | null;
    }) | null;
    readonly " $refType": ArtistBio_bio$ref;
};



const node: ConcreteFragment = {
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
          "value": "HTML",
          "type": "Format"
        },
        {
          "kind": "Literal",
          "name": "partner_bio",
          "value": true,
          "type": "Boolean"
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
(node as any).hash = 'e736551112eb378b9d7e96216c0fcb23';
export default node;
