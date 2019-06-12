/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtistShows_artist$ref } from "./ArtistShows_artist.graphql";
declare const _Shows_viewer$ref: unique symbol;
export type Shows_viewer$ref = typeof _Shows_viewer$ref;
export type Shows_viewer = {
    readonly artist_currentShows: {
        readonly " $fragmentRefs": ArtistShows_artist$ref;
    } | null;
    readonly artist_upcomingShows: {
        readonly " $fragmentRefs": ArtistShows_artist$ref;
    } | null;
    readonly artist_pastShows: {
        readonly " $fragmentRefs": ArtistShows_artist$ref;
    } | null;
    readonly " $refType": Shows_viewer$ref;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
];
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
      "defaultValue": "end_at_asc"
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
      "defaultValue": "start_at_asc"
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
      "defaultValue": "end_at_desc"
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
      "args": (v0/*: any*/),
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
              "variableName": "currentShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "currentShowsStatus"
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_upcomingShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
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
              "variableName": "upcomingShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "upcomingShowsStatus"
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_pastShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
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
              "variableName": "pastShowsSort"
            },
            {
              "kind": "Variable",
              "name": "status",
              "variableName": "pastShowsStatus"
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'a5b24380340288a2abae7669e3103624';
export default node;
