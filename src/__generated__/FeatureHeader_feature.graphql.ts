/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureHeader_feature = {
    readonly name: string;
    readonly subheadline: string | null;
    readonly image: {
        readonly url: string | null;
    } | null;
    readonly " $refType": "FeatureHeader_feature";
};
export type FeatureHeader_feature$data = FeatureHeader_feature;
export type FeatureHeader_feature$key = {
    readonly " $data"?: FeatureHeader_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureHeader_feature">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureHeader_feature",
  "type": "Feature",
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
      "alias": "subheadline",
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "FeatureImage",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '7386675e0f31669178e3e2c164bdf9f1';
export default node;
