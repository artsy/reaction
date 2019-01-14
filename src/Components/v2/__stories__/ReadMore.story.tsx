import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Utils/Section"
import { ReadMore } from "../ReadMore"

storiesOf("Styleguide/Components", module).add("ReadMore", () => {
  return (
    <React.Fragment>
      <Section title="Character cap">
        <Serif size="3">
          <ReadMore
            maxChars={300}
            content={`
              Donald Judd, widely regarded as one of the most significant American
              artists of the post-war period, is perhaps
              best-known for the large-scale outdoor installations and long,
              spacious interiors he designed in Marfa. Donald Judd, widely
              regarded as one of the most significant American artists of the
              post-war period, is perhaps best-known for the large-scale outdoor
              installations and long, spacious interiors he designed in Marfa.
            `.trim()}
          />
        </Serif>
      </Section>
      <Section title="Character cap with html ">
        <Serif size="3">
          <ReadMore
            maxChars={300}
            content={`
              <p>Donald Judd, widely regarded as one of the most significant American
              artists of <a href="#">the post-war period</a>, is perhaps
              best-known for the large-scale outdoor installations and long,
              spacious interiors he designed in Marfa. Donald Judd, widely
              regarded as one of the most significant American artists of the
              post-war period, is perhaps best-known for the large-scale outdoor
              installations and long, spacious interiors he designed in Marfa.</p>
            `.trim()}
          />
        </Serif>
      </Section>
      <Section title="Character cap with special characters">
        <Serif size="3">
          <ReadMore
            maxChars={300}
            content={`
              For his now legendary first show at the Institute of Contemporary Art
              (ICA) in Philadelphia, PA in 1965, Andy Warhol covered the museum walls
              with sheets of S&H Green Stamps prints. This historic exhibition was
              organized for the Philadelphia ICA by its new curator, Sam Green, who
              until a few months earlier had been a frequenter of Warhol's Factory
              and a young gallery director at Dick Bellamy's legendary Green Gallery
              in New York. Warhol had made several paintings with S&H Green Stamps
              as a motif in 1962 and one of these works was included in the ICA exhibition,
              but it was primarily as a clever nod to the resourceful young curator that
              Warhol chose to use the image again as the invitation for the show. Green
              seized the opportunity, and had 6,000 copies of the invitation printed, an
              extravagant number at that time, given that the space could hold only 300,
              and used some of those that were not mailed out as wallpaper, and as the
              backdrop for pre-exhibition publicity photos. Then, on the day of the opening,
              Green made a grand entrance alongside Warhol and Edie Sedgwick wearing a
              tie silk-screened with the same S & H Green Stamp motif. \r\n\r\nThis
              folded print has 5 horizontal folds and 2 vertical folds. Although they
              were published in a limited edition of 6,000, far fewer original invitations
              are extant nearly half a century on, exactly because they were invitations
              that many discarded after receiving, making the remaining prints collectors
              items. \r\n\r\nThis iconic print is fully referenced in the catalogue raisonne
              of Andy Warhol's works on paper. \r\n\r\nS&H Green Stamps was a 1950s coupon
              system whereby consumers would receive stamps in exchange for purchasing gas
              and other everyday goods. After collecting so many stamps, the consumer would
              redeem them for various products. Coming from a lower income family in
              Pittsburgh, Warhol was always intrigued with the idea that you could get
              something for free. The S&H coupon program was an easily recognizable staple
              of life in middle America for several decades - from the 1950s into the 1970s -
              and many children growing up in that era remember their mothers diligently
              licking the back of the S&H stickers and pasting them onto a coupon book to
              be redeemed for free household goods. Representing and commenting on American
              consumerism in his prints, Warhol turned recognizable images, like the S&H Green
              Stamps, into iconic Pop imagery. \r\n\r\nOwn an uncommon piece of Sixties Pop Art
              history as well as a nostalgic symbol of middle American consumer culture of
              the mid-Sixties!\r\nCatalogue Raisonné: 11.9, Feldman & Schellman\r\n\r\nPlease
              check out our other listings and FOLLOW us on Artsy:\r\nhttps://www.artsy.net/alpha-137-gallery
            `.trim()}
          />
        </Serif>
      </Section>
      <Section title="With React element">
        <Sans size="3">
          <ReadMore
            maxChars={300}
            content={
              <div>
                Donald Judd, widely regarded as one of the most significant
                American artists of <a href="#">the post-war period</a>, is
                perhaps best-known for the large-scale outdoor installations and
                long, spacious interiors he designed in Marfa. Donald Judd,
                widely regarded as one of the most significant American artists
                of the post-war period, is perhaps best-known for the
                large-scale outdoor installations and long, spacious interiors
                he designed in Marfa.
              </div>
            }
          />
        </Sans>
      </Section>

      <Section title="Short content">
        <Sans size="3">
          <ReadMore
            maxChars={300}
            content={
              <div>
                Donald Judd, widely regarded as one of the most significant
                American artists of <a href="#">the post-war period</a>.
              </div>
            }
          />
        </Sans>
      </Section>
    </React.Fragment>
  )
})
