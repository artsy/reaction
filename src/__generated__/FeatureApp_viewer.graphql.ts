/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureApp_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"Feature_viewer">;
    readonly " $refType": "FeatureApp_viewer";
};
export type FeatureApp_viewer$data = FeatureApp_viewer;
export type FeatureApp_viewer$key = {
    readonly " $data"?: FeatureApp_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureApp_viewer">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureApp_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "articleIDs",
      "type": "[String]!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "selectedWorksSetID",
      "type": "String!",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "collectionRailItemIDs",
      "type": "[String!]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "auctionRailItemIDs",
      "type": "[String!]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "fairRailItemIDs",
      "type": "[String!]",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Feature_viewer",
      "args": [
        {
          "kind": "Variable",
          "name": "articleIDs",
          "variableName": "articleIDs"
        },
        {
          "kind": "Variable",
          "name": "auctionRailItemIDs",
          "variableName": "auctionRailItemIDs"
        },
        {
          "kind": "Variable",
          "name": "collectionRailItemIDs",
          "variableName": "collectionRailItemIDs"
        },
        {
          "kind": "Variable",
          "name": "fairRailItemIDs",
          "variableName": "fairRailItemIDs"
        },
        {
          "kind": "Variable",
          "name": "selectedWorksSetID",
          "variableName": "selectedWorksSetID"
        }
      ]
    }
  ]
};
(node as any).hash = '4aad02f49ba75ee3589d321b0eb93fdc';
export default node;
