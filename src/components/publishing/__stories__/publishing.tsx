import { storiesOf } from "@storybook/react"
import * as _ from "lodash"
import * as React from "react"

import Artwork from "../artwork"
import Header from "../header/header"
import IconImageset from "../icons/icon_imageset"
import Image from "../image"
import ImageCollection from "../image_collection"
import ImageSetPreview from "../imageset_preview"
import ImageSetPreviewClassic from "../imageset_preview_classic"

import {
  Articles,
  Artworks,
  HeroSections,
  Images,
  ImageSetFull,
  ImageSetFullSansTitle,
  ImageSetMini,
  ImageSetMiniSansTitle,
} from "../__test__/fixtures"

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
        <br />
        <p>Without titles:</p>
        <ImageSetPreview section={ImageSetFullSansTitle} />
        <br />
        <ImageSetPreview section={ImageSetMiniSansTitle} />
      </div>
    )
  })
  .add("Classic Header", () => {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Header article={Articles[0]} />
      </div>
    )
  })
  .add("Standard Header", () => {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Header article={Articles[1]} />
      </div>
    )
  })
  .add("Feature Header - Text", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[0] })
    const article2 = _.extend({}, Articles[2], { hero_section: HeroSections[5] })
    return (
      <div>
        <div style={{ width: "100vw", position: "relative" }}>
          <Header article={article} />
        </div>
        <div style={{ width: "100vw", position: "relative" }}>
          <Header article={article2} />
        </div>
      </div>
    )
  })
  .add("Feature Header - Split", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[1] })
    const article2 = _.extend({}, Articles[2], { hero_section: HeroSections[3] })
    return (
      <div>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Header article={article} />
        </div>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Header article={article2} />
        </div>
      </div>
    )
  })
  .add("Feature Header - Full", () => {
    const article = _.extend({}, Articles[2], { hero_section: HeroSections[2] })
    const article2 = _.extend({}, Articles[2], { hero_section: HeroSections[4] })
    return (
      <div>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Header article={article} />
        </div>
        <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
          <Header article={article2} />
        </div>
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
