/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { Fillwidth_artworks$ref } from "./Fillwidth_artworks.graphql";
import { Follow_artist$ref } from "./Follow_artist.graphql";
declare const _ArtistRow_artist$ref: unique symbol;
export type ArtistRow_artist$ref = typeof _ArtistRow_artist$ref;
export type ArtistRow_artist = {
    readonly name: string | null;
    readonly href: string | null;
    readonly artworks: {
        readonly " $fragmentRefs": Fillwidth_artworks$ref;
    } | null;
    readonly " $fragmentRefs": Follow_artist$ref;
    readonly " $refType": ArtistRow_artist$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistRow_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "artworks",
      "name": "artworks_connection",
      "storageKey": "artworks_connection(first:6)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        }
      ],
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Fillwidth_artworks",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "Follow_artist",
      "args": null
    }
  ]
};
(node as any).hash = 'b65c87fce5097ae99473b0bbd008e4a1';
export default node;
