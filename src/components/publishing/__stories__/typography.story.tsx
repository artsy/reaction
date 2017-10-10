import { storiesOf } from "@storybook/react"
import * as React from "react"

import IconEditEmbed from "../icon/edit_embed"
import IconEditImages from "../icon/edit_images"
import IconEditSection from "../icon/edit_section"
import IconEditText from "../icon/edit_text"
import IconEditVideo from "../icon/edit_video"
import IconExpand from "../icon/expand"
import IconHeroImage from "../icon/hero_image"
import IconHeroVideo from "../icon/hero_video"
import IconImageFullscreen from "../icon/image_fullscreen"
import IconImageSet from "../icon/image_set"
import IconLayoutFullscreen from "../icon/layout_fullscreen"
import IconLayoutSplit from "../icon/layout_split"
import IconLayoutText from "../icon/layout_text"
import IconRemove from "../icon/remove"
import IconSocialEmail from "../icon/social_email"
import IconSocialFacebook from "../icon/social_facebook"
import IconSocialTwitter from "../icon/social_twitter"
import Typography from "./typography_examples"

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
