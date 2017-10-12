import { storiesOf } from "@storybook/react"
import * as React from "react"

import { IconEditEmbed } from "../Icon/EditEmbed"
import { IconEditImages } from "../Icon/EditImages"
import { IconEditSection } from "../Icon/EditSection"
import { IconEditText } from "../Icon/EditText"
import { IconEditVideo } from "../Icon/EditVideo"
import { IconExpand } from "../Icon/Expand"
import { IconHeroImage } from "../Icon/HeroImage"
import { IconHeroVideo } from "../Icon/HeroVideo"
import { IconImageFullscreen } from "../Icon/ImageFullscreen"
import { IconImageSet } from "../Icon/ImageSet"
import { IconLayoutFullscreen } from "../Icon/LayoutFullscreen"
import { IconLayoutSplit } from "../Icon/LayoutSplit"
import { IconLayoutText } from "../Icon/LayoutText"
import { IconRemove } from "../Icon/Remove"
import { IconSocialEmail } from "../Icon/SocialEmail"
import { IconSocialFacebook } from "../Icon/SocialFacebook"
import { IconSocialTwitter } from "../Icon/SocialTwitter"
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
