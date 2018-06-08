import { storiesOf } from "storybook/storiesOf"
import React from "react"
import { Display, Sans, Serif, themeProps } from "@artsy/palette"
import { Col } from "../Grid"
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
        <div>
          {sizes.map((size, key) => {
            return (
              <Col key={key}>
                <Sans size={size}>Donald Judd</Sans>
              </Col>
            )
          })}
        </div>
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
        <div>
          {sizes.map(size => {
            return (
              <Col>
                <Serif size={size}>Donald Judd</Serif>
              </Col>
            )
          })}
        </div>
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
        <div>
          {sizes.map(size => {
            return (
              <Col>
                <Display size={size}>Donald Judd</Display>
              </Col>
            )
          })}
        </div>
      )
    })
  )
