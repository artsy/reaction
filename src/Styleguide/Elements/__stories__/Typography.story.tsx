import React from "react"
import styled from "styled-components"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { Display, Sans, Serif, themeProps } from "@artsy/palette"
import { Flex } from "../Flex"

const stories = storiesOf("Styleguide/Elements", module)

function getTypeSizes(type) {
  const sizes = Object.keys(themeProps.typeSizes)
    .filter(size => size.includes(type))
    .map(size => size.replace(type, ""))

  return sizes
}

stories.add("Typography", () => {
  return (
    <React.Fragment>
      <Section title="Sans">
        <Flex flexDirection="column" p={2}>
          {getTypeSizes("sans").map((size, key) => {
            return (
              <Sans size={size} key={key}>
                Donald Judd
              </Sans>
            )
          })}
        </Flex>
      </Section>

      <Section title="Serif">
        <Flex flexDirection="column" p={2}>
          {getTypeSizes("serif").map((size, key) => {
            return (
              <Serif size={size} key={key}>
                Donald Judd
              </Serif>
            )
          })}
        </Flex>
      </Section>

      <Section title="Display">
        <Flex flexDirection="column" p={2}>
          {getTypeSizes("display").map((size, key) => {
            return (
              <Display size={size} key={key}>
                Donald Judd
              </Display>
            )
          })}
        </Flex>
      </Section>

      <Section title="Paragraph text">
        <Item>
          <Serif size={3}>
            Donald Judd, widely regarded as one of the most significant American
            artists of the post-war period, is perhaps best-known for the
            large-scale outdoor installations and long, spacious interiors he
            designed in Marfa, Texas. His oeuvre has come to define what has
            been referred to as Minimalist art—a label the artist strongly
            objected to. His <a href="#">sculptures and installations</a>,
            constructed out of industrial materials such as Plexiglas, concrete,
            and steel and arranged in precise geometric shapes, were intended to
            emphasize the purity of the objects themselves rather than any
            symbolic meaning they might have—“the simple expression of complex
            thought,” said Judd. His particular interest in architecture led him
            to design both the sculptures and the spaces in which they would be
            contained, influencing a generation of artists and designers from
            Anish Kapoor to David Batchelor.
          </Serif>
        </Item>
        <Item>
          <Sans size={3}>
            Donald Judd, widely regarded as one of the most significant American
            artists of the post-war period, is perhaps best-known for the
            large-scale outdoor installations and long, spacious interiors he
            designed in Marfa, Texas. His oeuvre has come to define what has
            been referred to as Minimalist art—a label the artist strongly
            objected to. His <a href="#">sculptures and installations</a>,
            constructed out of industrial materials such as Plexiglas, concrete,
            and steel and arranged in precise geometric shapes, were intended to
            emphasize the purity of the objects themselves rather than any
            symbolic meaning they might have—“the simple expression of complex
            thought,” said Judd. His particular interest in architecture led him
            to design both the sculptures and the spaces in which they would be
            contained, influencing a generation of artists and designers from
            Anish Kapoor to David Batchelor.
          </Sans>
        </Item>
      </Section>

      <Section title="Links - default">
        <Sans mx={1}>
          <a href="#">This is a link</a>
        </Sans>

        <Serif mx={1}>
          <a href="#">This is a link</a>
        </Serif>
      </Section>

      <Section title="Links - .noUnderline">
        <Sans mx={1}>
          <a href="#" className="noUnderline">
            This is a link
          </a>
        </Sans>

        <Serif mx={1}>
          <a href="#" className="noUnderline">
            This is a link
          </a>
        </Serif>

        <Display size="4t" mx={1}>
          <a href="#" className="noUnderline">
            This is a link
          </a>
        </Display>
      </Section>
      <Section title="Links .colorLink">
        <Sans mx={1}>
          <a href="#" className="colorLink">
            This is a link
          </a>
        </Sans>

        <Serif mx={1}>
          <a href="#" className="colorLink">
            This is a link
          </a>
        </Serif>
      </Section>
    </React.Fragment>
  );
})

const Item = styled.div`
  padding-bottom: 30px;
`
