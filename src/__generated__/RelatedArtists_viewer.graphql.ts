/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type RelatedArtists_viewer = {
    readonly mainArtists: ({}) | null;
    readonly contemporaryArtists: ({}) | null;
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
      "kind": "LocalArgument",
      "name": "contemporaryKind",
      "type": "RelatedArtistsKind",
      "defaultValue": "CONTEMPORARY"
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
      "args": v0,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "RelatedArtistsRefetchContainer_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "kind",
              "variableName": "mainKind",
              "type": null
            }
          ]
        },
        v1
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "contemporaryArtists",
      "name": "artist",
      "storageKey": null,
      "args": v0,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "RelatedArtistsRefetchContainer_artist",
          "args": [
            {
              "kind": "Variable",
              "name": "kind",
              "variableName": "contemporaryKind",
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
(node as any).hash = 'aeaba439733fb00e9c1a9e72ff0e6c1e';
export default node;
