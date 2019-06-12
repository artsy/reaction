/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { CVItem_artist$ref } from "./CVItem_artist.graphql";
declare const _CV_viewer$ref: unique symbol;
export type CV_viewer$ref = typeof _CV_viewer$ref;
export type CV_viewer = {
    readonly artist_soloShows: {
        readonly " $fragmentRefs": CVItem_artist$ref;
    } | null;
    readonly artist_groupShows: {
        readonly " $fragmentRefs": CVItem_artist$ref;
    } | null;
    readonly artist_fairBooths: {
        readonly " $fragmentRefs": CVItem_artist$ref;
    } | null;
    readonly " $refType": CV_viewer$ref;
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
  "name": "CV_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "soloShows_at_a_fair",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "soloShows_solo_show",
      "type": "Boolean",
      "defaultValue": true
    },
    {
      "kind": "LocalArgument",
      "name": "groupShows_at_a_fair",
      "type": "Boolean",
      "defaultValue": false
    },
    {
      "kind": "LocalArgument",
      "name": "fairBooths_at_a_fair",
      "type": "Boolean",
      "defaultValue": true
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
      "alias": "artist_soloShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CVItem_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "at_a_fair",
              "variableName": "soloShows_at_a_fair"
            },
            {
              "kind": "Variable",
              "name": "solo_show",
              "variableName": "soloShows_solo_show"
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_groupShows",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CVItem_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "at_a_fair",
              "variableName": "groupShows_at_a_fair"
            }
          ]
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "artist_fairBooths",
      "name": "artist",
      "storageKey": null,
      "args": (v0/*: any*/),
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CVItem_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "at_a_fair",
              "variableName": "fairBooths_at_a_fair"
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'c44abe868f13498038d51c77daf31339';
export default node;
