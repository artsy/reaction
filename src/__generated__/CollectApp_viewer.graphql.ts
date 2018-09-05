/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_viewer$ref } from "./ArtworkGrid_viewer.graphql";
declare const _CollectApp_viewer$ref: unique symbol;
export type CollectApp_viewer$ref = typeof _CollectApp_viewer$ref;
export type CollectApp_viewer = {
    readonly " $fragmentRefs": ArtworkGrid_viewer$ref;
    readonly " $refType": CollectApp_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectApp_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkGrid_viewer",
      "args": null
    }
  ]
};
(node as any).hash = '4c99c398ca24361f4061d49d8e94568a';
export default node;
