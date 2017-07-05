import { storiesOf } from "@storybook/react"
import * as React from "react"

import Artwork from "../artwork"
import FeatureHeader from "../feature_header"
import IconImageset from "../icons/icon_imageset"
import Image from "../image"
import ImagesetPreview from "../imageset_preview"

import { FeatureHeaders, Images } from "../__test__/fixtures"

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
  .add("Feature Header - Text", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <FeatureHeader header={FeatureHeaders[0]} />
      </div>
    )
  })
  .add("Feature Header - Split", () => {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <FeatureHeader header={FeatureHeaders[1]} />
      </div>
    )
  })
  .add("Feature Header - Full", () => {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <FeatureHeader header={FeatureHeaders[2]} />
      </div>
    )
  })
