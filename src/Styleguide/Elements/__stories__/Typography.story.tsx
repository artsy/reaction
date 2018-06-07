import { storiesOf } from "@storybook/react"
import React from "react"
import { Theme, Display, Sans, Serif } from "@artsy/palette"
import { Col } from "../Grid"
import { withInfo } from "@storybook/addon-info"

const stories = storiesOf("Styleguide/Typography", module)

stories
  .addDecorator(storyFn => {
    return <Theme>{storyFn()}</Theme>
  })
  .add(
    "Sans",
    withInfo(`

    https://www.notion.so/artsy/Typography-d1f9f6731f3d47c78003d6d016c30221

  `)(() => {
      // prettier-ignore
      const sizes = ['1', '2', '3', '3t', '4', '4t', '5',
                     '5t', '6', '8', '10', '12', '14', '16']
      return (
        <div>
          {sizes.map(size => {
            return (
              <Col>
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
      // prettier-ignore
      const sizes = ['1', '2', '3', '3t', '4', '4t', '5',
                     '5t', '6', '8', '10', '12']
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
      // prettier-ignore
      const sizes = ['2', '3t', '4t', '5t', '6']

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
