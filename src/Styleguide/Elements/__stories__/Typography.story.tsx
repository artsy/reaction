import { storiesOf } from "storybook/storiesOf"
import React from "react"
import styled from "styled-components"
import { InfoContainer } from "../../Utils/InfoContainer"
import { Display, Sans, Serif, themeProps } from "@artsy/palette"
import { withInfo } from "@storybook/addon-info"

const stories = storiesOf("Styleguide/Typography", module)

function getTypeSizes(type) {
  const sizes = Object.keys(themeProps.typeSizes)
    .filter(size => size.includes(type))
    .map(size => size.replace(type, ""))

  return sizes
}

stories
  .add(
    "Sans",
    withInfo(`

    https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221

  `)(() => {
      const sizes = getTypeSizes("sans")

      return (
        <InfoContainer>
          {sizes.map((size, key) => {
            return (
              <Item key={key}>
                <Sans size={size}>Donald Judd</Sans>
              </Item>
            )
          })}
        </InfoContainer>
      )
    })
  )
  .add(
    "Serif",
    withInfo(`

    https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221

  `)(() => {
      const sizes = getTypeSizes("serif")

      return (
        <InfoContainer>
          {sizes.map(size => {
            return (
              <Item>
                <Serif size={size}>Donald Judd</Serif>
              </Item>
            )
          })}
        </InfoContainer>
      )
    })
  )
  .add(
    "Display",
    withInfo(`

    https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221

  `)(() => {
      const sizes = getTypeSizes("display")

      return (
        <InfoContainer>
          {sizes.map(size => {
            return (
              <Item>
                <Display size={size}>Donald Judd</Display>
              </Item>
            )
          })}
        </InfoContainer>
      )
    })
  )
  .add(
    "Paragraph Text",
    withInfo(`

    https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221

  `)(() => {
      return (
        <div>
          <InfoContainer>
            <Serif size={3}>
              Donald Judd, widely regarded as one of the most significant
              American artists of the post-war period, is perhaps best-known for
              the large-scale outdoor installations and long, spacious interiors
              he designed in Marfa, Texas. His oeuvre has come to define what
              has been referred to as Minimalist art—a label the artist strongly
              objected to. His <a href="#">sculptures and installations</a>,
              constructed out of industrial materials such as Plexiglas,
              concrete, and steel and arranged in precise geometric shapes, were
              intended to emphasize the purity of the objects themselves rather
              than any symbolic meaning they might have—“the simple expression
              of complex thought,” said Judd. His particular interest in
              architecture led him to design both the sculptures and the spaces
              in which they would be contained, influencing a generation of
              artists and designers from Anish Kapoor to David Batchelor.
            </Serif>
          </InfoContainer>

          <InfoContainer>
            <Sans size={3}>
              Donald Judd, widely regarded as one of the most significant
              American artists of the post-war period, is perhaps best-known for
              the large-scale outdoor installations and long, spacious interiors
              he designed in Marfa, Texas. His oeuvre has come to define what
              has been referred to as Minimalist art—a label the artist strongly
              objected to. His <a href="#">sculptures and installations</a>,
              constructed out of industrial materials such as Plexiglas,
              concrete, and steel and arranged in precise geometric shapes, were
              intended to emphasize the purity of the objects themselves rather
              than any symbolic meaning they might have—“the simple expression
              of complex thought,” said Judd. His particular interest in
              architecture led him to design both the sculptures and the spaces
              in which they would be contained, influencing a generation of
              artists and designers from Anish Kapoor to David Batchelor.
            </Sans>
          </InfoContainer>
        </div>
      )
    })
  )

const Item = styled.div`
  margin-bottom: 2px;
`
