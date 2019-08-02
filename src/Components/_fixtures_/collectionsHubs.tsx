import { CollectionsHubsNav_marketingHubCollections } from "__generated__/CollectionsHubsNav_marketingHubCollections.graphql"

export const imageSamples = {
  contemporaryArt:
    "https://d32dm0rphc51dk.cloudfront.net/f_WVnADS9HIc5dQ-sIcejA/thumb.jpg",
  postWarArt:
    "https://d32dm0rphc51dk.cloudfront.net/dtSncXEq-KNTWbWNG_xMTA/thumb.jpg",
  impressionistAndModernArt:
    "https://d32dm0rphc51dk.cloudfront.net/Y2fVKtk64zRDfoGWgYSkJA/thumb.jpg",
  preTwentiethCentury:
    "https://d32dm0rphc51dk.cloudfront.net/adz_7LkzkU5A_ucVjQLMtQ/thumb.jpg",
  photography:
    "https://d32dm0rphc51dk.cloudfront.net/Cy1tDMUKkF_H-QN4BIDlDA/thumb.jpg",
  streetArt:
    "https://d32dm0rphc51dk.cloudfront.net/Tk7srLDTS-0Y60mbN7gWew/thumb.jpg",
}

export const marketingHubCollections: CollectionsHubsNav_marketingHubCollections = [
  {
    id: "1",
    slug: "street-art  ",
    title: "Street Art  ",
    thumbnail: imageSamples.streetArt,
    " $refType": null,
  },
  {
    id: "2",
    slug: "pre-twentieth-century",
    title: "Pre-20th",
    thumbnail: imageSamples.preTwentiethCentury,
    " $refType": null,
  },
  {
    id: "3",
    slug: "post-war-art",
    title: "Post-War",
    thumbnail: imageSamples.postWarArt,
    " $refType": null,
  },
  {
    id: "4",
    slug: "contemporary-art",
    title: "Contemporary",
    thumbnail: imageSamples.contemporaryArt,
    " $refType": null,
  },
  {
    id: "5",
    slug: "impressionist-and-modern-art",
    title: "Impressionist & Modern",
    thumbnail: imageSamples.impressionistAndModernArt,
    " $refType": null,
  },
  {
    id: "6",
    slug: "photography",
    title: "Photography",
    thumbnail: imageSamples.photography,
    " $refType": null,
  },
]
