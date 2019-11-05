/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtistBio_bio = {
    readonly biography_blurb: {
        readonly text: string | null;
    } | null;
    readonly " $refType": "ArtistBio_bio";
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
      "alias": "biography_blurb",
      "name": "biographyBlurb",
      "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        },
        {
          "kind": "Literal",
          "name": "partnerBio",
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
        }
      ]
    }
  ]
};
(node as any).hash = 'db22a8e9fe1267a0d9dd915b0cbe75c2';
export default node;
