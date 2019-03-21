export const SearchAppFixture = {
  filter_artworks: {
    __id:
      "RmlsdGVyQXJ0d29ya3M6eyJhY3F1aXJlYWJsZSI6dHJ1ZSwiYWdncmVnYXRpb25zIjpbInRvdGFsIl0sImF0dHJpYnV0aW9uX2NsYXNzIjpbXSwibWFqb3JfcGVyaW9kcyI6W10sInByaWNlX3JhbmdlIjoiKi0qIiwic2l6ZSI6MCwic29ydCI6Ii1kZWNheWVkX21lcmNoIn0=",
    aggregations: [
      {
        slice: "MEDIUM",
        counts: [
          {
            id: "sculpture",
            name: "Sculpture",
          },
          {
            id: "prints",
            name: "Prints",
          },
        ],
      },
    ],
    artworks: {
      pageInfo: {
        hasNextPage: true,
        endCursor: "YXJyYXljb25uZWN0aW9uOjI5",
      },
      pageCursors: {
        around: [
          {
            cursor: "YXJyYXljb25uZWN0aW9uOi0x",
            page: 1,
            isCurrent: true,
          },
        ],
        first: null,
        last: {
          cursor: "YXJyYXljb25uZWN0aW9uOjI5Mzk=",
          page: 99,
          isCurrent: false,
        },
        previous: null,
      },
      edges: [
        {
          node: {
            __id:
              "QXJ0d29yazpwYWJsby1waWNhc3NvLWZlbW1lLWF1LWNoYXBlYXUtZ3Jpcw==",
            image: {
              aspect_ratio: 0.75,
              placeholder: "132.7716643741403%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/dQSw9eLmqUdJPzzkgqiPHA/large.jpg",
            },
            is_biddable: false,
            sale: null,
            is_acquireable: true,
            href: "/artwork/pablo-picasso-femme-au-chapeau-gris",
            title: "FEMME AU CHAPEAU GRIS",
            date: "1979-1982",
            sale_message: "$1,950",
            cultural_maker: null,
            artists: [
              {
                __id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
                href: "/artist/pablo-picasso",
                name: "Pablo Picasso",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Gallery Art",
              href: "/gallery-art",
              __id: "UGFydG5lcjpnYWxsZXJ5LWFydA==",
              type: "Gallery",
            },
            sale_artwork: null,
            _id: "5bae9f7fb03bf34d66f6a6b2",
            is_inquireable: true,
            id: "pablo-picasso-femme-au-chapeau-gris",
            is_saved: false,
            meta: {
              description:
                "From Black Book Gallery, KAWS, Brown Companion 2016 Open Edition (2016), Plastic/Resin, 11 × 5 × 3 in",
            },
          },
        },
      ],
    },
  },
}
