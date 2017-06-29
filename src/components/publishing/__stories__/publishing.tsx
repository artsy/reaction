import { storiesOf } from "@storybook/react"
import * as React from "react"

import Artwork from "../artwork"
import IconImageset from "../icons/icon_imageset"
import Image from "../image"
import ImagesetPreview from "../imageset_preview"

import { Images } from "../__test__/fixtures"

storiesOf("Publishing", Artwork)
  .add("Artwork", () => {
    return (
      <div style={{ width: 400 }}>
        <Artwork linked artwork={Images[0]} />
      </div>
    )
  })
  .add("Imageset Preview", () => {
    return <ImagesetPreview images={Images} />
  })
  .add("Icons", () => {
    return (
      <div style={{ width: 50 }}>
        <IconImageset />
        <p>Imageset</p>
      </div>
    )
  })
  .add("Image", () => {
    return (
      <div>
        <div style={{ width: 400 }}>
          <Image image={Images[1]} />
        </div>
        <div style={{ width: 400 }}>
          <Image image={Images[2]} />
        </div>
      </div>
    )
  })
