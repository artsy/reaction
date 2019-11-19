/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Header_artworks = {
    readonly merchandisableArtists: ReadonlyArray<{
        readonly slug: string;
        readonly internalID: string;
        readonly name: string | null;
        readonly imageUrl: string | null;
        readonly birthday: string | null;
        readonly nationality: string | null;
        readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"DefaultHeader_headerArtworks">;
    readonly " $refType": "Header_artworks";
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Header_artworks",
  "type": "FilterArtworksConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "merchandisableArtists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slug",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
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
          "name": "imageUrl",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "birthday",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "nationality",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "FollowArtistButton_artist",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "DefaultHeader_headerArtworks",
      "args": null
    }
  ]
};
(node as any).hash = '7094c150ec1332c9565fc3a75995460f';
export default node;
