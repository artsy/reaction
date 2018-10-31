export const RelatedArtistsFixture = {
  mainArtists: {
    id: "andy-warhol",
    related: {
      artists: {
        pageInfo: {
          hasNextPage: true,
          endCursor: "YXJyYXljb25uZWN0aW9uOjE1",
        },
        pageCursors: {
          around: [
            { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
            { cursor: "YXJyYXljb25uZWN0aW9uOjE1", page: 2, isCurrent: false },
          ],
          first: null,
          last: null,
          previous: null,
        },
        edges: [
          {
            node: {
              name: "Robert Indiana",
              id: "robert-indiana",
              href: "/artist/robert-indiana",
              image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=400&height=300&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FxPV7zLtiKJPPxRVJTEtHIA%2Flarge.jpg",
                },
              },
              formatted_nationality_and_birthday: "American, 1928–2018",
              __id: "QXJ0aXN0OnJvYmVydC1pbmRpYW5h",
              is_followed: false,
              counts: { follows: 13490 },
            },
          },
          {
            node: {
              name: "Tom Wesselmann",
              id: "tom-wesselmann",
              href: "/artist/tom-wesselmann",
              image: {
                cropped: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=400&height=300&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F8smV519M1L352CTihrfW7A%2Flarge.jpg",
                },
              },
              formatted_nationality_and_birthday: "American, 1931–2004",
              __id: "QXJ0aXN0OnRvbS13ZXNzZWxtYW5u",
              is_followed: false,
              counts: { follows: 35502 },
            },
          },
        ],
      },
    },
    __id: "QXJ0aXN0OmFuZHktd2FyaG9s",
  },
}
