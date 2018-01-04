import React from "react"
import { resize } from "../../../../Utils/resizer"
import { GLOBAL_IMAGE_QUALITY } from '../../Constants'
import { Layout, SectionLayout } from "../../Typings"
import { Caption } from "../Caption"
import { ImageWrapper } from "./ImageWrapper"

interface ImageProps extends React.HTMLProps<HTMLDivElement> {
  editCaption?: any
  image?: any
  layout?: Layout
  sectionLayout?: SectionLayout
  width?: number | string
  height?: number | string
}

export const Image: React.SFC<ImageProps> = props => {
  const {
    editCaption,
    height,
    image,
    layout,
    sectionLayout,
    width,
  } = props

  const src = resize(image.url, { width: 1200, quality: GLOBAL_IMAGE_QUALITY })
  const alt = image.caption.replace(/<[^>]*>/g, "") /* strip caption html */

  return (
    <div className="article-image">
      <ImageWrapper
        layout={layout}
        src={src}
        width={width}
        height={height}
        alt={alt}
        index={image.index}
      />
      {editCaption
        ? editCaption()
        : <Caption
          caption={image.caption}
          layout={layout}
          sectionLayout={sectionLayout} />
      }
    </div>
  )
}

Image.defaultProps = {
  width: "100%",
  height: "auto",
}
