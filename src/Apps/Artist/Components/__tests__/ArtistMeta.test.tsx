import {
  offersAttributes,
  productAttributes,
  sellerFromPartner,
  structuredDataAttributes,
} from "../ArtistMeta"

jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://www.artsy-test.net",
  },
}))

describe("Meta", () => {
  const artist = {
    id: "claes-oldenburg",
    name: "Claes Oldenburg",
    nationality: "Swedish",
    birthday: "1929",
    alternate_names: null,
    counts: null,
    blurb: null,
    deathday: null,
    gender: "male",
    href: "/artist/claes-oldenburg",
    meta: {
      title: "cool art",
      description:
        "Find the latest shows, biography, and artworks for sale by Claes Oldenburg. “I am for an art that is political-erotical-mystical, that does something more th…",
    },
    image: {
      versions: ["small", "large"],
      large:
        "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg",
      square:
        "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/square.jpg",
    },
    artworks_connection: {
      edges: [
        {
          node: {
            date: "1993",
            title:
              "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
            availability: "for sale",
            description: null,
            category: "Drawing, Collage or other Work on Paper",
            price_currency: "USD",
            is_price_range: false,
            href:
              "/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
            image: {
              small:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
              large:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
            },
            partner: {
              name: "VINCE fine arts/ephemera",
              href: "/vince-fine-arts-slash-ephemera",
              profile: {
                image: {
                  small:
                    "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                  large:
                    "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                },
              },
            },
          },
        },
      ],
    },
    " $refType": null,
  }

  describe("structured data", () => {
    it("Constructs a json object from data", () => {
      const json = structuredDataAttributes(artist)

      expect(json).toEqual({
        additionalType: "Artist",
        name: "Claes Oldenburg",
        url: "https://www.artsy-test.net/artist/claes-oldenburg",
        gender: "male",
        image:
          "https://d32dm0rphc51dk.cloudfront.net/6q6LeyKvA_vpT5YzHRSNUA/large.jpg",
        birthDate: "1929",
        mainEntityOfPage: "https://www.artsy-test.net/artist/claes-oldenburg",
        description:
          "Find the latest shows, biography, and artworks for sale by Claes Oldenburg. “I am for an art that is political-erotical-mystical, that does something more th…",
        nationality: {
          "@type": "Country",
          name: "Swedish",
        },
        makesOffer: [
          {
            "@type": "Offer",
            availability: "InStock",
            itemOffered: {
              "@type": "Product",
              additionalType: "Drawing, Collage or other Work on Paper",
              brand: {
                "@type": "Person",
                name: "Claes Oldenburg",
              },
              image: {
                "@type": "ImageObject",
                thumbnailUrl:
                  "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
              },
              name:
                "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
              productionDate: "1993",
              url:
                "https://www.artsy-test.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
            },
            priceCurrency: "USD",
            seller: {
              "@context": "http://schema.org",
              "@type": "ArtGallery",
              name: "VINCE fine arts/ephemera",
              url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
              image: {
                "@type": "ImageObject",
                thumbnailUrl:
                  "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
              },
            },
          },
        ],
      })
    })

    it("Omits empty keys", () => {
      const json = structuredDataAttributes(artist)
      expect(Object.keys(json).includes("deathday")).toBe(false)
    })

    it("#artistToJsonOffers constructs offers array from artist", () => {
      const json = offersAttributes(artist)
      expect(json).toEqual([
        {
          "@type": "Offer",
          availability: "InStock",
          itemOffered: {
            "@type": "Product",
            additionalType: "Drawing, Collage or other Work on Paper",
            brand: {
              "@type": "Person",
              name: "Claes Oldenburg",
            },
            image: {
              "@type": "ImageObject",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
              thumbnailUrl:
                "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
            },
            productionDate: "1993",
            name:
              "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
            url:
              "https://www.artsy-test.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
          },
          priceCurrency: "USD",
          seller: {
            "@context": "http://schema.org",
            "@type": "ArtGallery",
            name: "VINCE fine arts/ephemera",
            url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
            image: {
              "@type": "ImageObject",
              thumbnailUrl:
                "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
            },
          },
        },
      ])
    })

    it("#productFromArtistArtwork construct product object from artist/artwork", () => {
      const artwork = artist.artworks_connection.edges[0].node
      const json = productAttributes(artist, artwork)

      expect(json).toEqual({
        "@type": "Product",
        additionalType: "Drawing, Collage or other Work on Paper",
        productionDate: "1993",
        name:
          "'25 Years Studio',  1993, SIGNED by the BIG-8 Contemporary Artists, Gemini G.E.L.",
        url:
          "https://www.artsy-test.net/artwork/robert-rauschenberg-25-years-studio-1993-signed-by-the-big-8-contemporary-artists-gemini-gel",
        image: {
          "@type": "ImageObject",
          thumbnailUrl:
            "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/small.jpg",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/PmBrn30fGmg9dGwk2Nf51w/large.jpg",
        },
        brand: {
          "@type": "Person",
          name: "Claes Oldenburg",
        },
      })
    })

    it("#sellerFromPartner constructs seller object from partner", () => {
      const partner = artist.artworks_connection.edges[0].node.partner
      const json = sellerFromPartner(partner)
      expect(json).toEqual({
        "@context": "http://schema.org",
        "@type": "ArtGallery",
        name: "VINCE fine arts/ephemera",
        url: "https://www.artsy-test.net/vince-fine-arts-slash-ephemera",
        image: {
          "@type": "ImageObject",
          thumbnailUrl:
            "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/vIzxQvuBS8gZVPUOKc4tPQ/wide.jpg",
        },
      })
    })
  })
})
