import { Props as ImageSetPreviewProps } from "../imageset_preview"

export const Images = [
  {
    type: "artwork",
    id: "589a6291275b2410d1beb6a5",
    slug: "fernando-botero-nude-on-the-beach",
    date: "2000",
    title: "Nude on the Beach",
    image: "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
    partner: {
      name: "Gary Nader",
      slug: "gary-nader",
    },
    artists: [
      {
        name: "Fernando Botero",
        slug: "fernando-botero",
      },
    ],
    artist: {
      name: "Fernando Botero",
      slug: "fernando-botero",
    },
    width: 1152,
    height: 826,
  },
  {
    url: "https://artsy-media-uploads.s3.amazonaws.com/co8j2xq40ROMyBrJQm_4eQ%2FDafenOilPaintingVillage_AK03.jpg",
    type: "image",
    width: 900,
    height: 1200,
    caption: "<p>Photo by Adam Kuehl for Artsy.</p>",
  },
  {
    url: "https://d32dm0rphc51dk.cloudfront.net/CpHY-DRr7KW0HGXLslCXHw/larger.jpg",
    type: "image",
    width: 816,
    height: 1024,
    caption: "<p>Photo by Adam Kuehl for Artsy. Image courtesy of the Guggenheim Museum.</p>",
  },
]

export const Artworks = [
  {
    type: "artwork",
    id: "589a6291275b2410d1beb6a5",
    slug: "fernando-botero-nude-on-the-beach",
    date: "2000",
    title: "Nude on the Beach",
    image: "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
    partner: {
      name: "Gary Nader",
    },
    artist: {
      name: "Fernando Botero",
    },
    width: 1152,
    height: 826,
  },
  {
    type: "artwork",
    id: "589a6291275b2410d1beb6a5",
    slug: "fernando-botero-nude-on-the-beach",
    date: "2000",
    title: "Nude on the Beach",
    image: "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
    partner: {
      name: "Gary Nader",
      slug: "gary-nader",
    },
    artists: [
      {
        name: "Fernando Botero",
        slug: "fernando-botero",
      },
      {
        name: "Frida Kahlo",
        slug: "frida-kahlo",
      },
    ],
    width: 1152,
    height: 826,
  },
]

export const ImageSetFull: ImageSetPreviewProps["section"] = {
  type: "image_set",
  layout: "full",
  title: "The Work of Bruce M. Sherman",
  images: Images,
}

export const ImageSetMini: ImageSetPreviewProps["section"] = {
  type: "image_set",
  title: "The Work of Bruce M. Sherman",
  images: Images,
}

export const ImageSetFullSansTitle: ImageSetPreviewProps["section"] = {
  type: "image_set",
  layout: "full",
  images: Images,
}

export const ImageSetMiniSansTitle: ImageSetPreviewProps["section"] = {
  type: "image_set",
  images: Images,
}

export const HeroSections = [
  {
    type: "text",
    url: "https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg",
    subheader: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "split",
    url: "https://artsy-media-uploads.s3.amazonaws.com/ZR0wtJhg5Nez7Vm8uCP8Nw%2FDSC_0720-Edit-2.jpg",
    subheader: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "fullscreen",
    url: "https://artsy-media-uploads.s3.amazonaws.com/ZR0wtJhg5Nez7Vm8uCP8Nw%2FDSC_0720-Edit-2.jpg",
    subheader: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "split",
    url: "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
    subheader: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "fullscreen",
    url: "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
    subheader: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "text",
    url: "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
    subheader: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
]

export const Articles = [
  {
    title: "New York's Next Art District",
    contributing_authors: [
      {
        name: "Molly Gottschalk",
        id: "12345",
      },
    ],
    published_at: "2017-05-19T13:09:18.567Z",
    layout: "classic",
    vertical: null,
  },
  {
    title: "New York's Next Art District",
    contributing_authors: [
      {
        name: "Molly Gottschalk",
        id: "12345",
      },
    ],
    published_at: "2017-05-19T13:09:18.567Z",
    layout: "standard",
    vertical: {
      name: "Art Market",
      id: "12345",
    },
  },
  {
    title: "New York's Next Art District",
    contributing_authors: [
      {
        name: "Molly Gottschalk",
        id: "12345",
      },
    ],
    published_at: "2017-05-19T13:09:18.567Z",
    layout: "feature",
    vertical: {
      name: "Art Market",
      id: "12345",
    },
  },
]

export const Authors = [
  {
    image_url: "https://artsy-media-uploads.s3.amazonaws.com/9vcX6FR21rKHatmvJ8K0sg%2FAbigail.jpg",
    name: "Abigail Cain",
    bio: "Abigail Cain is an Art Market Editor at Artsy",
    twitter_handle: "abigailcain",
  },
]
