import { cloneDeep, extend } from "lodash"
import { ArticleData } from "../Typings"
import {
  ClassicText,
  FeatureText,
  Media,
  SocialEmbedInstagram,
  SocialEmbedTwitter,
  Sponsor,
  StandardText,
} from "./Components"

export const ClassicArticle: ArticleData = {
  _id: "597b9f652d35b80017a2a6a7",
  author_id: "4f85e1b55ca0370001000072",
  partner_channel_id: "52d99185cd530e581300006c",
  partner_ids: ["52d99185cd530e581300006c"],
  author: {
    id: "4f85e1b55ca0370001000072",
    name: "Joanne Artman Gallery",
  },
  authors: [],
  layout: "classic",
  hero_section: null,
  thumbnail_title:
    "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple",
  email_metadata: {
    image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/wHFgQlrTrHav5O6bQRJ0dg%2FUntitled+Suspended_30x67x33+%282%29_sm+cropped.jpg",
    author: "Joanne Artman Gallery",
    headline:
      "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple",
  },
  send_body: false,
  tier: 2,
  tags: [],
  tracking_tags: [],
  published: true,
  fair_ids: [],
  fair_programming_ids: [],
  fair_artsy_ids: [],
  fair_about_ids: [],
  auction_ids: [],
  section_ids: [],
  featured: false,
  exclude_google_news: false,
  indexable: true,
  contributing_authors: [],
  is_super_article: false,
  channel_id: null,
  daily_email: false,
  weekly_email: false,
  keywords: ["Joanne Artman Gallery"],
  updated_at: "2017-07-28T20:38:05.709Z",
  title:
    "New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple",
  lead_paragraph:
    "<p>Critics were skeptical of Bambi when it was first released in 1942—what was the point, they wondered, of a cartoon that ignored fantasy in favor of naturalistic forest landscapes?</p>",
  id: "597b9f652d35b80017a2a6a7",
  slug: "joanne-artman-gallery-poetry-naturerefinement-form",
  scheduled_publish_at: null,
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/wHFgQlrTrHav5O6bQRJ0dg%2FUntitled+Suspended_30x67x33+%282%29_sm+cropped.jpg",
  published_at: "2017-07-28T20:38:05.709Z",
  description:
    "The elegant spiral of the Nautilus shell, the sinuous pattern of the banks of a river, or the swirling vortex street of clouds - patterns exist on ev...",
  sections: [
    {
      type: "text",
      body:
        "<p>The elegant spiral of the Nautilus shell, the sinuous pattern of the banks of a river, or the swirling vortex street of clouds - patterns exist on every level in nature. Along with fractals, chaos theory is one of the essential, universal influences on patterns in nature. In essence, the theory shows how systems of chaotic, apparent randomness have an underlying pattern, or repetition.</p><p>The work of sculptor Matt Devine echoes the natural world, as the artist creates wonderfully complex works that resonate with both chaos and order. Perhaps this is why we can’t stop looking at Devine’s <em>Brass Tax</em>. Elevated by the use of a metallic finish, the piece is a minimalist refinement of nature, form and sequence.</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "596aa2851a1e864d5eea6681",
          slug: "matt-devine-brass-tax",
          date: "",
          title: "Brass Tax",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/lSBz0tsfvOAm2qKdWwgxLw/larger.jpg",
          partner: {
            name: "Joanne Artman Gallery",
            slug: "joanne-artman-gallery",
          },
          artists: [
            {
              name: "Matt Devine",
              slug: "matt-devine",
            },
          ],
          artist: {
            name: "Matt Devine",
            slug: "matt-devine",
          },
          width: 1500,
          height: 2000,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>Long before chaos theory, scientists have hypothesized on the apparent beauty of the “irregular” in nature. In the 1841 edition of the American Repertory of Arts, Sciences and Manufactures (Volume 3), James Jay Mapes pens a deftly, eloquently written ode to the irregularities of our world, the stars, the oceans, the mountains and deserts. Mapes describes how our perceptions of beauty are built upon such irregularities - poignant breaks from any visible pattern, that are then captured and described in works of art. &nbsp;</p><p>“…the relative distances of the planets, their magnitudes, and the number of their satellites, conform to no known numerical law. The fixed stars exhibit no regular arrangement, either in their magnitudes, distances, or positions, but appear scattered at random across the sky. To descend to our own earth, no symmetry is traceable in the forms of island or continents, the courses of rivers, or the directions of mountain chains… In the “human face divine,” portrait painters affirm that the two sides never correspond; and even when the external form of an animal exhibits an appearance of bilateral or radiate symmetry, nature departs from it in her arrangement of the internal structure. In short, variety is a great and a most beautiful law of nature: it is that which distinguishes her productions from those of art, and it is that which man often exerts his highest efforts…to imitate.”</p><p>In a recent text, <em>Aesthetics of Ugliness: A Critical Edition</em> by Karl Rosenkranz, the author stipulates, that although “free multiplicity” is indeed beautiful, “regularity tires through its stereotypical sameness, which presents to us difference always in the same manner, so that we long to get out of its uniformity and into freedom, even if <em>in extremis</em> it is a chaotic freedom.”</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "57dc83ce139b212bd7000172",
          slug: "matt-devine-untitled-suspended",
          date: "",
          title: "Untitled Suspended",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/jDXiwSBgNP2eml1YkMIitg/larger.jpg",
          partner: {
            name: "Joanne Artman Gallery",
            slug: "joanne-artman-gallery",
          },
          artists: [
            {
              name: "Matt Devine",
              slug: "matt-devine",
            },
          ],
          artist: {
            name: "Matt Devine",
            slug: "matt-devine",
          },
          width: 3134,
          height: 2062,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>In both<em>Brass Tax</em>as well as<em>Untitled Suspended</em>, the words of Mapes and Rosenkranz can be seen to find their home, both pieces exhibiting a poetic, chaotic freedom, their beauty centered in their adherence to no prescriptive, formal pattern. The works seem entirely organic despite their true nature.</p>",
    },
    {
      type: "text",
      body: "Hello World",
    },
  ],
}

export const ClassicArticleManyAuthors = extend({}, ClassicArticle, {
  contributing_authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "First Author",
    },
    {
      id: "523783258b3b815f7100055a",
      name: "Second Author",
    },
    {
      id: "523783258b3b815f7100055a",
      name: "Third Author",
    },
  ],
})

export const StandardArticle: ArticleData = {
  id: "594a7e2254c37f00177c0ea9",
  title: "New York's Next Art District",
  slug: "new-yorks-next-art-district",
  contributing_authors: [
    // deprecated
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
    },
  ],
  authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
      bio:
        "[Casey Lesser](http://artsy.net) is a well-known author and a long-time baker.",
      twitter_handle: "caseylesser",
    },
  ],
  published_at: "2017-05-19T13:09:18.567Z",
  thumbnail_title: "New York's Next Art District",
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
  layout: "standard",
  vertical: {
    name: "Art Market",
    id: "12345",
  },
  description:
    "Land exhibitions, make influential contacts, and gain valuable feedback about your work.",
  sections: [
    {
      type: "text",
      body:
        "<p><a href='https://www.artsy.net/artist/pablo-picasso'>What would Antoine Court</a>’s de Gébelin think of the Happy Squirrel? </p><p>De Gébelin was a Protestant minister born in the 18th century. He authored the multi-volume tome <em>Le Monde primitif</em>, which insisted that the tarot deck contained secrets of the ancient Egyptians, whose priests had distilled their occult wisdom into the cards’ illustrations, imbuing them with great mystical power. Before that point, tarot was primarily a card game—meant for fun, not prophecy.</p><p>It was a bold and somewhat absurd assertion, given that de Gébelin could not read Egyptian hieroglyphics (no one could at the time, since they weren’t deciphered until the 19th century). Despite a total lack of historical evidence to back his claim, the theory stuck: Tarot decks, once a novelty, became popular tools for divination after the publication of de Gébelin’s book.</p><p>Which brings us back to the Happy Squirrel, a relatively recent addition to the tarot’s Major Arcana, and one whose provenance is less hazy: it originated on season six of <em>The Simpsons</em>. Lisa visits a fortune teller who is unconcerned when Lisa picks Death, but gasps in horror when the next card she draws is the Happy Squirrel. (When Lisa asks if the fuzzy rodent is a bad sign, the fortune teller demurs, saying that “the cards are vague and mysterious.”) Although it began as a cartoon joke, the Happy Squirrel card has made its way into over a dozen commercially available tarot decks. </p><p>So what would de Gébelin’s reaction be? The answer depends on whether tarot is a collection of timeless, mystical wisdom—or a flexible framework that has endured by changing with the times. Although tarot imagery employs supposedly universal archetypes, new decks are constantly being invented, and old decks altered. The art of tarot cards can never fully transcend its milieu. Which begs a second question: How do the cards’ art and design relate to the social changes, technological advances, and aesthetic sensibilities of their particular eras?</p>",
    },
    {
      type: "text",
      body:
        "<h3><strong>Galleries Section, Booth 10221</strong></h3><h2>neugerriemschneider</h2><h3>With works by Franz Ackermann, Ai Weiwei, Pawel Althamer, Billy Childish, Keith Edmier, Olafur Eliasson, Andreas Eriksson, Noa Eshkol, Mario García Torres, Renata Lucas, Michel Majerus, Mike Nelson, Jorge Pardo, Elizabeth Peyton, Tobias Rehberger, Thaddeus Strode, Rirkrit Tiravanija, Pae White</h3><p>The resultant work allows Salley the chance to recount her experiences of the aftermath of her scandal in her own words. In the film, Fujiwara and Salley are shown meeting professionals from public relations, advertising, and fashion companies as they seek to construct a new public image for her. Alongside the film, light boxes display fashion photographer Andreas Larsson’s pictures of Salley, which were taken as part of the project to rebuild her profile. While the show tackles public identity, female iconography, and Salley’s voice as an artist, the pair’s close working relationship—one in which the conventional power relationship has been overturned—no doubt aided their collaboration.</p>",
    },
    {
      type: "text",
      layout: "blockquote",
      body:
        "<blockquote>The fixed stars exhibit no regular arrangement, either in their magnitudes, distances, or positions.</blockquote>",
    },
    {
      type: "text",
      body: "<h2>A Wealthy Family’s Trick-Taking Game</h2>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      title: "A World Without Capitalism",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/5ZP7vKuVPqiynVU0jpFewQ%2Funnamed.png",
          type: "image",
          width: 600,
          height: 1067,
          caption:
            "<p>John Elisle, <em>The Star</em>, from the reimagined female Tarot cards. Courtesy of the artist. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/PcvH_rh89gRGxRXgCyGGng%2Funnamed-5.png",
          type: "image",
          width: 600,
          height: 1067,
          caption:
            "<p>John Elisle, <em>The Magician</em>, from the reimagined female Tarot cards. Courtesy of the artist. </p>",
        },
        {
          type: "artwork",
          id: "596aa2851a1e864d5eea6681",
          slug: "matt-devine-brass-tax",
          date: "2000",
          title: "Brass Tax",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/lSBz0tsfvOAm2qKdWwgxLw/larger.jpg",
          partner: {
            name: "Joanne Artman Gallery",
            slug: "joanne-artman-gallery",
          },
          artists: [
            {
              name: "Matt Devine",
              slug: "matt-devine",
            },
          ],
          artist: {
            name: "Matt Devine",
            slug: "matt-devine",
          },
          width: 1500,
          height: 2000,
          credit: "Courtesy of The Metropolitan Museum of Art",
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>Despite their aura of mystery, medieval tarot cards were not used for divination, and were probably <em>not</em> created by ancient Egyptian magicians. The earliest surviving tarot decks—now preserved in various museum collections—are Italian, and were commissioned by wealthy patrons, the same way one might have hired an artist to paint a portrait or illuminated prayerbook. </p><p>The Visconti-Sforza Tarot is a collection of decks, none complete, commissioned by the Visconti and Sforza families from the workshop of Milanese court painter Bonifacio Bembo. Cards such as Death, who rides a horse and swings a giant scythe like a player in the world’s most high-stakes polo match, will seem familiar to contemporary enthusiasts. So will the Pope, who sits on a golden throne; and the Lovers, who hold hands beneath a string of heraldic flags. Rather than looking to these cards for mystic guidance, the Visconti and Sforza families would have used them to play a trick-taking card game similar to modern-day Bridge. (Although it’s unlikely—given the good condition of the decks—that they were ever handled with much frequency).</p><p>The cards each have intricately tooled gold backgrounds that glow like the luxury items that they were. Bembo is believed to have included portraits of the families in many of the cards, as well as adding the Visconti family motto here and there for good measure. Akin to the work of <a href="https://www.artsy.net/artist/fra-angelico">Fra Angelico</a> and other early-Renaissance artists, the cards are opulent but pictorially flat, although the bodies appear in naturalistic perspective and their clothing billows around them, suggesting volume and form. </p><p><br></p><h2>The 18th-Century Conver Classic</h2>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/GwIVCQftjauWBCQie9oQ-A%2FTarot_de_Marseille_major21_world.jpg",
          type: "image",
          width: 320,
          height: 620,
          caption:
            "<p>Nicolas Conver, Tarot card from Tarot de Marseille, ca. 1760. Via Wikimedia Commons. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/UaNPuL9iz-X7Xm-SNtat7Q%2FTarot_de_Marseille_clubs13_queen.jpg",
          type: "image",
          width: 320,
          height: 620,
          caption:
            "<p>Nicolas Conver, <em>Queen of Clubs</em>. Tarot card from Tarot de Marseille, ca. 1760. Via Wikimedia Commons. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/x5EcmVNBKoUJqQa8BQgqJA%2FTarot_de_Marseille_major06_lovers.jpg",
          type: "image",
          width: 320,
          height: 620,
          caption:
            "<p>Nicolas Conver, Tarot card from Tarot de Marseille, ca. 1760. Via Wikimedia Commons. </p>",
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>Produced in 1760, French engraver Nicolas Conver’s deck of delicate woodcuts, the Tarot de Marseille, is the template on which many contemporary decks are based. Like the Visconti-Sforza Tarot, the deck’s design likely originated in 15th-century Italy before traveling north to France. It’s a favorite of many tarot enthusiasts, most notably the cult film director Alejandro Jodorowsky, who <a href="http://www.nytimes.com/2011/11/13/fashion/alejandro-jodorowsky-and-his-tarot-de-marseille.html?mcubz=1">designed his own deck</a> based on the style. While the Conver deck wasn’t the first to be called the Tarot de Marseille, it’s highly prized by collectors for its delicate color palette of sky blues and minty greens. The graphic black outlines and blunt shading of the prints give the cards a simple and rough-hewn appearance, which adds to the ambience of ancient wisdom. The popularity of the tarot grew due to advances in printing technology and via the writings of 19th-century French occultists such as Éliphas Lévi and Etteilla, which popularized the use of tarot as a method of fortune-telling and assigned additional divinatory meaning to the cards.</p><p><br></p><h2>The New Mystics</h2>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://d32dm0rphc51dk.cloudfront.net/0aRUvnVgQKbQk5dj8xcCAg/larger.jpg",
          type: "image",
          width: 1152,
          height: 826,
          caption:
            "<p>Pamela Colman Smith, <em>The Empress</em>, c. 1937. Courtesy of the Beinecke Rare Book &amp; Manuscript Library at Yale University.</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>The Rider-Waite Smith deck, which debuted in 1909, remains the most recognizable and popular today. Designed by artist Pamela Colman Smith under the direction of the mystic A.E. Waite, it was the first to be mass-produced in English, and was intended for divination rather than gameplay. Smith and Waite were both active members of the Order of the Golden Dawn, a secretive organization devoted to the exploration of the paranormal and occult (allegedly Bram Stoker, Aleister Crowley, and Sir Arthur Conan Doyle were also members). </p><p>In addition to Smith’s occult bonafides, she was also an accomplished artist, championed by <a href="https://www.artsy.net/artist/alfred-stieglitz">Alfred Stieglitz</a>, who collected her work and showed it at his gallery. Smith created fully-realized illustrations of all 78 cards that made the deck a treasure-trove for cartomancers, who now had a much richer store of images to work with. (Previously, only the 22 Major Arcana cards such as the Fool, the Magician, and the Lovers had been elaborately illustrated—traditionally, the Minor Arcana cards, which are roughly analogous to the suits in a deck of modern playing cards, were not.) The Major Arcana were based on the Tarot de Marseille drawings, but rendered in an illustrative <a href="https://www.artsy.net/gene/art-nouveau">Art Nouveau</a> style rich with patterns. Even the Fool looks debonaire; he carelessly approaches the cliff, a feather in his cap and a blooming rose in his elegant fingers, wearing a floral tunic that looks straight out of <a href="https://www.artsy.net/artist/william-morris">William Morris</a>’s workshop.</p><p><br></p><h2>An Occultist’s Pure Geometry</h2>',
    },
    {
      mobile_height: 1300,
      height: 1000,
      url: "http://files.artsy.net/documents/1parrasch.html",
      layout: "overflow_fillwidth",
      type: "embed",
    },
    {
      type: "text",
      body:
        '<p>The Thoth deck, named for the Ibis-faced Egyptian god more commonly known as Horus, was painted by the artist Frieda Harris based on direction from the infamous occultist-about-town Aleister Crowley. Completed in the early 1940s, but not widely available until 1969, it features <a href="https://www.artsy.net/gene/art-deco">Art Deco</a> borders resembling the pattern of a butterfly wing. </p><p>The deck is an aesthetic departure from the Rider-Waite’s homey <a href="https://www.artsy.net/gene/arts-and-crafts-movement">Arts and Crafts</a> aesthetic. Shaped by Harris’s interest in pure geometry, the cards are reminiscent of the work of Swedish painter <a href="https://www.artsy.net/artist/hilma-af-klint">Hilma af Klint</a> (a visionary artist who shared Harris’s interest in spiritualism and the writings of Austrian philosopher Rudolf Steiner, both popular subjects of study among the middle and upper classes in the early 20th century). Harris’s shaded orbs and compass-inscribed curves that fill the background of each card bear more than a passing resemblance to Klint’s highly-saturated geometries. Klint, considered by some to be Europe’s first abstract painter, believed that her luminous compositions were the created under the influence of spirits. (The same could easily be said of Harris because she was taking direction from Crowley, who was believed to be a medium, able to channel ancient and magical forces.) </p><p>It’s no coincidence that Klint’s paintings and Harris’s Thoth illustrations were shown in the same pavilion at the 2013 Venice Biennale, which was intended to amplify voices that had previously been excluded and “cover 100 years of dreams and visions,” <a href="http://www.nytimes.com/2013/05/26/arts/design/massimiliano-gioni-of-venice-biennale.html">according</a> to curator Massimiliano Gioni.</p><p><br></p><h2>Sex &amp; Self-Help, ’70s Style</h2>',
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/jmrvzuo7VfRidule-4zWNA%2F07272017170054-0001+%28dragged%29+copy.jpg",
          type: "image",
          width: 405,
          height: 723,
          caption:
            "<p>Bill Greer and Lloyd Morgan, card from Morgan-Greer Tarot, 1979. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/66XOTGwZQzAAa0igYKSNTQ%2F07272017170207-0001+%28dragged%29.jpg",
          type: "image",
          width: 407,
          height: 719,
          caption:
            "<p>Bill Greer and Lloyd Morgan, card from Morgan-Greer Tarot, 1979. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/l0Qu946mLja0Dbv4ME4MHg%2F07272017170259-0001+%28dragged%29.jpg",
          type: "image",
          width: 413,
          height: 721,
          caption:
            "<p>Bill Greer and Lloyd Morgan, card from Morgan-Greer Tarot, 1979. </p>",
        },
      ],
    },
    {
      type: "text",
      body:
        '<p>Created by the artist Bill Greer under the direction of Lloyd Morgan, the Morgan-Greer deck is, like the 1970s themselves, both opulent and optimistic. The Magician sports a mustache that would make Tom Selleck blush, and the naked and embracing Lovers would fit right in with the hirsute and curvaceous illustrations in the original 1972 edition of <em>The Joy of Sex</em>.</p><p>The ‘70s enthusiasm for all things New Age created a renewed interest in tarot as a tool for self-discovery, and the Morgan Greer deck was there to greet it. The cards’ colors are lush and the lines are fluid. Greer chose to crop his figures tightly and removed the borders, allowing the illustrations to extend to the edges. The effect is fresh and personal. Formally, the Morgan-Greer illustrations have more in common with Jefferson Starship’s <em>Spitfire</em> (1976) album cover than with contemporary painting of the same period—the pendulum had swung away from figuration and would take a few years longer to swing back—but it’s possible to find a resonance between this deck’s art and a work like <a href="https://www.artsy.net/artist/judy-chicago">Judy </a><a href="https://www.artsy.net/artist/judy-chicago">Chicago</a>’s <em>Dinner Party </em>(1979), with its powerful goddess and blooming flowers. Greer’s strong women and frank sexuality make the deck very much of its time.</p><p><br></p><h2>Minimalism &amp; Identity in the Present Day</h2>',
    },
    {
      type: "image_set",
      layout: "full",
      title: "The Work of Bruce M. Sherman",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/CzofaZln2q-XhtXFqIio5A%2F07272017133815-0001+%28dragged%29+copy.jpg",
          type: "image",
          width: 396,
          height: 719,
          caption: "<p>King Khan, card from the Black Power Tarot. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/z7BUiIKCStBxlcXh53t0Xg%2F07272017133730-0001+%28dragged%29+copy.jpg",
          type: "image",
          width: 396,
          height: 728,
          caption: "<p>King Khan, card from the Black Power Tarot. </p>",
        },
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/T9g-NNJcmy8ej6qV6UQ-fA%2F07272017133839-0001.jpg",
          type: "image",
          width: 392,
          height: 718,
          caption: "<p>King Khan, card from the Black Power Tarot. </p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>Created by graphic designer Kati Forner for a Los Angeles-based fashion retailer, the Dreslyn tarot is the epitome of techno-minimalism. Although the deck is lovingly printed with high-gloss embossing, its illustrations are simple enough to be mistaken for the icon of an elegant iPhone app. It’s a radical departure from the historical approach, where each card is full to bursting with details, signs, and symbols—instead, each card has been paired down the bare minimum. The Dreslyn’s Lovers image is just two slender circles bisecting a line; its Eight of Wands is simply eight diagonal rules. The deck’s aesthetic mirrors the contemporary fear of clutter, as well as the increasing simplicity of the interfaces we use every day.</p><p>Tarot decks have also increasingly become more personal, and occasionally political, while reflecting a greater diversity. Illustrator John Elisle, in a commission for Missy Magazine, created seven all-women tarot cards, a chic sci-fi universe that includes a dominatrix Devil and a psychedelic High Priestess.</p>",
    },
    {
      type: "image_collection",
      layout: "column_width",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/Gk95i1tUaDJKeqQ-jcq6Cw%2FIMG_2142.jpg",
          type: "image",
          width: 5184,
          height: 3456,
          caption:
            "<p>Designed by Kati Forner for The Dreslyn, courtesy of the artist. </p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>The Black Power Tarot was conceived by musician King Khan in consultation with Alejandro Jodorowsky, and designed by illustrator Michael Eaton in 2015. The deck celebrates the strength and achievements of Black musicians, artists, and activists while staying faithful to the imagery and composition of the classic Tarot de Marseilles. The familiar faces of Malcolm X, James Brown, Tina Turner, Howlin’ Wolf, Sister Rosetta Tharpe, and others emerge from the Major Arcana. Sun Ra is there too, appropriately imagined as the Sun card. At a time when Black Americans are at a high risk of being the victims of state-sponsored violence, the Black Power Tarot feels especially urgent. By situating these figures within a centuries-old framework of esoteric wisdom, Khan affirms their value and influence, the importance of their legacy. By placing them on cards used for fortune-telling, he extends their power into the future.</p>",
    },
  ],
}

export const BasicArticle: ArticleData = {
  ...StandardArticle,
  layout: "feature",
  lead_paragraph:
    "<p>Critics were skeptical of Bambi when it was first released in 1942—what was the point, they wondered, of a cartoon that ignored fantasy in favor of naturalistic forest landscapes?</p>",
  title:
    "9 Famous Artists’ Studios You Can Visit, from Jackson Pollock to Barbara Hepworth",
  sections: [
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
        },
      ],
    },
    ...StandardArticle.sections,
  ],
  contributing_authors: [
    // deprecated
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
    },
  ],
  authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
    },
  ],
  hero_section: {
    type: "basic",
    title: "What’s the Path to Winning an Art Prize?",
    url: "https://vimeo.com/238843720",
    deck:
      "Created by graphic designer Kati Forner for a Los Angeles-based fashion retailer",
    cover_image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/ditbyaUgdcl6mHin07TfKA%2FMassimilianoGioni_0581.jpg",
  },
}

export const FeatureArticle: ArticleData = {
  _id: "594a7e2254c37f00177c0ea9",
  keywords: ["Inspiration", "Casey Lesser"],
  author_id: "57b5fc6acd530e65f8000406",
  author: {
    id: "50f4367051e7956b6e00045d",
    name: "Artsy Editorial",
  },
  thumbnail_title: "What’s the Path to Winning an Art Prize?",
  vertical: {
    name: "Creativity",
    id: "591eaa6bfaef6a3a8e7fe1b1",
  },
  hero_section: {
    type: "fullscreen",
    title: "What’s the Path to Winning an Art Prize?",
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4",
    deck: "Lorem Ipsum",
  },
  contributing_authors: [
    // deprecated
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
    },
  ],
  authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
      bio:
        "[Casey Lesser](http://artsy.net) is a well-known author and a long-time baker.",
      twitter_handle: "caseylesser",
    },
  ],
  channel_id: "5759e3efb5989e6f98f77993",
  description:
    "Applying for art prizes can be daunting, but doing so is a pathway to exhibitions, influential contacts, and a way to gain valuable feedback about your work.",
  tier: 1,
  tags: ["Inspiration"],
  tracking_tags: ["sponsored"],
  layout: "feature",
  published: true,
  featured: true,
  updated_at: "2017-07-19T17:19:55.909Z",
  title: "What’s the Path to Winning an Art Prize?",
  lead_paragraph: "",
  sections: [
    {
      type: "text",
      body:
        "<p>Around two years ago, a collector encouraged New York-based ceramic artist <a href='https://www.artsy.net/artist/jennie-jieun-lee'>Jennie Jieun Lee</a> to apply for an art prize. “I was a little bit scared. I’d applied to a few things in the past and been rejected, so I was bummed by that,” she admits. “I entered not thinking that I was going to win, but that it would be a good exercise to go through the process.” &nbsp;</p><p>It paid off. She was among several artists in 2015 who won an Artadia Award—an unrestricted, merit-based prize of up to $10,000, which is given to visual artists working in certain U.S. cities. The winnings, as well as the experience, helped Lee push her career forward. </p><p>“That money enabled me to move into a bigger studio and buy a larger kiln,” she explains. “With that movement, I was able to make my career.” And the momentum continued: More recently, she won a Pollock-Krasner grant that she used to move cross-country and fund a residency in the ceramic department at California State University, Long Beach. </p><p>Lee is by no means alone. While we’ve all heard of the boldfaced awards, like the Turner Prize or the Hugo Boss Prize, which tend to anoint artists when they’re already well known to the art world, a wealth of awards are available for lesser-known and emerging artists. </p>",
    },
    {
      type: "text",
      layout: "blockquote",
      body:
        "<blockquote>Land exhibitions, make influential contacts, and gain valuable feedback about your work.</blockquote>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          type: "artwork",
          id: "57dc83ce139b212bd7000172",
          slug: "matt-devine-untitled-suspended",
          date: "",
          title: "Untitled Suspended",
          image:
            "https://d32dm0rphc51dk.cloudfront.net/jDXiwSBgNP2eml1YkMIitg/larger.jpg",
          partner: {
            name: "Joanne Artman Gallery",
            slug: "joanne-artman-gallery",
          },
          artists: [
            {
              name: "Matt Devine",
              slug: "matt-devine",
            },
          ],
          artist: {
            name: "Matt Devine",
            slug: "matt-devine",
          },
          width: 3134,
          height: 2062,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>While applying for these opportunities can be daunting and time-consuming, it’s rewarding in more ways than one (even if you don’t end up winning). Artist prizes can be a path to prestige and profits, as well as a way to land exhibitions, make influential contacts, and gain valuable feedback about your work.</p><p>Based on conversations with artists who have won several different prizes, we share guidance below on how to go about applying for these opportunities, navigating the process, and benefiting from the positive outcomes they can offer.</p><p><br></p><h2>Finding the Prize That’s Right for You</h2><p>Artists should seek out opportunities based on their eligibility and the kind of work they make. “Don’t change to accommodate prizes,” advises London artist <a href='https://www.artsy.net/artist/ally-mcintyre'>Allyson McIntyre</a>, who won the 2015 HIX Award, which gives artists £10,000 to go towards a solo show at the London gallery HIX ART. “Be authentic to your practice and find the prizes that work for what you do.”</p><p>It’s important to recognize the distinction between prizes and awards—which are generally given in recognition of past work—and grants, which typically serve to facilitate future projects. Many artists note that they apply to both types of opportunities based on recommendations by word-of-mouth; they find that peers, former teachers, or other art-world contacts can share valuable input. New Orleans-based artist <a href='https://www.artsy.net/artist/aron-belka'>Aron Belka</a>, who won the BOMBAY SAPPHIRE® Artisan Series in 2015, advises artists to search for opportunities locally, through art schools, regional arts councils, art centers, and museums. &nbsp;</p><p>For those who perhaps do not have a tight-knit network of artist peers, there are several open-call websites and listservs that aggregate information on prizes, grants, and juried exhibitions. These include <a href='https://www.submittable.com/'>Submittable</a> and <a href='https://www.callforentry.org/'>Call for Entry</a>. On the latter, artists can create a profile, upload artwork images, and browse opportunities.</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<h1>Section Header</h1><p>Enthusiastically grow high-payoff infomediaries for virtual methodologies. Competently maximize reliable scenarios whereas magnetic e-services. Completely formulate sticky schemas rather than strategic technologies. Phosfluorescently disseminate long-term high-impact e-services vis-a-vis effective collaboration and idea-sharing. Credibly provide access to technically sound services through plug-and-play niches.</p>",
    },
    {
      type: "video",
      url: "https://vimeo.com/191988155",
      caption:
        "<p>2016 was a memorable year for the world, and art along with it. Powered by data culled from Artsy as well as UBS’s Planet Art app, “The Year in Art 2016” will explore how the creative community responded to the cultural shifts and tribulations this year has seen—from the destruction of Palmyra to the proliferation of Virtual Reality to the U.S. election.</p>",
      cover_image_url:
        "https://artsy-media-uploads.s3.amazonaws.com/ditbyaUgdcl6mHin07TfKA%2FMassimilianoGioni_0581.jpg",
      layout: "overflow_fillwidth",
    },
    {
      type: "text",
      body:
        '<p><br></p><h2>The Application Process</h2><p>Most awards will require several images of your work, as well as a written artist statement to provide some context. With higher-stakes prizes, artists may be asked to submit recommendation letters from peers or professionals. </p><p>A somewhat obvious, though easily botched, element of the application process is following directions. “You have to be careful not to get lazy with how you submit, as it may lead to you being disqualified, which is just a waste of your time,” McIntyre explains. Be sure to read the fine print and adhere to all particulars regarding preparing, labeling, and submitting application materials.</p><p>Organizations administering prizes will allow artists to submit several—typically three to eight—images. They are generally interested in seeing recent work, created over the past two or three years. Some prizes may specify that artists create a new, original work to submit. Artists should be sure to send high-quality photographs; if resources allow, hire a photographer (or recruit a qualified friend) to have works shot professionally.</p><p>For those artists who work across mediums—perhaps printmaking one day, performance the next—know that it might not be advisable to try to include the full breadth of your practice in a single application. “Try to hone in on a single idea, or a couple of ideas,” says artist <a href="https://www.artsy.net/artist/alex-podesta">Alex Podesta</a>, who won the BOMBAY SAPPHIRE® Artisan Series in 2013, and has also served as a juror for other awards. “I’ve been on the other side of this a number of times, and when you’re reviewing applications it’s confusing and not helpful to have an artist submitting sculpture, painting, <em>and</em> a video piece. Focus on one aspect of your work.” </p><p>In addition to images, a written artist’s statement that explains and contextualizes the artist’s work is important, too. Artists should get in the habit of updating their statements regularly, adapting their texts to accurately reflect their current practices. Artist <a href="https://www.artsy.net/artist/yevgeniya-baras">Yevgeniya Baras</a>, who won an Artadia Award in New York in 2015, notes that she rewrites or edits her artist statement every two years. &nbsp;</p><p>For certain awards, artists may need to be able to speak about their work with jurors in person. If this is the case, be prepared to take full advantage of the opportunity. Baras notes that for Artadia, the panel of jurors visited her studio; she was careful to delve deeper into elements of her work that don’t come across through two-dimensional images or her online application. For the Meurice Prize for contemporary art, artists must give an oral presentation of their work. “While we don’t judge the artist on their ability to conduct a perfect verbal presentation of the work, we are of course interested to hear the artist speak of their work in a very intimate way, and that can actually be the decisive sector,” says Jennifer Flay, director of the art fair FIAC, and a juror for the Meurice Prize.</p><p><br></p><h2>Application Fees</h2><p>While it’s free to apply for some awards, it’s not uncommon to pay a fee in the range of $20 to $75—which can make a difference for artists looking to apply to multiple opportunites. Belka notes that if the stakes are high, an application fee may be worth it, but he advises that artists do their research before submitting said fees to avoid scams. </p><p>McIntyre recalls that she once applied to a competition that promised winners a show in Venice. “I was accepted, but they asked for an outrageous artist fee of €500,” she says. Later she learned that fellow artists had fallen for the scam and lost their money—and the works they had submitted. “Have discretion and awareness that your money may amount to nothing,” she counsels.</p><p><br></p><h2>Set Expectations and Be Persistent</h2><p>No one wins every award; there’s often a trail of rejections on the way to any prize. Baras, who landed the Rema Hort Mann Foundation Emerging Artist Grant in 2014 and the Artadia Award thereafter, notes that there’s been plenty of failure mixed in with those successes. (She estimates that she submits around 10 award or grant applications per year.) </p><p>“Assume that for nine out of every 10 applications that you send in, it’s not going to be the work they’re looking for,” Podesta says. “Younger artists, especially, shouldn’t get daunted. Remember that the work just isn’t resonating with the [specific] people reviewing it.”</p><p>It helps to go into the application process with an open mind, and reasonable hopes. “I went into it not expecting it to make my career, but rather for it to be an addition to it,” says <a href="https://www.artsy.net/artist/kristine-mays">Kristine Mays</a>, who won the BOMBAY SAPPHIRE® Artisan Series in 2014. Artists, she adds, should simply stay true to their craft, and keep working away.</p><p>Remember that rejection, while disappointing, can be a learning experience. “Without this kind of risk, you can’t really put yourself out there,” Baras says. “Most applications, for many amazing awards, just take a few days. It’s a way to see a new community, to seek new eyes, and I think that’s a necessary and healthy risk for an artist to take.”</p><p>Lee advises fellow artists to cast a wide net and apply to as many opportunities as possible, developing a thick skin as they do. “If you get rejected one year, apply again the next,” she says, simply. “It’s about being persistent and not taking anything personally.”</p><p><br></p>',
    },
    {
      type: "image_collection",
      layout: "fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/MGjCex4gkN4ofE_qOj_DPQ%2Farticle+asset+2-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>Enthusiastically grow high-payoff infomediaries for virtual methodologies. Competently maximize reliable scenarios whereas magnetic e-services. Completely formulate sticky schemas rather than strategic technologies. Phosfluorescently disseminate long-term high-impact e-services vis-a-vis effective collaboration and idea-sharing. Credibly provide access to technically sound services through plug-and-play niches.</p>",
    },
    {
      type: "image_set",
      layout: "mini",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/MGjCex4gkN4ofE_qOj_DPQ%2Farticle+asset+2-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p><br></p><h2>Make the Most of Winning</h2><p>Depending on the prize, artists may be awarded a stipend to create new work for a show or unrestricted funds to further their careers. In both cases, artists report that these funds have gone towards keeping their art practices up and running, be it through realizing new works and shows or for subsidizing rent, bills, and the costs of production and supplies. &nbsp;</p><p>For example, the Meurice Prize, which supports artists under the age of 45 who show with French galleries, awards €20,000, which is split between the artist and their gallery. This year, the BOMBAY SAPPHIRE® Artisan Series (which is only open to entrants from North America) awards a grand prize winner a stipend of $10,000 to create a public artwork. </p><p>In some cases, like Lee’s, a sizable prize could help an artist move into a bigger studio, relocate to another city, or participate in a residency. “Before, I never even thought about moving out of New York,” she says. “The Pollock-Krasner grant gave me the freedom to possibly move cross-country to explore this residency. I feel like it’s completely changed my life, and now I’m not sure when I’m coming back.”</p><p><br></p><h2>It’s More Than Just Money </h2><p>Baras notes that even if she hadn’t won the Artadia Award it would’ve been a rewarding experience due to the panel of jurors she encountered. “Whether you win or not, whoever’s on the panel remembers your work,” she says. “It’s beneficial regardless to put yourself out there because you really never know who might notice.” &nbsp; </p><p>Other prizes similarly award artists with the opportunity to exhibit their work to a new audience. The Daiwa Foundation Art Prize, awarded each year to a British artist, serves to give that artist a solo gallery exhibition in Japan. And the Luxembourg Art Prize gives finalists the opportunity to show their work in a group exhibition in Luxembourg; the winner is awarded €25,000 to produce new work for a solo presentation at Galerie Hervé Lancelin for an exhibition the following year. </p><p>For Belka and Mays, who both won the chance to show their work at the Scope Art Fair in New York through the BOMBAY SAPPHIRE® Artisan Series, winning led to important exposure and networking opportunities. “Overall, the most positive outcome was being able to put myself in arenas I’d never been in before,” Mays says of her experience. She saw it as a “jump start” for her career; she’s been busy making and showing her work steadily since her Scope debut.</p><p>“I made a point of greeting and speaking to everyone that came to the space,” Mays adds. Both artists recommend being prepared with business cards and following up with the contacts you make via email. Belka notes that he made an important collector contact that he maintains today. “Come prepared to talk about your work, have cards, spread your name, and get yourself out there,” says Belka.</p><p>Mays was also inspired by the feedback she received from viewers of her work. “Many times we overlook the value of feedback from people, the ideas that can come out of conversation with people,” she says. </p><p><br></p><h2>Building Confidence </h2><p>Most artists agree that one of the most impactful parts of winning a prize is the vote of confidence that it provides. Formal recognition can be a sign of assurance that they were right to pursue a career as an artist, and can inspire them to get back in the studio. &nbsp;</p><p>“It’s a nice confirmation to know that you can communicate to people you don’t even know, and just continue along the path of making your work,” Baras muses. “I see it as a kind of hug. Generally, you’re sort of hugging yourself as an artist—but once in awhile, you get an acknowledgment from the outside world.”</p>",
    },
  ],
  postscript:
    "<p>Header animation: Illustration by Tomi Um for Artsy. Animation by Ale Pixel Studio.</p>",
  id: "594a7e2254c37f00177c0ea9",
  scheduled_publish_at: null,
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/gejssmXDiO3G1pE73phZ3Q%2FArtboard+2%402xef-100.jpg",
  social_image:
    "https://artsy-media-uploads.s3.amazonaws.com/wU7ase6M0zWv6MLcC8-L5A%2Fd7hftxdivxxvm.cloudfront.jpg",
  published_at: "2017-06-29T15:00:00.000Z",
  slug: "artsy-editorial-path-winning-art-prize",
}

export const FeatureBasicVideoArticle: ArticleData = {
  ...FeatureArticle,
  hero_section: {
    type: "basic",
    title: "What’s the Path to Winning an Art Prize?",
    url: "https://vimeo.com/238843720",
    deck:
      "Created by graphic designer Kati Forner for a Los Angeles-based fashion retailer",
    cover_image_url:
      "https://artsy-media-uploads.s3.amazonaws.com/ditbyaUgdcl6mHin07TfKA%2FMassimilianoGioni_0581.jpg",
  },
}

const {
  tracking_tags,
  ...UnsponsoredFeatureArticleSansTrackingTagsProp
} = FeatureArticle
export const UnsponsoredFeatureArticle: ArticleData = {
  ...UnsponsoredFeatureArticleSansTrackingTagsProp,
  sponsor: {
    partner_condensed_logo: null,
    partner_dark_logo: null,
    partner_light_logo: null,
    partner_logo_link: null,
    pixel_tracking_code: null,
  },
}

export const FeatureBasicArticle: ArticleData = {
  ...FeatureArticle,
  hero_section: {
    type: "basic",
    title: "What’s the Path to Winning an Art Prize?",
    deck:
      "Created by graphic designer Kati Forner for a Los Angeles-based fashion retailer",
  },
}

export const SponsoredArticle = extend(cloneDeep(FeatureArticle), Sponsor)

export const SuperArticle = extend(cloneDeep(FeatureArticle), {
  is_super_article: true,
  super_article: {
    footer_blurb:
      "This feature is created in collaboration with UBS with data sourced from UBS’s art news app Planet Art. Planet Art provides a distilled look at contemporary news, reviews and information from the art world.",
    partner_fullscreen_header_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/qp6GUcn5RkvscdYEBmqFXw%2FUBS_White.png",
    partner_link:
      "https://itunes.apple.com/us/app/planet-art-your-source-for/id937737095?mt=8",
    partner_link_title: "Download the Planet Art app",
    partner_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/PUn-n_Zn0VHfyDKofWeLeQ%2FUBS_Black.png",
    partner_logo_link: "https://www.ubs.com/microsites/planet-art/home.html",
    related_articles: [
      "5846e12cc137140011634710",
      "5846e1fdc137140011634711",
      "58459e56104093001189a7d1",
      "584b0ee3e751080011bc1ad5",
    ],
    secondary_logo_link:
      "https://www.ubs.com/global/en/about_ubs/contemporary-art.html",
    secondary_logo_text: "PRESENTED IN PARTNERSHIP WITH",
    secondary_partner_logo:
      "https://artsy-media-uploads.s3.amazonaws.com/kq-CcNCHEgAuPadHtOveeg%2FPlanetArt_Black.png",
  },
})

export const ImageHeavyStandardArticle = extend(cloneDeep(StandardArticle), {
  sections: [
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>2016 was a memorable year for the world, and art along with it. Powered by data culled from Artsy as well as UBS’s Planet Art app, “The Year in Art 2016” will explore how the creative community responded to the cultural shifts and tribulations this year has seen—from the destruction of Palmyra to the proliferation of Virtual Reality to the U.S. election.</p>",
    },
    {
      type: "image_collection",
      layout: "overflow_fillwidth",
      images: [
        {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/7lsxxsw0qPAuKl37jEYitw%2Farticle+asset+1-hig+res+copy.jpg",
          type: "image",
          width: 1200,
          height: 750,
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
        },
      ],
    },
    {
      type: "text",
      body:
        "<p>While applying for these opportunities can be daunting and time-consuming, it’s rewarding in more ways than one (even if you don’t end up winning). Artist prizes can be a path to prestige and profits, as well as a way to land exhibitions, make influential contacts, and gain valuable feedback about your work.</p><p>Based on conversations with artists who have won several different prizes, we share guidance below on how to go about applying for these opportunities, navigating the process, and benefiting from the positive outcomes they can offer.</p><p><br></p><h2>Finding the Prize That’s Right for You</h2><p>Artists should seek out opportunities based on their eligibility and the kind of work they make. “Don’t change to accommodate prizes,” advises London artist <a href='https://www.artsy.net/artist/ally-mcintyre'>Allyson McIntyre</a>, who won the 2015 HIX Award, which gives artists £10,000 to go towards a solo show at the London gallery HIX ART. “Be authentic to your practice and find the prizes that work for what you do.”</p><p>It’s important to recognize the distinction between prizes and awards—which are generally given in recognition of past work—and grants, which typically serve to facilitate future projects. Many artists note that they apply to both types of opportunities based on recommendations by word-of-mouth; they find that peers, former teachers, or other art-world contacts can share valuable input. New Orleans-based artist <a href='https://www.artsy.net/artist/aron-belka'>Aron Belka</a>, who won the BOMBAY SAPPHIRE® Artisan Series in 2015, advises artists to search for opportunities locally, through art schools, regional arts councils, art centers, and museums. &nbsp;</p><p>For those who perhaps do not have a tight-knit network of artist peers, there are several open-call websites and listservs that aggregate information on prizes, grants, and juried exhibitions. These include <a href='https://www.submittable.com/'>Submittable</a> and <a href='https://www.callforentry.org/'>Call for Entry</a>. On the latter, artists can create a profile, upload artwork images, and browse opportunities.</p>",
    },
    {
      type: "text",
      body:
        "<p>Efficiently seize optimal innovation for adaptive technology. Continually drive equity invested architectures and visionary best practices. Completely transition frictionless potentialities after optimal web-readiness. Proactively leverage other's reliable infomediaries rather than multifunctional mindshare. Phosfluorescently utilize frictionless technology vis-a-vis backward-compatible catalysts for change.</p>",
    },
  ],
})

export const ShortStandardArticle = extend(cloneDeep(StandardArticle), {
  sections: [
    {
      type: "text",
      body:
        "<p>While applying for these opportunities can be daunting and time-consuming, it’s rewarding in more ways than one (even if you don’t end up winning). Artist prizes can be a path to prestige and profits, as well as a way to land exhibitions, make influential contacts, and gain valuable feedback about your work.</p><p>Based on conversations with artists who have won several different prizes, we share guidance below on how to go about applying for these opportunities, navigating the process, and benefiting from the positive outcomes they can offer.</p>",
    },
  ],
})

export const MissingVerticalStandardArticle = extend(
  cloneDeep(StandardArticle),
  {
    vertical: null,
  }
)

// Articles with only text sections
export const TextClassicArticle = extend(cloneDeep(ClassicArticle), {
  sections: ClassicText,
})
export const TextStandardArticle = extend(cloneDeep(StandardArticle), {
  sections: StandardText,
})
export const TextFeatureArticle = extend(cloneDeep(FeatureArticle), {
  sections: FeatureText,
})

export const VideoArticle: ArticleData = {
  layout: "video",
  id: "597b9f652d35b80017a2a6a7",
  _id: "597b9f652d35b80017a2a6a7",
  title: "Trevor Paglan",
  thumbnail_title:
    "New Study Shows the Gender Pay Gap for Artists Is Not So Simple",
  thumbnail_image:
    "https://artsy-media-uploads.s3.amazonaws.com/wHFgQlrTrHav5O6bQRJ0dg%2FUntitled+Suspended_30x67x33+%282%29_sm+cropped.jpg",
  slug: "joanne-artman-gallery-poetry-naturerefinement-form",
  published_at: "2017-07-28T20:38:05.709Z",
  description:
    "The elegant spiral of the Nautilus shell, the sinuous pattern of the banks of a river, or the swirling vortex street of clouds - patterns exist.",
  vertical: {
    name: "Art Market",
  },
  media: Media[0],
  sponsor: {
    partner_condensed_logo: null,
    partner_dark_logo: null,
    partner_light_logo: null,
    partner_logo_link: null,
    pixel_tracking_code: null,
  },
}

export const VideoArticleUnpublished = extend(cloneDeep(VideoArticle), {
  media: {
    title: "Trevor Paglan",
    url: "",
    duration: 4000,
    release_date: "2018-08-28T20:38:05.709Z",
    published: false,
    description:
      "<p>Integer posuere erat a <a href='http://artsy.net'>ante venenatis dapibus posuere</a> velit aliquet. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.</p><p>Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.</p>",
    credits:
      "<p><b>Director</b></br>Marina Cashdan<br><b>Featuring</b></br>Trevor Paglan</p>",
  },
})

export const VideoArticleSponsored = extend(cloneDeep(VideoArticle), Sponsor)

export const SeriesArticle: ArticleData = {
  _id: "594a7e2254c37f00177c0ea9",
  id: "594a7e2254c37f00177c0ea9",
  layout: "series",
  title: "The Future of Art",
  slug: "future-of-art",
  hero_section: {
    url:
      "https://artsy-media-uploads.s3.amazonaws.com/GXvnaBYBdP2z6LKIBQF7XA%2FArtboard.jpg",
  },
  series: {
    description:
      "<p>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. <a href='http://artsy.net'>Curabitur blandit</a> tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Curabitur blandit tempus porttitor. Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.</p><p>Donec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Nulla vitae elit libero, a pharetra augue.</p>",
  },
  related_articles: ["594a7e2254c37f00177c0ea9", "597b9f652d35b80017a2a6a7"],
  sponsor: {
    partner_condensed_logo: null,
    partner_dark_logo: null,
    partner_light_logo: null,
    partner_logo_link: null,
    pixel_tracking_code: null,
  },
}

export const SeriesArticleSponsored = extend(cloneDeep(SeriesArticle), Sponsor)

export const SeriesArticleCustomSubTitle = extend(cloneDeep(SeriesArticle), {
  series: {
    sub_title: "About this Feature",
  },
})

export const NewsArticle: ArticleData = {
  id: "594a7e2254c37f00177c0ea9",
  _id: "594a7e2254c37f00177c0ea9",
  layout: "news",
  slug: "news-article",
  author_id: "57b5fc6acd530e65f8000406",
  author: {
    id: "50f4367051e7956b6e00045d",
    name: "Artsy Editorial",
  },
  published_at: "2018-07-19T17:19:55.909Z",
  authors: [
    {
      id: "523783258b3b815f7100055a",
      name: "Casey Lesser",
      bio:
        "[Casey Lesser](http://artsy.net) is a well-known author and a long-time baker.",
      twitter_handle: "caseylesser",
    },
  ],
  title:
    "The oldest known depiction of a supernova was found in a work of 5,000 year old rock art, scientists believe.",
  sections: [
    {
      type: "image_collection",
      images: [
        {
          caption: "<p>Illustration by Tomi Um for Artsy.</p>",
          height: 533,
          type: "image",
          url:
            "https://d32dm0rphc51dk.cloudfront.net/N13JE8AbtWFAgvueH8G1uQ/larger.jpg",
          width: 800,
        },
      ],
    },
    {
      type: "text",
      body:
        "<p><strong>The design for the as-yet-uncompleted sculpture</strong>, <span style='text-decoration:line-through;'><em>Bouquet of Tulips</em></span>, was donated by Koons to the French capital in November 2016 as a memorial to the recent terrorist attacks that have taken place in the city. But Koons, <a href='#'>one of the world’s richest living artists</a>, didn’t donate the $4.3 million needed to create 40-foot-tall sculpture, which was raised separately via donations. And the work, slated for installation in front of the Palais de Tokyo and Paris’s Museum of Modern Art, has attracted opposition. In a letter published in the French newspaper Libération on Sunday, signatories—including Frédéric Mitterrand, the country’s former culture minister—demanded that the city halt its plans to install the sculpture, calling it “shocking.” </p>",
    },
    SocialEmbedInstagram,
    {
      type: "text",
      layout: "blockquote",
      body:
        "<blockquote>It is understood the [British Museum] has been in talks about a possible loan of the tapestry for several years, but there will be other contenders to host it.</blockquote>",
    },
    {
      type: "text",
      layout: "blockquote",
      body:
        "<blockquote>The bookmaker Ladbrokes is offering odds on where it might go, with the British Museum evens favourite, followed by Westminster Cathedral at 3/1, Canterbury Cathedral at 5/1 and Hastings at 8/1.</blockquote>",
    },
    {
      type: "text",
      layout: "blockquote",
      body: "<blockquote><a href='#'>The Guardian</a></blockquote>",
    },
    {
      type: "text",
      body:
        "<p>It further criticized Koons for using the opportunity as a publicity stunt, as the sculpture’s planned location is in a tourist-heavy area far from where the 2015 terrorist attacks actually took place. “We appreciate gifts, [but ones that are] free, unconditional, and without ulterior motives,” the letter said. In any case, Parisian officials have not yet granted authorization to install the sculpture, according to the <em>New York Times</em>.</p>",
    },
    SocialEmbedTwitter,
    {
      type: "text",
      body:
        "<h3><strong>Takeaway</strong></h3><h3>Should Prince lose at trial and on appeal the resulting precedent would reign in the broader <em>fair use interpretations</em> now afforded to artists.</h3>",
    },
  ],
  news_source: {
    title: "The New York Times",
    url: "http://nytimes.com",
  },
}
