/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureApp_feature = {
    readonly " $fragmentRefs": FragmentRefs<"FeatureHeader_feature">;
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
      "kind": "FragmentSpread",
      "name": "FeatureHeader_feature",
      "args": null
    }
  ]
};
(node as any).hash = '76d11c95bc3f546cf83bc71a5f10873c';
export default node;
