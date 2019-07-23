/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _DefaultHeader_headerArtworks$ref: unique symbol;
export type DefaultHeader_headerArtworks$ref = typeof _DefaultHeader_headerArtworks$ref;
export type DefaultHeader_headerArtworks = {
    readonly hits: ReadonlyArray<({
        readonly id: string;
        readonly imageUrl: string | null;
    }) | null> | null;
    readonly " $refType": DefaultHeader_headerArtworks$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "DefaultHeader_headerArtworks",
  "type": "FilterArtworks",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "hits",
      "storageKey": null,
      "args": null,
      "concreteType": "Artwork",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "imageUrl",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '9ab248af491b30ccbdaeff022fb146b8';
export default node;
