import { storiesOf } from "@storybook/react"
import { extend } from "lodash"
import * as React from "react"
import Article from "../article"
import { StandardArticle } from "../fixtures/articles"
import { RelatedCanvas, RelatedPanel } from "../fixtures/components"

storiesOf("Publishing/Read More", module).add("Text Article", () => {
  const article = extend({}, StandardArticle, {
    sections: [
      {
        type: "text",
        body:
          "<p>2016 was a memorable year for the world, and art along with it. Powered by data culled from Artsy as well as UBS’s Planet Art app, “The Year in Art 2016” will explore how the creative community responded to the cultural shifts and tribulations this year has seen—from the destruction of Palmyra to the proliferation of Virtual Reality to the U.S. election.</p>",
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
  return (
    <Article
      article={article}
      relatedArticlesForPanel={RelatedPanel}
      relatedArticlesForCanvas={RelatedCanvas}
      isTruncated
    />
  )
})

storiesOf("Publishing/Read More", module).add("Image-heavy Article", () => {
  const article = extend({}, StandardArticle, {
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
  return (
    <Article
      article={article}
      relatedArticlesForPanel={RelatedPanel}
      relatedArticlesForCanvas={RelatedCanvas}
      isTruncated
    />
  )
})

storiesOf("Publishing/Read More", module).add("Short Article", () => {
  const article = extend({}, StandardArticle, {
    sections: [
      {
        type: "text",
        body:
          "<p>While applying for these opportunities can be daunting and time-consuming, it’s rewarding in more ways than one (even if you don’t end up winning). Artist prizes can be a path to prestige and profits, as well as a way to land exhibitions, make influential contacts, and gain valuable feedback about your work.</p><p>Based on conversations with artists who have won several different prizes, we share guidance below on how to go about applying for these opportunities, navigating the process, and benefiting from the positive outcomes they can offer.</p>",
      },
    ],
  })
  return (
    <Article
      article={article}
      relatedArticlesForPanel={RelatedPanel}
      relatedArticlesForCanvas={RelatedCanvas}
      isTruncated
    />
  )
})
