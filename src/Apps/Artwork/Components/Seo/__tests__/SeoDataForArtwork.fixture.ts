import { SeoDataForArtwork_artwork } from "__generated__/SeoDataForArtwork_artwork.graphql"

export const SeoDataForArtworkFixture: SeoDataForArtwork_artwork = {
  " $refType": undefined,
  href: "/artwork/an-artwork",
  date: "1950",
  is_price_hidden: false,
  is_price_range: false,
  price: "",
  price_currency: "USD",
  sale_message: "sale message",
  meta_image: {
    resized: {
      width: 640,
      height: 640,
      url: "artwork-image",
    },
  },
  meta: {
    title: "artwork title",
    description: "artwork description",
  },
  partner: {
    name: "Wright",
    type: "Auction House",
  },
  artist_names: "Artist McArtist",
  availability: "for sale",
  category: "Design/Decorative Art",
  dimensions: {
    in: "1 × 2 in",
  },
}
