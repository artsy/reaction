/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistArticles_artist$ref } from "./ArtistArticles_artist.graphql";
declare const _Articles_artist$ref: unique symbol;
export type Articles_artist$ref = typeof _Articles_artist$ref;
export type Articles_artist = {
    readonly " $fragmentRefs": ArtistArticles_artist$ref;
    readonly " $refType": Articles_artist$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Articles_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistArticles_artist",
      "args": null
    }
  ]
};
(node as any).hash = '98d755e5b63a5214bafae8262897cdab';
export default node;
