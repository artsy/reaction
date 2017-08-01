import { storiesOf } from "@storybook/react"
import * as React from "react"

import Image from "../sections/image"
import ImageCollection from "../sections/image_collection"

import { Images } from "../__test__/fixtures/components"

storiesOf("Publishing/Images", module)
  .add("Image", () => {
    return (
      <div>
        <p>Standard:</p>
        <div style={{ width: 400 }}>
          <Image image={Images[1]} />
        </div>
        <p>Long Caption:</p>
        <div style={{ width: 400 }}>
          <Image image={Images[2]} />
        </div>
        <p>Classic:</p>
        <div style={{ width: 400 }}>
          <Image layout="classic" image={Images[2]} />
        </div>
      </div>
    )
  })
  .add("Image Collection", () => {
    return (
      <div style={{ width: "100%" }}>
        <ImageCollection images={Images} targetHeight={400} gutter={10} />
      </div>
    )
  })
