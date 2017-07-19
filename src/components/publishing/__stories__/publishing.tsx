import { storiesOf } from "@storybook/react"
import * as React from "react"

import Artwork from "../artwork"
import FeatureHeader from "../feature_header"
import IconImageset from "../icons/icon_imageset"
import Image from "../image"
import ImageCollection from "../image_collection"
import ImageSetPreview from "../imageset_preview"
import ImageSetPreviewClassic from "../imageset_preview_classic"

import { Artworks, FeatureHeaders, Images, ImageSetFull, ImageSetMini } from "../__test__/fixtures"

import Typography from "./typography"

storiesOf("Publishing", Artwork)
  .add("Artwork", () => {
    return (
      <div>
        <div style={{ width: 800 }}>
          <Artwork artwork={Artworks[0]} />
        </div>
        <hr />
        <p>Multiple Artists: </p>
        <div style={{ width: 800 }}>
          <Artwork artwork={Artworks[1]} />
        </div>
        <hr />
        <p>Unlinked: </p>
        <div style={{ width: 800 }}>
          <Artwork linked={false} artwork={Artworks[1]} />
        </div>
        <hr />
        <p>Small: </p>
        <div style={{ width: 400 }}>
          <Artwork artwork={Artworks[1]} />
        </div>
        <hr />
        <p>Classic: </p>
        <div style={{ width: 800 }}>
          <Artwork artwork={Artworks[0]} layout="classic" />
        </div>
      </div>
    )
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
      <div>
        <ImageCollection images={Images} width={900} targetHeight={400} gutter={10} />
      </div>
    )
  })
  .add("Imageset Preview - Classic", () => {
    return <ImageSetPreviewClassic images={Images} />
  })
  .add("Imageset Preview", () => {
    return (
      <div style={{ maxWidth: 680, width: "100%" }}>
        <ImageSetPreview section={ImageSetFull} />
        <br />
        <ImageSetPreview section={ImageSetMini} />
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
  .add("Typography", () => {
    return <Typography />
  })
