/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type Overview_artist = {
    readonly exhibition_highlights: ReadonlyArray<({}) | null> | null;
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
  "name": "Overview_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "medium",
      "type": null
    },
    {
      "kind": "RootArgument",
      "name": "major_periods",
      "type": null
    },
    {
      "kind": "RootArgument",
      "name": "partner_id",
      "type": null
    },
    {
      "kind": "RootArgument",
      "name": "for_sale",
      "type": null
    }
  ],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtistHeader_artist",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtistBio_bio",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "exhibition_highlights",
      "storageKey": "exhibition_highlights(size:15)",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 15,
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
      "name": "ArtworkFilter_artist",
      "args": [
        {
          "kind": "Variable",
          "name": "for_sale",
          "variableName": "for_sale",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "major_periods",
          "variableName": "major_periods",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "medium",
          "variableName": "medium",
          "type": null
        },
        {
          "kind": "Variable",
          "name": "partner_id",
          "variableName": "partner_id",
          "type": null
        }
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '6fc171060ec9987d2b32e50661b275c8';
export default node;
