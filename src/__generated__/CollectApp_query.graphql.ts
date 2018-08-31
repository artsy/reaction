/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkGrid_query$ref } from "./ArtworkGrid_query.graphql";
declare const _CollectApp_query$ref: unique symbol;
export type CollectApp_query$ref = typeof _CollectApp_query$ref;
export type CollectApp_query = {
    readonly " $fragmentRefs": ArtworkGrid_query$ref;
    readonly " $refType": CollectApp_query$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "CollectApp_query",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkGrid_query",
      "args": null
    }
  ]
};
(node as any).hash = '6a98f08291bb84f40a278e650d02e205';
export default node;
