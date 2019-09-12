/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistShows_artist$ref } from "./ArtistShows_artist.graphql";
declare const _Shows_viewer$ref: unique symbol;
export type Shows_viewer$ref = typeof _Shows_viewer$ref;
export type Shows_viewer = {
    readonly artist_currentShows: ({
        readonly " $fragmentRefs": ArtistShows_artist$ref;
    }) | null;
    readonly artist_upcomingShows: ({
        readonly " $fragmentRefs": ArtistShows_artist$ref;
    }) | null;
    readonly artist_pastShows: ({
        readonly " $fragmentRefs": ArtistShows_artist$ref;
    }) | null;
    readonly " $refType": Shows_viewer$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Shows_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "currentShowsStatus",
      "type": "String",
      "defaultValue": "running"
    },
    {
      "kind": "LocalArgument",
      "name": "currentShowsSort",
      "type": "PartnerShowSorts",
      "defaultValue": "END_AT_ASC"
    },
    {
      "kind": "LocalArgument",
      "name": "upcomingShowsStatus",
      "type": "String",
      "defaultValue": "upcoming"
    },
    {
      "kind": "LocalArgument",
      "name": "upcomingShowsSort",
      "type": "PartnerShowSorts",
      "defaultValue": "START_AT_ASC"
    },
    {
      "kind": "LocalArgument",
      "name": "pastShowsStatus",
      "type": "String",
      "defaultValue": "closed"
    },
    {
      "kind": "LocalArgument",
      "name": "pastShowsSort",
      "type": "PartnerShowSorts",
      "defaultValue": "END_AT_DESC"
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
      "alias": "artist_currentShows",
      "name": "artist",
      "storageKey": null,
      "args": v0,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "sort",
              "variableName": "currentShowsSort",
              "type": null
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "currentShowsStatus",
              "type": null
            }
          ]
        },
        v1
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_upcomingShows",
      "name": "artist",
      "storageKey": null,
      "args": v0,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "sort",
              "variableName": "upcomingShowsSort",
              "type": null
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "upcomingShowsStatus",
              "type": null
            }
          ]
        },
        v1
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_pastShows",
      "name": "artist",
      "storageKey": null,
      "args": v0,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "ArtistShows_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "sort",
              "variableName": "pastShowsSort",
              "type": null
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "pastShowsStatus",
              "type": null
            }
          ]
        },
        v1
      ]
    }
  ]
};
})();
(node as any).hash = '80a700bd21b6c8b6c0b8ed5c5420a127';
export default node;
