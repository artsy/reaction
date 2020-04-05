/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Feature_viewer = {
    readonly articles: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"FeaturedArticles_articles">;
    } | null> | null;
    readonly selectedWorks: {
        readonly " $fragmentRefs": FragmentRefs<"SelectedWorks_selectedWorks">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FeaturedRails_viewer">;
    readonly " $refType": "Feature_viewer";
};
export type Feature_viewer$data = Feature_viewer;
export type Feature_viewer$key = {
    readonly " $data"?: Feature_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"Feature_viewer">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Feature_viewer",
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
      "kind": "LinkedField",
      "alias": "articles",
      "name": "articlesByInternalID",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "ids",
          "variableName": "articleIDs"
        }
      ],
      "concreteType": "Article",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "FeaturedArticles_articles",
          "args": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": "selectedWorks",
      "name": "orderedSet",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "selectedWorksSetID"
        }
      ],
      "concreteType": "OrderedSet",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "SelectedWorks_selectedWorks",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "FeaturedRails_viewer",
      "args": [
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
        }
      ]
    }
  ]
};
(node as any).hash = '688067701d20b665137a722832d7f93d';
export default node;
