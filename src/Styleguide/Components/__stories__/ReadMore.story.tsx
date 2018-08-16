import { Sans, Serif } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
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
