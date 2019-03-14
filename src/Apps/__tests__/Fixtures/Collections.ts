export const CollectionsFixture = [
  {
    title: "KAWS: Companions",
    slug: "kaws-companions",
    headerImage:
      "https://artsy-vanity-files-production.s3.amazonaws.com/images/kaws2.png",
  },
  {
    title: "Big Artists, Small Sculptures",
    slug: "collectible-sculptures",
    headerImage:
      "http://files.artsy.net/images/pumpkinsbigartistsmallsculpture.png",
    price_guidance: 1000,
  },
  {
    title: "Minimalist Prints",
    slug: "minimalist-prints",
    headerImage: "http://files.artsy.net/images/minimalistprints.png",
  },
  {
    title: "Contemporary Limited Editions",
    slug: "contemporary-limited-editions",
    headerImage:
      "http://files.artsy.net/images/contemporarylimitededition2.png",
  },
  {
    title: "Street Art Now",
    slug: "street-art-now",
    headerImage: "http://files.artsy.net/images/streetartnow.png",
    price_guidance: 200,
  },
  {
    title: "Timeless Modern Prints",
    slug: "timeless-modern-prints",
    headerImage: "http://files.artsy.net/images/timelessmodernprints.png",
  },
]

export const CollectionsRailFixture = [
  {
    slug: "jasper-johns-flags",
    headerImage: "http://files.artsy.net/images/jasperjohnsflag.png",
    title: "Jasper Johns: Flags",
    price_guidance: 1000,
    artworks: {
      hits: [
        {
          artist: {
            name: "Jasper Johns",
          },
          title: "Flag",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
          },
        },
        {
          artist: {
            name: "Jasper Johns",
          },
          title: "Flag (Moratorium)",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/Jyhryk2bLDdkpNflvWO0Lg/small.jpg",
          },
        },
        {
          artist: {
            name: "Jasper Johns",
          },
          title: "Flag I",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/gM-IwaZ9C24Y_RQTRW6F5A/small.jpg",
          },
        },
      ],
    },
  },
  {
    slug: "street-art-now",
    headerImage: "http://files.artsy.net/images/banksygirlwithballoon.png",
    title: "Street Art Now",
    price_guidance: 200,
    artworks: {
      hits: [
        {
          artist: {
            name: "Alec Monopoly",
          },
          title: "Community Chest: Go To Jail",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/DSa-4s-zRJEwW6mZRgDoxQ/small.jpg",
          },
        },
        {
          artist: {
            name: "Alec Monopoly",
          },
          title: "DJ Monopoly",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/L0wx7i69h96MUFq9EgOpBQ/small.jpg",
          },
        },
        {
          artist: {
            name: "Keith Haring",
          },
          title: "Keith Haring 1982 Dolphin lithograph",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/ZZodXz8Y7v7h0VWlQnZQCw/small.jpg",
          },
        },
      ],
    },
  },
  {
    slug: "contemporary-limited-editions",
    headerImage:
      "http://files.artsy.net/images/contemporarylimitededition2.png",
    title: "Contemporary Limited Editions",
    price_guidance: 1000,
    artworks: {
      hits: [
        {
          artist: {
            name: "Kiki Smith",
          },
          title: "Untitled",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/VzteQ4joB2Iwjek9kPUrGg/small.jpg",
          },
        },
        {
          artist: {
            name: "Gerhard Richter",
          },
          title: "P8",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/ZN_qyzZgvHz-DRMFW-Wrcw/small.jpg",
          },
        },
        {
          artist: {
            name: "Robert Longo",
          },
          title: "Monsters",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/0vJm9FeXzxzZJpBC-A-4ig/small.jpg",
          },
        },
      ],
    },
  },
  {
    slug: "timeless-modern-prints",
    headerImage: "http://files.artsy.net/images/timelessmodernprints.png",
    title: "Timeless Modern Prints",
    price_guidance: 2500,
    artworks: {
      hits: [
        {
          artist: {
            name: "Joan Miró",
          },
          title: "Migratory Bird I",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/_67k2lYpopsd-UK6LOD61g/small.jpg",
          },
        },
        {
          artist: {
            name: "Pablo Picasso",
          },
          title: "Bacchanale",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/mepJj80_m4NiWUJviymyBw/small.jpg",
          },
        },
        {
          artist: {
            name: "Josef Albers",
          },
          title: "Mitered Squares-Apricot ",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/CbgUJdNK5lWvhKzziYgx7w/small.jpg",
          },
        },
      ],
    },
  },
]

export const CategoriesFixture = [
  {
    name: "Abstract Art",
    collections: [
      {
        headerImage: "http://files.artsy.net/images/minimalistprints.png",
        slug: "minimalist-prints",
        title: "Minimalist Prints",
      },
    ],
  },
  {
    name: "Contemporary Art",
    collections: [
      {
        headerImage:
          "http://files.artsy.net/images/contemporarylimitededition2.png",
        slug: "contemporary-limited-editions",
        title: "Contemporary Limited Editions",
      },
    ],
  },
  {
    name: "Street Art",
    collections: [
      {
        headerImage: "http://files.artsy.net/images/streetartnow.png",
        slug: "street-art-now",
        title: "Street Art Now",
      },
      {
        headerImage: "http://files.artsy.net/images/streetartnow.png",
        slug: "banksy-girl-with-balloon",
        title: "Banksy: Girl with Balloon",
      },
      {
        headerImage: "http://files.artsy.net/images/shepardfaireyobama.png",
        slug: "shepard-fairey-barack-obama",
        title: "Shepard Fairey: Barack Obama",
      },
      {
        headerImage: "http://files.artsy.net/images/banksyrat.png",
        slug: "banksy-rats",
        title: "Banksy: Rats",
      },
      {
        headerImage: "http://files.artsy.net/images/banksydismaland.png",
        slug: "banksy-dismaland",
        title: "Banksy: Dismaland",
      },
      {
        headerImage:
          "http://files.artsy.net/images/jeanmichelbasquiatcrowns.png",
        slug: "jean-michel-basquiat-crowns",
        title: "Jean-Michel Basquiat: Crowns",
      },
      {
        headerImage: "http://files.artsy.net/images/popshopkeithharing.png",
        slug: "keith-haring-pop-shop",
        title: "Keith Haring: Pop Shop",
      },
      {
        headerImage:
          "http://files.artsy.net/images/shepardfaireywethepeople.png",
        slug: "shepard-fairey-we-the-people",
        title: "Shepard Fairey: We the People",
      },
    ],
  },
]
