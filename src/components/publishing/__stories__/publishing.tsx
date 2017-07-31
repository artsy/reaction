import { storiesOf } from "@storybook/react"
import * as _ from "lodash"
import * as React from "react"

import Article from "../article"
import Header from "../header/header"
import IconImageset from "../icons/icon_imageset"
import Artwork from "../sections/artwork"
import AuthorInfo from "../sections/authors"
import Embed from "../sections/embed"
import Image from "../sections/image"
import ImageCollection from "../sections/image_collection"
import ImageSetPreview from "../sections/imageset_preview"
import ImageSetPreviewClassic from "../sections/imageset_preview_classic"
import Video from "../sections/video"

import {
  Artworks,
  Authors,
  Embeds,
  HeroSections,
  Images,
  ImageSetFull,
  ImageSetFullSansTitle,
  ImageSetMini,
  ImageSetMiniSansTitle,
  Videos,
} from "../__test__/fixtures"

import Articles from "../__test__/article_fixtures"

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
        <p>Missing info: </p>
        <div style={{ width: 800 }}>
          <Artwork artwork={Artworks[2]} />
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
        <ImageCollection images={Images} gutter={10} targetHeight={400} />
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
  .add("Embed", () => {
    return (
      <div style={{ width: "100%" }}>
        <Embed section={Embeds[0]} />
      </div>
    )
  })
  .add("Video", () => {
    return (
      <div>
        <div style={{ width: "100vw", position: "relative" }}>
          <Video section={Videos[0]} layout="standard" />
        </div>
        <br />
        <div style={{ width: "100vw", position: "relative" }}>
          <Video section={Videos[1]} layout="standard" />
        </div>
        <br />
        <div style={{ width: "100vw", position: "relative" }}>
          <Video section={Videos[2]} layout="classic" />
        </div>
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
  .add("Standard Article", () => {
    return <Article article={Articles[1]} />
  })
  .add("Feature Article", () => {
    return <Article article={Articles[3]} />
  })
