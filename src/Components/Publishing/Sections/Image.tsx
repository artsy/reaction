import React from "react"
import { resize } from "../../../Utils/resizer"
import { GLOBAL_IMAGE_QUALITY } from "../Constants"
import { ArticleLayout, SectionLayout } from "../Typings"
import { Caption } from "./Caption"
import { ImageWrapper } from "./ImageWrapper"

interface ImageProps extends React.HTMLProps<HTMLDivElement> {
  color?: string
  editCaption?: any
  editing?: boolean
  image?: any
  layout?: ArticleLayout
  linked?: boolean
  sectionLayout?: SectionLayout
  width?: number | string
  height?: number | string
}

export const Image: React.SFC<ImageProps> = props => {
  const {
    children,
    color,
    editing,
    editCaption,
    height,
    image,
    layout,
    linked,
    sectionLayout,
    width,
  } = props
  const caption = image.caption || ""
  const src = resize(image.url, {
    width: layout === "feature" ? 2000 : 1200,
    quality: GLOBAL_IMAGE_QUALITY,
  })
  const alt = caption.replace(/<[^>]*>/g, "") /* strip caption html */

  return (
    <div className="article-image">
      <ImageWrapper
        linked={linked}
        layout={layout}
        src={src}
        width={width}
        height={height}
        alt={alt}
        index={image.index}
        editing={editCaption || editing}
      />

      <Caption
        caption={caption}
        color={color}
        layout={layout}
        sectionLayout={sectionLayout}
      >
        {editCaption && editCaption()}
      </Caption>
      {children}
    </div>
  )
}

Image.defaultProps = {
  width: "100%",
  height: "auto",
  linked: true,
}
