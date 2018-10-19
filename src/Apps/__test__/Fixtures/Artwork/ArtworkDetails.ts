export const ArtworkDetailsFixture = {
  id: "richard-prince-untitled-fashion",
  description: "Artist designed towel for WOW. --*Courtesy of EHC Fine Art*",
  is_in_auction: false,
  additional_information:
    '<p>Signed and dated in pencil, outside of the edition of 150; sheet: 58 x 58cm</p>\n<p>Subject to Artist’s Resale Rights (see <a href="https://chiswickauctions.co.uk/wp-content/uploads/Chiswick-Auctions-Buyers-Terms-and-Conditions-3.pdf">Conditions of Sale</a> for further information)</p>\n',
  partner: {
    name: "Salon 94",
    initials: "S9",
    locations: [
      { city: "New York" },
      { city: "Kharkov" },
      { city: "New York" },
      { city: "" },
    ],
    profile: {
      __id: "profile",
      is_followed: true,
      icon: { url: "https://picsum.photos/110/110/?random" },
    },
  },
  framed: { label: "Framed", details: null },
  signatureInfo: {
    label: "Signed",
    details: "Hand-signed by the artist, stamped by artist’s estate.",
  },
  conditionDescription: {
    label: "Condition details",
    details:
      "Slight discoloration from sun exposure, light abrasion in lower left.",
  },
  certificateOfAuthenticity: {
    label: "Certificate of authenticity",
    details: null,
  },
  series: "Lorem Ipsum Dolor",
  publisher: "Factory Editions, New York",
  manufacturer: "Mfg Group",
  provenance: "Peter Freeman Inc., New York",
  image_rights: "Courtesy of Chiswick Auctions",
  articles: [
    {
      author: {
        name: "Artsy Editorial",
      },
      href: "/article/artsy-editorial-the-most-iconic-artists-of-the-1980s",
      published_at: "Aug 17th, 2015",
      thumbnail_image: {
        resized: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=300&quality=80&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FDOdbp-Vj_cXRKQhnZFhq0g%252Flarger-5.jpg",
        },
      },
      thumbnail_title: "The Most Iconic Artists of the 1980s",
    },
  ],
  iterature: "Some literature info goes here",
  exhibition_history: "And the work was so excibited!",
}
