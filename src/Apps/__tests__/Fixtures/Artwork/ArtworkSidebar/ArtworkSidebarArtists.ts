export const SingleFollowedArtist = {
  artists: [
    {
      __id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      _id: "artist_id",
      id: "josef-albers",
      name: "Josef Albers",
      href: "/artist/josef-albers",
      is_followed: false,
      counts: { follows: 9346 },
      related: null,
    },
  ],
  cultural_maker: null,
}

export const SingleNonFollowedArtist = {
  artists: [
    {
      _id: "artist_id",
      __id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      id: "josef-albers",
      name: "Josef Albers",
      href: "/artist/josef-albers",
      is_followed: false,
      counts: { follows: 9346 },
      related: null,
    },
  ],
  cultural_maker: null,
}

export const MultipleArtists = {
  artists: [
    {
      __id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      _id: "artist_0_id",
      id: "josef-albers",
      name: "Josef Albers",
      href: "/artist/josef-albers",
      is_followed: false,
      counts: { follows: 9346 },
      related: null,
    },
    {
      __id: "QXJ0aXN0OmVkLXJ1c2NoYQ==",
      _id: "artist_1_id",
      id: "ed-ruscha",
      name: "Ed Ruscha",
      href: "/artist/ed-ruscha",
      is_followed: false,
      counts: { follows: 15431 },
      related: null,
    },
  ],
  cultural_maker: null,
}

export const CulturalMakerWork = {
  artists: [],
  cultural_maker: "American 18th Century",
}
