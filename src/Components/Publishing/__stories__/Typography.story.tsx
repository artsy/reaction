import { storiesOf } from "@storybook/react"
import React from "react"

import { IconEditEmbed } from "../Icon/IconEditEmbed"
import { IconEditImages } from "../Icon/IconEditImages"
import { IconEditSection } from "../Icon/IconEditSection"
import { IconEditText } from "../Icon/IconEditText"
import { IconEditVideo } from "../Icon/IconEditVideo"
import { IconExpand } from "../Icon/IconExpand"
import { IconHeroImage } from "../Icon/IconHeroImage"
import { IconHeroVideo } from "../Icon/IconHeroVideo"
import { IconImageFullscreen } from "../Icon/IconImageFullscreen"
import { IconImageSet } from "../Icon/IconImageSet"
import { IconLayoutFullscreen } from "../Icon/IconLayoutFullscreen"
import { IconLayoutSplit } from "../Icon/IconLayoutSplit"
import { IconLayoutText } from "../Icon/IconLayoutText"
import { IconPlus } from "../Icon/IconPlus"
import { IconRemove } from "../Icon/IconRemove"
import { IconSocialEmail } from "../Icon/IconSocialEmail"
import { IconSocialFacebook } from "../Icon/IconSocialFacebook"
import { IconSocialTwitter } from "../Icon/IconSocialTwitter"
import { Typography } from "./TypographyExamples"

storiesOf("Publishing/Typography", module)
  .add("Icons", () => {
    return (
      <div>
        <div style={{ width: 50 }}>
          <IconImageSet />
          <p>ImageSet</p>
        </div>
        <div style={{ width: 50 }}>
          <IconImageFullscreen />
          <p>Image Fullscreen</p>
        </div>
        <div style={{ width: 50 }}>
          <IconRemove />
          <p>Remove</p>
        </div>
        <div style={{ width: 50 }}>
          <IconExpand />
          <p>Expand</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutSplit />
          <p>Layout Split</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutText />
          <p>Layout Text</p>
        </div>
        <div style={{ width: 50 }}>
          <IconLayoutFullscreen />
          <p>Layout Fullscreen</p>
        </div>
        <div style={{ width: 50 }}>
          <IconPlus />
          <p>Plus</p>
        </div>
        <div style={{ width: 50 }}>
          <IconHeroVideo />
          <p>Hero Video</p>
        </div>
        <div style={{ width: 50 }}>
          <IconHeroImage />
          <p>Hero Image</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditEmbed />
          <p>Edit Embed</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditImages />
          <p>Edit Images</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditText />
          <p>Edit Text</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditVideo />
          <p>Edit Video</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditSection />
          <p>Edit Section</p>
        </div>
        <div style={{ width: 50 }}>
          <IconEditSection isClosing />
          <p>Edit Section isClosing</p>
        </div>
        <div style={{ width: 50 }}>
          <IconSocialTwitter />
          <p>Twitter</p>
        </div>
        <div style={{ width: 50 }}>
          <IconSocialEmail />
          <p>Email</p>
        </div>
        <div style={{ width: 50 }}>
          <IconSocialFacebook />
          <p>Facebook</p>
        </div>
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
