export const ArtwrorkNoBannerFixture = {
  id: "richard-anuszkiewicz-lino-yellow-318",
  artworkContextAuction: null,
  artworkContextFair: null,
  artworkContextPartnerShow: null,
  partner: {
    type: "Auction House",
    name: "Doyle",
    initials: "D",
    profile: null,
  },
}
export const ArtworkAuctionBannerFixture = {
  id: "richard-anuszkiewicz-lino-yellow-318",
  artworkContextAuction: {
    __typename: "ArtworkContextAuction",
    name: "Doyle: Post-War & Contemporary Art",
    href: "/auction/doyle-post-war-and-contemporary-art-2",
    is_auction: true,
    is_closed: false,
    is_open: true,
    live_start_at: "2018-11-07T19:00:00+00:00",
    live_url_if_open: null,
  },
  artworkContextFair: { __typename: "ArtworkContextAuction" },
  artworkContextPartnerShow: { __typename: "ArtworkContextAuction" },
  partner: {
    type: "Auction House",
    name: "Doyle",
    initials: "D",
    profile: null,
  },
}
export const ArtworkFairBannerFixture = {
  id: "raqib-shaw-the-garden-of-earthly-delights-xiv",
  artworkContextAuction: { __typename: "ArtworkContextFair" },
  artworkContextFair: {
    __typename: "ArtworkContextFair",
    name: "West Bund Art & Design 2018",
    href: "/west-bund-art-and-design-2018",
    is_active: true,
    start_at: "2018-11-08T02:00:00+00:00",
    end_at: "2018-11-11T08:00:00+00:00",
    profile: {
      initials: "WBA",
      icon: {
        img: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fr8ATQCRifOr_5eAh8lPoAg%2Fsquare140.png",
        },
      },
    },
  },
  artworkContextPartnerShow: { __typename: "ArtworkContextFair" },
  partner: {
    type: "Gallery",
    name: "White Cube",
    initials: "WC",
    profile: {
      icon: {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/wayPSO-tWo5yvs0Lu864GA/square140.png",
      },
    },
  },
}
export const ArtworkUpcomingShowBannerFixture = {
  id: "claudia-giraudo-affinita-verde-amarillo",
  artworkContextAuction: { __typename: "ArtworkContextPartnerShow" },
  artworkContextFair: { __typename: "ArtworkContextPartnerShow" },
  artworkContextPartnerShow: {
    __typename: "ArtworkContextPartnerShow",
    name: "Claudia Giraudo | The age of innocence",
    href: "/show/galleria-punto-sullarte-claudia-giraudo-the-age-of-innocence",
    type: "Show",
    status: "upcoming",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FbBv1DcVHmabkA2K3B7EO2A%2Fsquare.jpg",
      },
    },
  },
  partner: {
    type: "Gallery",
    name: "Galleria Punto Sull'Arte",
    initials: "GPS",
    profile: {
      icon: {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/5M6lXKjC3NIG5KM-x1SplA/square140.png",
      },
    },
  },
}
export const ArtworkCurrentShowBannerFixture = {
  id: "marcel-barbeau-diamants-larmes",
  artworkContextAuction: { __typename: "ArtworkContextPartnerShow" },
  artworkContextFair: { __typename: "ArtworkContextPartnerShow" },
  artworkContextPartnerShow: {
    __typename: "ArtworkContextPartnerShow",
    name: "Marcel Barbeau : Jours d’envol",
    href: "/show/galerie-deste-marcel-barbeau-jours-denvol",
    type: "Show",
    status: "running",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fal6PoLl3HsQFbXNyxeOtdA%2Fsquare.jpg",
      },
    },
  },
  partner: {
    type: "Gallery",
    name: "Galerie D'Este",
    initials: "GDE",
    profile: {
      icon: {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/9KdRZamUZCROfC6j_xpk_A/square140.png",
      },
    },
  },
}
export const ArtworkPastShowBannerFixture = {
  id:
    "julio-le-parc-la-longue-marche-etape-n-degrees-6-the-long-march-step-n-degrees-6",
  artworkContextAuction: { __typename: "ArtworkContextPartnerShow" },
  artworkContextFair: { __typename: "ArtworkContextPartnerShow" },
  artworkContextPartnerShow: {
    __typename: "ArtworkContextPartnerShow",
    name: "Julio Le Parc: Form into Action",
    href: "/show/perez-art-museum-miami-pamm-julio-le-parc-form-into-action",
    type: "Show",
    status: "closed",
    thumbnail: {
      img: {
        url:
          "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=70&height=70&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCsea_INcKjXkmLNqwJbvKQ%2Fsquare.jpg",
      },
    },
  },
  partner: {
    type: "Institution",
    name: "Pérez Art Museum Miami (PAMM)",
    initials: "PAM",
    profile: {
      icon: {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/h4j--cdqWuEdmbJ96B0lPw/square140.png",
      },
    },
  },
}
