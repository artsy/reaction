export const showsConnection = {
  pageInfo: { hasNextPage: true, endCursor: "YXJyYXljb25uZWN0aW9uOjM=" },
  pageCursors: {
    around: [
      { cursor: "YXJyYXljb25uZWN0aW9uOi0x", page: 1, isCurrent: true },
      { cursor: "YXJyYXljb25uZWN0aW9uOjM=", page: 2, isCurrent: false },
      { cursor: "YXJyYXljb25uZWN0aW9uOjc=", page: 3, isCurrent: false },
    ],
    first: null,
    last: null,
    previous: null,
  },
  edges: [
    {
      node: {
        partner: {
          __typename: "Partner",
          name: "BAILLY GALLERY",
          __id: "UGFydG5lcjpiYWlsbHktZ2FsbGVyeQ==",
        },
        name: "It's only about Ceramics",
        href: "/show/bailly-gallery-its-only-about-ceramics",
        exhibition_period: "Jul 12 – Sep 26",
        cover_image: {
          cropped: {
            url:
              "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FS5BiknN-9kth6gVh-GZqvg%2Flarge.jpg",
          },
        },
        city: null,
        __id: "U2hvdzpiYWlsbHktZ2FsbGVyeS1pdHMtb25seS1hYm91dC1jZXJhbWljcw==",
      },
    },
    {
      node: {
        partner: {
          __typename: "Partner",
          name: "Maddox Gallery",
          __id: "UGFydG5lcjptYWRkb3gtZ2FsbGVyeQ==",
        },
        name: "Summer Contemporary - Gstaad, Switzerland",
        href: "/show/maddox-gallery-summer-contemporary-gstaad-switzerland",
        exhibition_period: "Jul 24 – Sep 28",
        cover_image: {
          cropped: {
            url:
              "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FfpBvbkttNdtzFcMTOt5M9w%2Flarge.jpg",
          },
        },
        city: "Gstaad",
        __id:
          "U2hvdzptYWRkb3gtZ2FsbGVyeS1zdW1tZXItY29udGVtcG9yYXJ5LWdzdGFhZC1zd2l0emVybGFuZA==",
      },
    },
    {
      node: {
        partner: {
          __typename: "Partner",
          name: "RoGallery",
          __id: "UGFydG5lcjpyb2dhbGxlcnk=",
        },
        name: "Two Days of September Auctions",
        href: "/show/rogallery-two-days-of-september-auctions",
        exhibition_period: "Sep 12 – 28",
        cover_image: {
          cropped: {
            url:
              "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FE3x76onJE6unH3U4qJlv4A%2Flarge.jpg",
          },
        },
        city: "Long Island City",
        __id: "U2hvdzpyb2dhbGxlcnktdHdvLWRheXMtb2Ytc2VwdGVtYmVyLWF1Y3Rpb25z",
      },
    },
    {
      node: {
        partner: {
          __typename: "Partner",
          name: "Martin Lawrence Galleries",
          __id: "UGFydG5lcjptYXJ0aW4tbGF3cmVuY2UtZ2FsbGVyaWVz",
        },
        name: "FALL AUCTION",
        href: "/show/martin-lawrence-galleries-fall-auction",
        exhibition_period: "Aug 1 – Sep 29",
        cover_image: {
          cropped: {
            url:
              "https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&width=800&height=600&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F9QJyyDHIe26vgEn6JAqzhg%2Flarge.jpg",
          },
        },
        city: null,
        __id: "U2hvdzptYXJ0aW4tbGF3cmVuY2UtZ2FsbGVyaWVzLWZhbGwtYXVjdGlvbg==",
      },
    },
  ],
}

export const ShowsFixture = {
  viewer: {
    artist_currentShows: {
      id: "pablo-picasso",
      showsConnection,
      __id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
    },
    artist_upcomingShows: {
      id: "pablo-picasso",
      showsConnection,
      __id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
    },
    artist_pastShows: {
      id: "pablo-picasso",
      showsConnection,
      __id: "QXJ0aXN0OnBhYmxvLXBpY2Fzc28=",
    },
  },
}
