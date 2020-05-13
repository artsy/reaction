/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureSet_set = {
    readonly name: string | null;
    readonly description: string | null;
    readonly itemType: string | null;
    readonly orderedItems: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly __typename: string;
                readonly id?: string;
                readonly " $fragmentRefs": FragmentRefs<"FeatureFeaturedLink_featuredLink">;
            } | null;
        } | null> | null;
    };
    readonly " $refType": "FeatureSet_set";
};
export type FeatureSet_set$data = FeatureSet_set;
export type FeatureSet_set$key = {
    readonly " $data"?: FeatureSet_set$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureSet_set">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureSet_set",
  "type": "OrderedSet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "itemType",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "orderedItems",
      "name": "orderedItemsConnection",
      "storageKey": "orderedItemsConnection(first:50)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        }
      ],
      "concreteType": "OrderedSetItemConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "OrderedSetItemEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "InlineFragment",
                  "type": "FeaturedLink",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "id",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "FragmentSpread",
                  "name": "FeatureFeaturedLink_featuredLink",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '083aa5a417d2906df27e4cb01b8fb35a';
export default node;
