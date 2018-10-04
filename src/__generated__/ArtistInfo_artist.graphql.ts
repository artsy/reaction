/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistBio_bio$ref } from "./ArtistBio_bio.graphql";
import { FollowArtistButton_artist$ref } from "./FollowArtistButton_artist.graphql";
import { MarketInsightsArtistPage_artist$ref } from "./MarketInsightsArtistPage_artist.graphql";
import { SelectedExhibitions_exhibitions$ref } from "./SelectedExhibitions_exhibitions.graphql";
declare const _ArtistInfo_artist$ref: unique symbol;
export type ArtistInfo_artist$ref = typeof _ArtistInfo_artist$ref;
export type ArtistInfo_artist = {
    readonly id: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly image: ({
        readonly url: string | null;
    }) | null;
    readonly formatted_nationality_and_birthday: string | null;
    readonly counts: ({
        readonly partner_shows: any | null;
    }) | null;
    readonly exhibition_highlights: ReadonlyArray<({
        readonly " $fragmentRefs": SelectedExhibitions_exhibitions$ref;
    }) | null> | null;
    readonly " $fragmentRefs": ArtistBio_bio$ref & MarketInsightsArtistPage_artist$ref & FollowArtistButton_artist$ref;
    readonly " $refType": ArtistInfo_artist$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtistInfo_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "partner_shows",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
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
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "square",
              "type": "[String]"
            }
          ],
          "storageKey": "url(version:\"square\")"
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "formatted_nationality_and_birthday",
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
      "kind": "LinkedField",
      "alias": null,
      "name": "exhibition_highlights",
      "storageKey": "exhibition_highlights(size:3)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 3,
          "type": "Int"
        }
      ],
      "concreteType": "Show",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "SelectedExhibitions_exhibitions",
          "args": null
        },
        v0
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistBio_bio",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "MarketInsightsArtistPage_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist",
      "args": null
    },
    v0
  ]
};
})();
(node as any).hash = 'c545f2e8120f6244fe025586de8a9241';
export default node;
