/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FollowArtistPopover_suggested$ref } from "./FollowArtistPopover_suggested.graphql";
declare const _FollowArtistButton_artist$ref: unique symbol;
export type FollowArtistButton_artist$ref = typeof _FollowArtistButton_artist$ref;
export type FollowArtistButton_artist = {
    readonly __id: string;
    readonly id: string;
    readonly is_followed: boolean | null;
    readonly counts: ({
        readonly follows: any | null;
    }) | null;
    readonly " $fragmentRefs": FollowArtistPopover_suggested$ref;
    readonly " $refType": FollowArtistButton_artist$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "FollowArtistButton_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "showFollowSuggestions",
      "type": "Boolean",
      "defaultValue": false
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
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
      "kind": "ScalarField",
      "alias": null,
      "name": "is_followed",
      "args": null,
      "storageKey": null
    },
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
          "name": "follows",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "Condition",
      "passingValue": true,
      "condition": "showFollowSuggestions",
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "FollowArtistPopover_suggested",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = 'c8cd753c0684c100bbc6d08b01eec991';
export default node;
