/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { RelatedArtistsList_artist$ref } from "./RelatedArtistsList_artist.graphql";
declare const _RelatedArtists_viewer$ref: unique symbol;
export type RelatedArtists_viewer$ref = typeof _RelatedArtists_viewer$ref;
export type RelatedArtists_viewer = {
    readonly mainArtists: ({
        readonly " $fragmentRefs": RelatedArtistsList_artist$ref;
    }) | null;
    readonly " $refType": RelatedArtists_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "RelatedArtists_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "mainKind",
      "type": "RelatedArtistsKind",
      "defaultValue": "MAIN"
    },
    {
      "kind": "RootArgument",
      "name": "artistID",
      "type": "String!"
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "mainArtists",
      "name": "artist",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "artistID",
          "type": "String!"
        }
      ],
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "RelatedArtistsList_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "kind",
              "variableName": "mainKind",
              "type": null
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
    }
  ]
};
(node as any).hash = 'fd196510acb3d183e6e2383a7af6cb7f';
export default node;
