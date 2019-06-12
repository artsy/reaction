/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _Headline_facet$ref: unique symbol;
export type Headline_facet$ref = typeof _Headline_facet$ref;
export type Headline_facet = {
    readonly name?: string | null;
    readonly " $refType": Headline_facet$ref;
} & ({
    readonly name: string | null;
} | {
    readonly name: string | null;
} | {
    /*This will never be '% other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
});



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "Headline_facet",
  "type": "ArtworkFilterFacet",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "InlineFragment",
      "type": "ArtworkFilterTag",
      "selections": (v0/*: any*/)
    },
    {
      "kind": "InlineFragment",
      "type": "ArtworkFilterGene",
      "selections": (v0/*: any*/)
    }
  ]
};
})();
(node as any).hash = 'fe0e6f752ce23f2a03e177de220f2ed6';
export default node;
