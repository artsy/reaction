/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureApp_feature = {
    readonly name: string;
    readonly " $refType": "FeatureApp_feature";
};
export type FeatureApp_feature$data = FeatureApp_feature;
export type FeatureApp_feature$key = {
    readonly " $data"?: FeatureApp_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureApp_feature">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureApp_feature",
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
    }
  ]
};
(node as any).hash = '8d3e8d14c09f18f704309438d68ead7d';
export default node;
