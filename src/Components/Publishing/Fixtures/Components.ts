import { Props as ImageSetPreviewProps } from "../Sections/ImageSetPreview"

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
  {
    type: "artwork",
    id: "589a6291275b2410d1beb6a5",
    slug: "fernando-botero-nude-on-the-beach",
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
]

export const Authors = [
  {
    image_url: "https://artsy-media-uploads.s3.amazonaws.com/9vcX6FR21rKHatmvJ8K0sg%2FAbigail.jpg",
    name: "Abigail Cain",
    bio: "[Abigail Cain](https://artsy.net/abigail) is an Art Market Editor at Artsy",
    twitter_handle: "abigailcain",
  },
  {
    image_url: "http://files.artsy.net/images/molly_01.jpg",
    name: "Molly Gottschalk",
    bio:
      "[Molly Gottschalk](https://artsy.net/molly) is a Features Producer at Artsy. She is a photographer and lover of cats.",
    twitter_handle: "mollygottschalk",
  },
  {
    name: "Halley Johnson",
    bio: "[Halley Johnson](https://artsy.net/molly) is an Writer Guru at Artsy. She enjoys speaking Georgian.",
    twitter_handle: "halleyjohnson",
  },
  {
    name: "Kana Abe",
    bio: "",
    twitter_handle: "",
  },
]

export const Campaign = {
  name: "Artsy",
}

export const UnitCanvasOverlay = {
  layout: "overlay",
  headline: "Sample copy sed posuere consectetur est at lobortis. Nullam id dolor ultricies vehicula.",
  body: "",
  link: {
    text: "Link Example",
    url: "http://artsy.net",
  },
  assets: [
    { url: "https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg" },
  ],
  logo: "http://files.artsy.net/images/artsy_logo_full_whiteweb_transparent.png",
  disclaimer:
    "Donec id elit non mi porta gravida at eget metus. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
}

export const UnitCanvasImage = {
  layout: "standard",
  headline: "Commodo Risus Pharetra Fermentum Vehicula Adipiscing",
  body: "",
  link: {
    text: "Link Example",
    url: "http://artsy.net",
  },
  assets: [
    { url: "https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg" },
  ],
  logo: "http://files.artsy.net/images/artsy-logo-wide-black.png",
  disclaimer:
    "Donec id elit non mi porta gravida at eget metus. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
}

export const UnitCanvasVideo = {
  layout: "standard",
  headline: "Commodo Risus Pharetra Fermentum Vehicula Adipiscing",
  body: "",
  link: {
    text: "Link Example",
    url: "http://artsy.net",
  },
  assets: [{ url: "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4" }],
  cover_image_url: "https://artsy-media-uploads.s3.amazonaws.com/XkEYc3dH8HiRVKCIogWfUw%2FBombay+Display+Thumbnail.PNG",
  logo: "http://files.artsy.net/images/artsy-logo-wide-black.png",
  disclaimer:
    "Donec id elit non mi porta gravida at eget metus. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
}

export const UnitCanvasSlideshow = {
  layout: "slideshow",
  headline: "Sample copy sed posuere consectetur est at lobortis. Nullam id dolor ultricies vehicula.",
  body: "",
  link: {
    text: "Link Example",
    url: "http://artsy.net",
  },
  assets: [
    {
      url: "https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg",
      caption: "Nullam id dolor ultricies vehicula.",
    },
    { url: "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg" },
    {
      url: "https://artsy-media-uploads.s3.amazonaws.com/co8j2xq40ROMyBrJQm_4eQ%2FDafenOilPaintingVillage_AK03.jpg",
      caption: "Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
    },
    {
      url:
        "https://artsy-media-uploads.s3.amazonaws.com/tjVXiaCPt3Tv1EYS3JqX5g%2FFogoIsland_BridgeStudio_4985_photo_Alex_Fradkin.jpg",
    },
  ],
  logo: "http://files.artsy.net/images/artsy-logo-wide-black.png",
  disclaimer:
    "Donec id elit non mi porta gravida at eget metus. Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
}

export const UnitPanel = {
  headline: "Euismod Inceptos Quam",
  body:
    "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. <a href='http://artsy.net/articles'>Example Link</a>",
  assets: [
    { url: "https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg" },
  ],
  logo: "https://artsy-vanity-files-production.s3.amazonaws.com/images/artsy_logo_square_white_transparent.png",
  link: {
    text: "",
    url: "http://artsy.net",
  },
}

export const UnitPanelVideo = {
  headline: "Euismod Inceptos Quam",
  body:
    "Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. <a href='http://artsy.net/articles'>Example Link</a>",
  assets: [
    { url: 'https://artsy-media-uploads.s3.amazonaws.com/lHEsRROMLasYi9yZtgTR7A%2Fbombay_artsy_panel_640_28_480.mp4' }
  ],
  cover_image_url: "https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg",
  logo: "https://artsy-vanity-files-production.s3.amazonaws.com/images/artsy_logo_square_white_transparent.png",
  link: {
    text: "",
    url: "http://artsy.net",
  },
}

export const Display = mediaType => ({
  ...Campaign,
  canvas: (() => {
    switch (mediaType) {
      case "overlay":
        return UnitCanvasOverlay
      case "image":
        return UnitCanvasImage
      case "slideshow":
        return UnitCanvasSlideshow
      case "video":
        return UnitCanvasVideo
      default:
        return UnitCanvasImage
    }
  })(),
  panel: UnitPanel,
})

export const Embeds = [
  {
    mobile_height: 1300,
    height: 1000,
    url: "https://artsy-vanity-files-production.s3.amazonaws.com/documents/1parrasch.html",
    layout: "overflow",
    type: "embed",
  },
]

export const HeroSections = [
  {
    type: "text",
    url: "https://artsy-media-uploads.s3.amazonaws.com/YqTtwB7AWqKD95NGItwjJg%2FRachel_Rossin_portrait_2.jpg",
    deck: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "split",
    url: "https://artsy-media-uploads.s3.amazonaws.com/ZR0wtJhg5Nez7Vm8uCP8Nw%2FDSC_0720-Edit-2.jpg",
    deck: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "fullscreen",
    url: "https://artsy-media-uploads.s3.amazonaws.com/ZR0wtJhg5Nez7Vm8uCP8Nw%2FDSC_0720-Edit-2.jpg",
    deck: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
  {
    type: "split",
    url: "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
  },
  {
    type: "fullscreen",
    url: "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
  },
  {
    type: "text",
    url: "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
  },
  {
    type: "basic",
    url: "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
    deck: "Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.",
  },
]

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
    setTitle: "New York City",
  },
  {
    url: "https://d32dm0rphc51dk.cloudfront.net/CpHY-DRr7KW0HGXLslCXHw/larger.jpg",
    type: "image",
    width: 816,
    height: 1024,
    caption: "<p>Photo by <a href='artsy.net'>Adam Kuehl</a> for Artsy. Image courtesy of the Guggenheim Museum.</p>",
    setTitle: "New York City",
  },
]

export const ImagesNarrow = [
  {
    url: "https://artsy-media-uploads.s3.amazonaws.com/fUb8nBvTw5TZ3ZbU6WYbQQ%2Fsequence4c+copy.jpg",
    type: "image",
    width: 254,
    height: 1200,
    caption:
      "<p>Louise Bourgeois, <em>The Sky’s the Limit</em>, 1989–2003. The Museum of Modern Art, New York. © 2017 The Easton Foundation/Licensed by VAGA, NY. Courtesy of the Museum of Modern Art.</p>",
  },
  {
    url: "https://artsy-media-uploads.s3.amazonaws.com/z2c9GQ8P69QjfW6SPXRK1Q%2Fskyscraper+copy.jpg",
    type: "image",
    width: 268,
    height: 1200,
    caption:
      "<p>Louise Bourgeois, <em>The Sky’s the Limit</em>, 1989–2003. The Museum of Modern Art, New York. © 2017 The Easton Foundation/Licensed by VAGA, NY. Courtesy of the Museum of Modern Art.</p>",
  },
  {
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/3AW6ZGyyGscbswkyTqUQAw%2FScreen+Shot+2017-09-22+at+5.17.50+PM.png",
    type: "image",
    width: 598,
    height: 596,
    caption:
      "<p>Installation view of Louise Bourgeois, <em>Portrait of Jean-Louis</em>, 1947-49, at the Museum of Modern Art, New York. Photo by @radicchioradicchio, via Instagram.</p>",
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

export const Media = [
  {
    url: "https://artsy-vanity-files-production.s3.amazonaws.com/videos/scenic_mono_3.mp4",
    duration: 10948,
    release_date: "2017-08-28T20:38:05.709Z",
    published: true,
    cover_image_url: "https://artsy-vanity-files-production.s3.amazonaws.com/images/galerie-ceysson-benetiere_abmb.jpg",
    description: "<p>Integer posuere erat a ante venenatis <a href='artsy.net'>dapibus posuere velit</a> aliquet. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.</p><p>Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.</p>",
    credits: "<p><b>Director</b></p><p>Marina Cashdan</p><p><b>Featuring</b></p><p>Trevor Paglan</p>"
  }
]

export const RelatedPanel = [
  {
    thumbnail_title: "The 15 Top Art Schools in the United States",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/4Tq-iYkN8dOpshFoKRXyYw%2Fcustom-Custom_Size___PoetterHall_Exterior+copy.jpg",
    slug: "artsy-editorial-15-top-art-schools-united-states",
  },
  {
    thumbnail_title: "Four Years after Walter De Maria’s Death, His Final Work Is Complete",
    thumbnail_image: "https://artsy-media-uploads.s3.amazonaws.com/6IqxBTQCkExip2auQ7ZWCA%2FDEMAR-2011.0006-B.jpg",
    slug: "artsy-editorial-four-years-walter-de-marias-death-final-work-complete",
  },
  {
    thumbnail_title: "French Art History in a Nutshell",
    thumbnail_image: "https://artsy-media-uploads.s3.amazonaws.com/lEcCm2XbfZ7bPAVgLlM21w%2Flarger-21.jpg",
    slug: "artsy-editorial-french-art-history-in-a-nutshell",
  },
]

export const RelatedCanvas = [
  {
    thumbnail_title: "The 15 Top Art Schools in the United States",
    thumbnail_image:
      "https://artsy-media-uploads.s3.amazonaws.com/4Tq-iYkN8dOpshFoKRXyYw%2Fcustom-Custom_Size___PoetterHall_Exterior+copy.jpg",
    slug: "artsy-editorial-15-top-art-schools-united-states",
    authors: [{ name: "Anna Louis-Sussman" }, { name: "Kana Abe" }],
    // Deprecated
    contributing_authors: [{ name: "Casey Lesser" }],
    published_at: "2017-05-19T13:09:18.567Z",
  },
  {
    thumbnail_title: "Four Years after Walter De Maria’s Death, His Final Work Is Complete",
    thumbnail_image: "https://artsy-media-uploads.s3.amazonaws.com/6IqxBTQCkExip2auQ7ZWCA%2FDEMAR-2011.0006-B.jpg",
    slug: "artsy-editorial-four-years-walter-de-marias-death-final-work-complete",
    authors: [{ name: "Halley Johnson" }],
    // Deprecated
    contributing_authors: [{ name: "Casey Lesser" }],
    published_at: "2017-05-19T13:09:18.567Z",
  },
  {
    thumbnail_title: "French Art History in a Nutshell",
    thumbnail_image: "https://artsy-media-uploads.s3.amazonaws.com/lEcCm2XbfZ7bPAVgLlM21w%2Flarger-21.jpg",
    slug: "artsy-editorial-french-art-history-in-a-nutshell",
    authors: [{ name: "Casey Lesser" }],
    // Deprecated
    contributing_authors: [{ name: "Casey Lesser" }],
    published_at: "2017-05-19T13:09:18.567Z",
  },
  {
    thumbnail_title: "Miami Artists and Museums Brace for Hurricane Irma",
    thumbnail_image: "https://artsy-media-uploads.s3.amazonaws.com/jAu4NaKnr_m53OnnMaDe_w%2Fmag.jpg",
    slug: "artsy-editorial-miami-artists-museums-brace-hurricane-irma",
    authors: [{ name: "Owen Dodd" }],
    published_at: "2017-05-19T13:09:18.567Z",
  },
]

export const Sponsor = {
  sponsor: {
    partner_condensed_logo: 'https://artsy-media-uploads.s3.amazonaws.com/GEu3iYW6CQhbVxsjpOYwZQ%2FGKL_Wort-Bildmarke_negative_rgb+2.png',
    partner_light_logo: 'https://artsy-media-uploads.s3.amazonaws.com/GEu3iYW6CQhbVxsjpOYwZQ%2FGKL_Wort-Bildmarke_negative_rgb+2.png',
    partner_dark_logo: 'https://artsy-media-uploads.s3.amazonaws.com/AjncVmjZHFM4Z-0b6nPz8A%2FGUCCI.png',
    partner_logo_link: 'http://artsy.net'
  }
}

export const Videos = [
  {
    url: "https://www.youtube.com/watch?v=PXi7Kjlsz9A",
    caption: "<p>What motivates patrons to fund artists’ wildest dreams?</p>",
    cover_image_url: "https://artsy-media-uploads.s3.amazonaws.com/IB6epb5L_l0rm9btaDsY7Q%2F14183_MDP_Evening_240.jpg",
  },
  {
    url: "https://vimeo.com/191988155",
    caption:
      "<p>2016 was a memorable year for the world, and art along with it. Powered by data culled from Artsy as well as UBS’s Planet Art app, “The Year in Art 2016” will explore how the creative community responded to the cultural shifts and tribulations this year has seen—from the destruction of Palmyra to the proliferation of Virtual Reality to the U.S. election.</p>",
    cover_image_url: "https://artsy-media-uploads.s3.amazonaws.com/ditbyaUgdcl6mHin07TfKA%2FMassimilianoGioni_0581.jpg",
  },
  {
    url: "https://vimeo.com/191988155",
  },
]

const textElements = [
  // classic elements
  [
    "<p>Rines is a part of a recent migration that has galleries gravitating to the <a href='https://www.artsy.net/'>Lower East Side and Chinatown</a>. The new gallery sits on a stretch of Henry Street that also includes Chapter NY, Cuevas Tilleard, and newcomer Shrine, and is just blocks from:</p>",
    "<ul><li>Chinatown stalwart Reena Spaulings Fine Art</li><li>The shiny new <span style='text-decoration: line-through;'>Foxy Production</span></li><li>Freshly launched programs like Erin Goldberger’s New Release</li><li>Angelo Lanza’s gallery Jeffrey Stark in the basement of the East Broadway Mall</li></ul>",
    "<p>And <em>not a stone’s throw away</em> are the southern bounds of the Lower East Side, where <strong>hundreds</strong> of more galleries gather.</p>",
    "<blockquote>Hardly a week goes by without murmurings that yet another gallery is opening</blockquote>",
    "<h3><strong>Galleries Section, Booth 10221</strong></h3><h2>neugerriemschneider</h2>",
    "<h3><em>With works by</em> Franz Ackermann, Ai Weiwei, Pawel Althamer, Billy Childish, Keith Edmier, Olafur Eliasson, Andreas Eriksson, Noa Eshkol, Mario García Torres, Renata Lucas, Michel Majerus, Mike Nelson, Jorge Pardo, Elizabeth Peyton, Tobias Rehberger, Thaddeus Strode, Rirkrit Tiravanija, Pae White</h3>",
  ],
  // feature elements
  [
    "<h1>Standard Header</h1>",
    "<p><span class='content-start'>R</span>ines is a part of a recent migration that has galleries gravitating to the Lower East Side and Chinatown. She opened 56 Henry in December 2015, just four months after being forced to shutter her previous microgallery 55 Gansevoort—an elevator shaft a block east of the Whitney—after Restoration Hardware bought its building. The new gallery sits on a stretch of Henry Street that also includes Chapter NY, Cuevas Tilleard, and newcomer Shrine, and is just blocks from:</p>",
  ],
  // classic close
  [
    "<p>The resultant work allows Salley the chance to recount her experiences of the aftermath of her scandal in her own words. In the film, Fujiwara and Salley are shown meeting professionals from public relations, advertising, and fashion companies as they seek to construct a new public image for her. Alongside the film, light boxes display fashion photographer Andreas Larsson’s pictures of Salley, which were taken as part of the project to rebuild her profile. While the show tackles public identity, female iconography, and Salley’s voice as an artist, the pair’s close working relationship—one in which the conventional power relationship has been overturned—no doubt aided their collaboration.</p>",
    "<ol><li>Chinatown stalwart Reena Spaulings Fine Art</li><li>The shiny new Foxy Production</li><li>Freshly launched programs like Erin Goldberger’s New Release</li><li>Angelo Lanza’s gallery Jeffrey Stark in the basement of the East Broadway Mall</li></ol>",
    "<p>Rines is a part of a recent migration that has galleries gravitating to the Lower East Side and Chinatown. She opened 56 Henry in December 2015, just four months after being forced to shutter her previous microgallery 55 Gansevoort—an elevator shaft a block east of the Whitney—after Restoration Hardware bought its building.</p>",
    "<h2><a href='https://www.artsy.net/artist/ej-hill' class='is-follow-link' name='EJ_Hill'>EJ Hill</a><a data-id='ej-hill' class='entity-follow artist-follow'></a></h2>",
    "<p><a href='https://www.artsy.net/artist/ej-hill' class='is-follow-link' name='EJ_Hill'>EJ Hill</a><a data-id='ej-hill' class='entity-follow artist-follow'></a></p>",
  ],
  // standard & feature close
  [
    "<p>Rines is a part of a recent migration that has galleries gravitating to the Lower East Side and Chinatown. She opened 56 Henry in December 2015, just four months after being forced to shutter her previous microgallery 55 Gansevoort—an elevator shaft a block east of the Whitney—after Restoration Hardware bought its building.<span class='content-end'></span></p>",
  ],
]

const classicText = textElements[0].concat(textElements[2])
const standardText = classicText.concat(textElements[3])
const featureText = textElements[1].concat(standardText)

export const SectionText = {
  classic: classicText.join(""),
  feature: featureText.join(""),
  standard: standardText.join(""),
}
