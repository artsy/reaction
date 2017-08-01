import { storiesOf } from "@storybook/react"
import * as React from "react"

import AuthorInfo from "../authors"
import Embed from "../embed"
import IconImageset from "../icons/icon_imageset"
import Image from "../image"
import ImageCollection from "../image_collection"

import { Authors, Embeds, Images } from "../__test__/fixtures"

import Typography from "./typography_examples"

storiesOf("Publishing/Typography", module)
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
  .add("Embed", () => {
    return (
      <div style={{ width: "100%" }}>
        <Embed section={Embeds[0]} />
      </div>
    )
  })
  .add("Author Info", () => {
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <AuthorInfo authors={Authors} />
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
