/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistBio_bio$ref } from "./ArtistBio_bio.graphql";
import { FollowArtistButton_artist$ref } from "./FollowArtistButton_artist.graphql";
import { MarketInsightsArtistPage_artist$ref } from "./MarketInsightsArtistPage_artist.graphql";
import { SelectedExhibitions_exhibitions$ref } from "./SelectedExhibitions_exhibitions.graphql";
declare const _ArtistInfo_artist$ref: unique symbol;
export type ArtistInfo_artist$ref = typeof _ArtistInfo_artist$ref;
export type ArtistInfo_artist = {
    readonly _id: string;
    readonly id: string;
    readonly name: string | null;
    readonly href: string | null;
    readonly image: ({
        readonly cropped: ({
            readonly url: string | null;
        }) | null;
    }) | null;
    readonly formatted_nationality_and_birthday: string | null;
    readonly counts: ({
        readonly partner_shows: any | null;
    }) | null;
    readonly exhibition_highlights: ReadonlyArray<({
        readonly " $fragmentRefs": SelectedExhibitions_exhibitions$ref;
    }) | null> | null;
    readonly biography_blurb: ({
        readonly text: string | null;
    }) | null;
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
      "name": "_id",
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
          "kind": "LinkedField",
          "alias": null,
          "name": "cropped",
          "storageKey": "cropped(height:100,width:100)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 100,
              "type": "Int!"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100,
              "type": "Int!"
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
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
      "name": "id",
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
    v0
  ]
};
})();
(node as any).hash = '6abe6443f1943cccc465434221c1fb21';
export default node;
