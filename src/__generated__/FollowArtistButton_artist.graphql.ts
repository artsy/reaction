/**
 * @generated SignedSource<<349073719f3d6bbbf03814b8d795c13b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowArtistButton_artist$data = {
  readonly id: string;
  readonly internalID: string;
  readonly name: string | null;
  readonly slug: string;
  readonly is_followed: boolean | null;
  readonly counts: {
    readonly follows: Int | null;
  } | null;
  readonly " $fragmentType": "FollowArtistButton_artist";
};
export type FollowArtistButton_artist = FollowArtistButton_artist$data;
export type FollowArtistButton_artist$key = {
  readonly " $data"?: FollowArtistButton_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"FollowArtistButton_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FollowArtistButton_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "is_followed",
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "follows",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "37ce17e390ffcba91d38b16acc1b87d5";

export default node;
