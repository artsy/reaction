/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Shows_viewer = {
    readonly artist_currentShows: ({}) | null;
    readonly artist_currentShowsPageCount: ({
        readonly showsConnection: ({
            readonly pageCursors: ({
                readonly around: ReadonlyArray<{
                    readonly page: number;
                }>;
            }) | null;
            readonly totalCount: number | null;
        }) | null;
    }) | null;
    readonly artist_upcomingShows: ({}) | null;
    readonly artist_pastShows: ({}) | null;
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
      "alias": "artist_currentShowsPageCount",
      "name": "artist",
      "storageKey": null,
      "args": v0,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "showsConnection",
          "storageKey": "showsConnection(first:4,sort:\"END_AT_ASC\",status:\"running\")",
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 4,
              "type": "Int"
            },
            {
              "kind": "Literal",
              "name": "sort",
              "value": "END_AT_ASC",
              "type": "PartnerShowSorts"
            },
            {
              "kind": "Literal",
              "name": "status",
              "value": "running",
              "type": "String"
            }
          ],
          "concreteType": "ShowConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "pageCursors",
              "storageKey": null,
              "args": null,
              "concreteType": "PageCursors",
              "plural": false,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "around",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "PageCursor",
                  "plural": true,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "page",
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
              "name": "totalCount",
              "args": null,
              "storageKey": null
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
(node as any).hash = '81516cd174d843eda5acd05a54efdc90';
export default node;
