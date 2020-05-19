/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureMeta_feature = {
    readonly name: string;
    readonly " $refType": "FeatureMeta_feature";
};
export type FeatureMeta_feature$data = FeatureMeta_feature;
export type FeatureMeta_feature$key = {
    readonly " $data"?: FeatureMeta_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureMeta_feature">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureMeta_feature",
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
(node as any).hash = 'cde86c114e111e67e608d69980fad872';
export default node;
